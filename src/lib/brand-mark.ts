/**
 * The four-point sparkle set inside the O of SECOND in the logo, redrawn.
 *
 * The logo's own star is very fine-lined — at 16–32px it disintegrates — so
 * this is a slightly bolder reading of the same shape, and it is the mark the
 * site uses anywhere the star appears as a glyph rather than as artwork.
 * `src/app/icon.svg` carries these paths inline because a static file has to
 * be self-contained: keep the two in step.
 */

/** Long four-point star, drawn in a 64×64 viewBox. */
export const STAR_PATH =
  "M32 2C32.6 26 33.2 27.6 62 32C33.2 36.4 32.6 38 32 62C31.4 38 30.8 36.4 2 32C30.8 27.6 31.4 26 32 2Z";

/** Shorter star, rotated 45°, that fills in the diagonals. */
export const STAR_PATH_DIAGONAL =
  "M32 19C32.4 29.4 32.7 30 45 32C32.7 34 32.4 34.6 32 45C31.6 34.6 31.3 34 19 32C31.3 30 31.6 29.4 32 19Z";

interface StarSvgOptions {
  /** Star colour. */
  fill: string;
  /** Optional background fill; omit for a transparent mark. */
  background?: string;
  /** Corner radius of the background plate, in viewBox units. */
  radius?: number;
}

/** Self-contained SVG markup for the mark. */
export function starSvg({ fill, background, radius = 14 }: StarSvgOptions) {
  const plate = background
    ? `<rect width="64" height="64" rx="${radius}" fill="${background}"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">${plate}<g fill="${fill}"><path d="${STAR_PATH}"/><path d="${STAR_PATH_DIAGONAL}" transform="rotate(45 32 32)"/></g></svg>`;
}
