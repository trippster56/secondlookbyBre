/**
 * Social icons.
 *
 * lucide-react dropped brand icons in v1, so the three this site uses are
 * drawn here with the same stroke attributes lucide renders — 24px box,
 * 2px round-capped stroke, `currentColor`. Sizing comes from `className`.
 */

/** Any icon that takes a className — lucide's icons and the ones below. */
export type IconComponent = React.ComponentType<{ className?: string }>;

function OutlineIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <OutlineIcon className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </OutlineIcon>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <OutlineIcon className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </OutlineIcon>
  );
}

/** TikTok — the note-and-hook mark, drawn to lucide's stroke conventions. */
export function TiktokIcon({ className }: { className?: string }) {
  return (
    <OutlineIcon className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </OutlineIcon>
  );
}
