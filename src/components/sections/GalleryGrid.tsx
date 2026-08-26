import Image from "next/image";

import Sparkle from "@/components/ui/sparkle";
import { galleryItems } from "@/data/gallery";

/**
 * The "Take a Look" grid.
 *
 * CSS columns rather than a grid: the gallery mixes 9:16 clips with square
 * stills, and columns let each tile keep its own height without a row-span
 * calculation per item. Empty-safe — while `galleryItems` is empty the page
 * says so plainly instead of rendering an empty frame.
 */
export default function GalleryGrid() {
  if (galleryItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-[6px] border border-rule bg-lilac px-8 py-20 text-center">
        <Sparkle className="h-4 w-4" />
        <p className="type-h3 max-w-[22ch]">
          The first weddings are being edited right now.
        </p>
        <p className="type-lead measure">
          Check back soon, or follow along on Instagram — new clips land there
          first.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-2 gap-4 md:columns-3 md:gap-5">
      {galleryItems.map((item) => {
        const tile = (
          <div
            className={`relative overflow-hidden rounded-[6px] bg-lilac ${
              item.ratio === "9:16" ? "aspect-[9/16]" : "aspect-square"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        );

        return (
          <div key={item.src} className="mb-4 break-inside-avoid md:mb-5">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-90"
              >
                {tile}
                <span className="sr-only">View the original post</span>
              </a>
            ) : (
              tile
            )}
          </div>
        );
      })}
    </div>
  );
}
