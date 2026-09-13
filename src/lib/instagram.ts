/**
 * The Instagram feed behind /take-a-look.
 *
 * Bre posts her reels to Instagram; the portfolio reads them from there rather
 * than from a data file, so a new reel appears on the site without anyone
 * touching the repo. The page revalidates hourly.
 *
 * Auth is a long-lived Instagram access token (Instagram API with Instagram
 * Login — a professional account, an app in the Meta dashboard, then a 60-day
 * token). `lib/instagram-token.ts` owns where that token lives and the cron in
 * `api/instagram/refresh` rotates it, so nobody has to. Without a token this
 * returns an empty list and the portfolio falls back to the stills grid, so the
 * site never depends on it.
 *
 * Every failure path is swallowed on purpose: an expired token or a Meta
 * outage must not take the portfolio page down with it.
 */

import { readAccessToken } from "@/lib/instagram-token";

const GRAPH_ENDPOINT = "https://graph.instagram.com/v23.0/me/media";
const FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_product_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
].join(",");

/** How long a response is cached before Instagram is asked again. */
export const INSTAGRAM_REVALIDATE_SECONDS = 3600;

export interface InstagramReel {
  id: string;
  /** The mp4, played inline when a tile is opened. */
  videoUrl: string;
  /** The still shown before playback. */
  posterUrl: string;
  /** The original post, linked from each tile. */
  permalink: string;
  /** First line of the caption — used as the tile's accessible name. */
  caption: string;
}

interface GraphMedia {
  id: string;
  caption?: string;
  media_type?: string;
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
}

/** One line, short enough to sit under a tile or inside an aria-label. */
function firstLine(caption: string | undefined): string {
  const line = (caption ?? "").split("\n")[0].trim();
  if (!line) return "A reel from a recent wedding";
  return line.length > 120 ? `${line.slice(0, 117)}…` : line;
}

export async function fetchInstagramReels(
  limit = 6,
): Promise<InstagramReel[]> {
  const token = await readAccessToken();
  if (!token) return [];

  const url = new URL(GRAPH_ENDPOINT);
  url.searchParams.set("fields", FIELDS);
  // Ask for more than we render: stills and carousels are filtered out below.
  url.searchParams.set("limit", String(Math.max(limit * 3, 25)));
  url.searchParams.set("access_token", token);

  try {
    const response = await fetch(url, {
      next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(
        `[instagram] ${response.status} ${response.statusText} from the Graph API`,
      );
      return [];
    }

    const body = (await response.json()) as { data?: GraphMedia[] };

    return (body.data ?? [])
      .filter(
        (item): item is GraphMedia & { media_url: string; permalink: string } =>
          Boolean(item.media_url) &&
          Boolean(item.permalink) &&
          (item.media_product_type === "REELS" || item.media_type === "VIDEO"),
      )
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        videoUrl: item.media_url,
        // Reels always carry a thumbnail; fall back to the video's first frame.
        posterUrl: item.thumbnail_url ?? item.media_url,
        permalink: item.permalink,
        caption: firstLine(item.caption),
      }));
  } catch (error) {
    console.error("[instagram] feed request failed", error);
    return [];
  }
}
