import Link from "next/link";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The site's button language is a fully rounded pill: Karla 500, uppercase,
 * wide tracking, on a solid plum ground. Orchid appears only on hover — it is
 * the one place in the system where the accent becomes a background at full
 * strength, which is what makes an interaction feel like an event.
 *
 * Transitions are colour only. No lift, no scale, no shadow: 1b earns its
 * calm from white space, not effects.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full " +
    "font-medium uppercase transition-colors duration-[250ms] ease-out " +
    "disabled:pointer-events-none",
  {
    variants: {
      tone: {
        primary:
          "bg-plum text-on-plum hover:bg-orchid hover:text-on-orchid " +
          "disabled:bg-muted-fill disabled:text-muted-ink disabled:hover:bg-muted-fill disabled:hover:text-muted-ink",
        secondary:
          "border border-outline text-plum hover:border-plum hover:bg-plum hover:text-on-plum " +
          "disabled:border-muted-fill disabled:text-muted-ink disabled:hover:bg-transparent disabled:hover:text-muted-ink",
        // The header pill. Sits on the same off-white as the nav links, so it
        // darkens rather than flipping to orchid — an orchid flag in the
        // header would compete with the hero wash.
        nav: "bg-plum text-on-plum hover:bg-plum-hover tracking-[0.16em]",
      },
      size: {
        // Heights come from the spec's button table. Nothing drops below the
        // 44px tap target.
        hero: "h-[58px] px-[38px] text-[13px] tracking-[0.2em]",
        md: "h-14 px-[38px] text-[13px] tracking-[0.2em]",
        nav: "h-10 px-6 text-[12px]",
        // Full-width on mobile, the in-section height from 640px up.
        block: "h-12 w-full px-8 text-[13px] tracking-[0.2em] sm:h-14",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "md",
    },
  },
);

type PillVariants = VariantProps<typeof buttonVariants>;

/**
 * A real `<button>`: submits, or does something on click.
 *
 * For navigation use `ButtonLink`. Base UI's Button assumes a native
 * `<button>`, and telling it otherwise makes it stamp `role="button"` on the
 * element — which would announce a link as a button.
 */
function Button({
  className,
  tone,
  size,
  ...props
}: ButtonPrimitive.Props & PillVariants) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ tone, size }), className)}
      {...props}
    />
  );
}

/** A pill that navigates. Renders an `<a>`, and stays a link to assistive tech. */
function ButtonLink({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<typeof Link> & PillVariants) {
  return (
    <Link
      data-slot="button-link"
      className={cn(buttonVariants({ tone, size }), className)}
      {...props}
    />
  );
}

export { Button, ButtonLink, buttonVariants };
