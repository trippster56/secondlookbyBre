import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import {
  REFRESH_WHEN_DAYS_LEFT,
  daysUntilExpiry,
  readAccessToken,
  readStoredToken,
  writeStoredToken,
} from "@/lib/instagram-token";

/**
 * Keeps the Instagram token alive, so the portfolio feed never needs a human.
 *
 * Meta's long-lived tokens expire after 60 days but can be exchanged for a new
 * 60-day token at any point while they are still valid (and at least 24 hours
 * old). The Vercel cron in `vercel.json` calls this daily; it only actually
 * refreshes when there are fewer than `REFRESH_WHEN_DAYS_LEFT` days on the
 * clock, so a missed day — or ten — costs nothing. Miss 60 days and the chain
 * is broken: a dead token can't be refreshed, and Bre has to reauthorize.
 *
 * The response never contains the token itself, only when it expires.
 */

const REFRESH_ENDPOINT = "https://graph.instagram.com/refresh_access_token";

/** Never cached, never prerendered — it mutates the stored token. */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Vercel's cron sends `Authorization: Bearer $CRON_SECRET` when the variable
  // is set. Without the variable this route would be an open endpoint, so in
  // production it refuses to run rather than risk one.
  const secret = process.env.CRON_SECRET?.trim();
  if (secret) {
    if (request.headers.get("authorization") !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "CRON_SECRET is not set; refusing to run unauthenticated." },
      { status: 500 },
    );
  }

  const token = await readAccessToken();
  if (!token) {
    return NextResponse.json(
      { error: "No Instagram token to refresh. Seed INSTAGRAM_ACCESS_TOKEN." },
      { status: 400 },
    );
  }

  // `?force=1` refreshes regardless of how much life is left — for the first
  // run, and for testing.
  const force = new URL(request.url).searchParams.get("force") === "1";
  const stored = await readStoredToken();

  if (stored && !force) {
    const daysLeft = daysUntilExpiry(stored);
    if (daysLeft > REFRESH_WHEN_DAYS_LEFT) {
      return NextResponse.json({
        refreshed: false,
        reason: "still fresh",
        daysLeft,
        expiresAt: stored.expiresAt,
      });
    }
  }

  try {
    const url = new URL(REFRESH_ENDPOINT);
    url.searchParams.set("grant_type", "ig_refresh_token");
    url.searchParams.set("access_token", token);

    const response = await fetch(url, { cache: "no-store" });
    const body = (await response.json()) as {
      access_token?: string;
      expires_in?: number;
      error?: { message?: string };
    };

    if (!response.ok || !body.access_token) {
      // Meta's message says which half is wrong — expired, revoked, or a token
      // from the wrong app — so it's worth surfacing. It carries no secret.
      const message = body.error?.message ?? response.statusText;
      console.error(`[instagram] token refresh failed: ${message}`);
      return NextResponse.json(
        { refreshed: false, error: message },
        { status: 502 },
      );
    }

    const record = await writeStoredToken(
      body.access_token,
      body.expires_in ?? 60 * 24 * 60 * 60,
    );

    // The portfolio caches for an hour; drop that cache so the next visitor
    // reads through the new token rather than the old one's results.
    revalidatePath("/take-a-look");

    return NextResponse.json({
      refreshed: true,
      expiresAt: record.expiresAt,
      daysLeft: daysUntilExpiry(record),
    });
  } catch (error) {
    // The likeliest cause is no blob store: the refresh succeeded but the new
    // token had nowhere to go, which would silently strand the old one.
    console.error("[instagram] token refresh could not complete", error);
    return NextResponse.json(
      {
        refreshed: false,
        error:
          "Refresh failed. If BLOB_READ_WRITE_TOKEN is missing, the rotated token cannot be stored.",
      },
      { status: 500 },
    );
  }
}
