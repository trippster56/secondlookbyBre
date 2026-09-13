"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { InstagramIcon } from "@/components/ui/brand-icons";
import type { InstagramReel } from "@/lib/instagram";

/**
 * Bre's latest reels, pulled from Instagram and played in place.
 *
 * A tile is a cover until it is clicked; then it becomes a `<video>` so the
 * reel plays on the page rather than sending the visitor to Instagram. The
 * corner link still goes to the original post. One reel plays at a time — the
 * previous tile drops back to its cover.
 *
 * Client-side only for that swap; the fetch itself happens on the server, in
 * `lib/instagram.ts`.
 */
export default function ReelsFeed({ reels }: { reels: InstagramReel[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  if (reels.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
      {reels.map((reel) => (
        <div
          key={reel.id}
          className="group relative aspect-[9/16] overflow-hidden rounded-[6px] bg-lilac"
        >
          {playing === reel.id ? (
            <video
              src={reel.videoUrl}
              poster={reel.posterUrl}
              className="h-full w-full object-cover"
              controls
              autoPlay
              playsInline
              onEnded={() => setPlaying(null)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(reel.id)}
              className="absolute inset-0 cursor-pointer"
              aria-label={`Play reel: ${reel.caption}`}
            >
              <Image
                src={reel.posterUrl}
                alt=""
                fill
                loading="lazy"
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-shell/85 text-plum transition-colors group-hover:bg-shell">
                  <Play className="h-5 w-5 translate-x-px fill-current" />
                </span>
              </span>
            </button>
          )}

          <a
            href={reel.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-shell/85 text-plum transition-colors hover:bg-shell"
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="sr-only">View this reel on Instagram</span>
          </a>
        </div>
      ))}
    </div>
  );
}
