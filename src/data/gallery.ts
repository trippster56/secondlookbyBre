/**
 * "Take a Look" — the portfolio grid.
 *
 * Galleries use 1:1 or 9:16 only, mirroring the source footage. The page is
 * empty-safe: while this array is empty it renders a short "first weddings are
 * being edited" note rather than a broken grid, so adding real work later is a
 * data-only change.
 *
 * TODO(bre): every item below is a placeholder from the design session.
 * Replace with real weddings — and where a clip lives on Instagram or TikTok,
 * set `href` so the tile links out to the original post.
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
    src: "/images/gallery/veil.jpg",
    alt: "A bridesmaid pinning the bride’s veil in place at the dressing table",
    ratio: "9:16",
  },
  {
    src: "/images/gallery/getting-ready.jpg",
    alt: "The bridal party seeing the bride in her dress for the first time",
    ratio: "1:1",
  },
  {
    src: "/images/gallery/details-rings.jpg",
    alt: "The invitation suite laid out with both wedding bands and a sprig of greenery",
    ratio: "1:1",
  },
  {
    src: "/images/gallery/bride-bouquet.jpg",
    alt: "The bride laughing with her bouquet in the late afternoon light",
    ratio: "9:16",
  },
  {
    src: "/images/gallery/first-dance-phone.jpg",
    alt: "A guest filming the first dance on her phone from the head table",
    ratio: "1:1",
  },
  {
    src: "/images/gallery/dance-floor.jpg",
    alt: "The bride with a hand in the air on a packed dance floor under string lights",
    ratio: "1:1",
  },
];
