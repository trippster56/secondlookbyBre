/**
 * "Take a Look" — the portfolio grid.
 *
 * Galleries use 1:1 or 9:16 only, mirroring the source footage. The page is
 * empty-safe: while this array is empty it renders a short "first weddings are
 * being edited" note rather than a broken grid, so adding real work later is a
 * data-only change.
 *
 * Bre's own work. Where a clip lives on Instagram or TikTok, set `href` so the
 * tile links out to the original post.
 *
 * Order matters while the set is small: the grid is CSS columns, which fill
 * top-to-bottom. Tall, square, square, tall fills all three desktop columns;
 * other orders of these four leave the third column empty.
 */

export interface GalleryItem {
  src: string;
  alt: string;
  /** Vertical clips sit 9:16; stills sit square. */
  ratio: "9:16" | "1:1";
  /** Optional link to the original post. */
  href?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/sparkler-exit.jpg",
    alt: "The newlyweds walking hand in hand out of the barn through a tunnel of guests’ sparklers",
    ratio: "9:16",
  },
  {
    src: "/images/gallery/cake-florals.jpg",
    alt: "A three-tier buttercream cake dressed with garden roses and blue delphinium",
    ratio: "1:1",
  },
  {
    src: "/images/gallery/dance-floor-batons.jpg",
    alt: "Guests waving light-up foam batons on the dance floor beneath draped ceiling fabric",
    ratio: "1:1",
  },
  {
    src: "/images/gallery/cake-cutting.jpg",
    alt: "The bride and groom sharing a kiss behind their pearl-trimmed cake, fork still in hand",
    ratio: "9:16",
  },
];
