import { STAR_PATH, STAR_PATH_DIAGONAL } from "@/lib/brand-mark";
import { cn } from "@/lib/utils";

/**
 * The logo's four-point star, as a glyph.
 *
 * It marks eyebrow labels, list items and section ends. Drawn rather than
 * typed: the ✦ characters the mockup used render differently on every
 * platform, and this is the brand's own star.
 */
export default function Sparkle({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={cn("h-3 w-3 shrink-0 fill-orchid-deep", className)}
      {...props}
    >
      <path d={STAR_PATH} />
      <path d={STAR_PATH_DIAGONAL} transform="rotate(45 32 32)" />
    </svg>
  );
}
