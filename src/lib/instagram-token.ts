import { get, put } from "@vercel/blob";

/**
 * Where the Instagram access token actually lives.
 *
 * Meta only issues long-lived tokens that expire after 60 days, so the token
 * can't just sit in an environment variable forever — something has to rotate
 * it, and environment variables are read-only at runtime. The cron in
 * `app/api/instagram/refresh` exchanges the current token for a fresh 60-day
 * one and writes it back here, to a **private** blob.
 *
 * Two sources, in order:
 *
 * 1. The blob, once the cron has written it. This is the live token.
 * 2. `INSTAGRAM_ACCESS_TOKEN`, the seed. Paste the first long-lived token into
 *    the environment variable; the first refresh copies it into the blob and
 *    the environment variable stops mattering.
 *
 * Without a blob store configured (`BLOB_READ_WRITE_TOKEN` absent — local work,
 * or before the store is created) everything falls through to the environment
 * variable and the feed still reads, it just can't rotate.
 */

const BLOB_PATH = "instagram/access-token.json";

/** Meta's long-lived tokens last 60 days; rotate well before that. */
export const REFRESH_WHEN_DAYS_LEFT = 30;

export interface StoredToken {
  token: string;
  /** ISO 8601. */
  refreshedAt: string;
  /** ISO 8601 — when Meta says this token dies. */
  expiresAt: string;
}

function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

/** The stored token record, or null if there isn't one yet. */
export async function readStoredToken(): Promise<StoredToken | null> {
  if (!blobConfigured()) return null;

  try {
    // `useCache: false` — a token read from a CDN cache can be a token that
    // was rotated away minutes ago.
    const result = await get(BLOB_PATH, {
      access: "private",
      useCache: false,
    });

    if (!result || result.statusCode !== 200) return null;

    const data = (await new Response(result.stream).json()) as Partial<StoredToken>;
    if (!data.token) return null;

    return {
      token: data.token,
      refreshedAt: data.refreshedAt ?? new Date(0).toISOString(),
      expiresAt: data.expiresAt ?? new Date(0).toISOString(),
    };
  } catch (error) {
    console.error("[instagram] could not read the stored token", error);
    return null;
  }
}

/** Writes the rotated token back, replacing whatever was there. */
export async function writeStoredToken(
  token: string,
  expiresInSeconds: number,
): Promise<StoredToken> {
  const now = new Date();
  const record: StoredToken = {
    token,
    refreshedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + expiresInSeconds * 1000).toISOString(),
  };

  await put(BLOB_PATH, JSON.stringify(record), {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
    // The token is only useful while it is current; never let a CDN hold it.
    cacheControlMaxAge: 0,
  });

  return record;
}

/**
 * The token the feed should use right now: the rotated one if it exists, the
 * seed environment variable otherwise.
 */
export async function readAccessToken(): Promise<string | undefined> {
  const stored = await readStoredToken();
  if (stored?.token) return stored.token;

  return process.env.INSTAGRAM_ACCESS_TOKEN?.trim() || undefined;
}

/** Days until this record expires. Negative once it already has. */
export function daysUntilExpiry(record: StoredToken): number {
  const ms = new Date(record.expiresAt).getTime() - Date.now();
  return Math.floor(ms / 86_400_000);
}
