import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Arrow size in Tailwind units — the site uses w-4 and w-5 variants. */
  iconClassName?: string;
  /** Some instances animate the arrow on hover, some don't. */
  slide?: boolean;
}

/**
 * Inline text link with a trailing arrow. Used for the site's softer,
 * non-pill calls to action.
 */
export default function ArrowLink({
  href,
  children,
  className,
  iconClassName = "w-5 h-5 ml-2",
  slide = true,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center font-medium", className)}
    >
      {children}
      <ArrowRight
        className={cn(
          iconClassName,
          slide && "transition-transform group-hover:translate-x-1",
        )}
      />
    </Link>
  );
}
