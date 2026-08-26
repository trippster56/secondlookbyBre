import { ButtonLink } from "@/components/ui/button";
import Sparkle from "@/components/ui/sparkle";
import { closing } from "@/data/home";
import { INQUIRE_HREF } from "@/lib/site-config";

/**
 * "Ready for your Second Look?" — the site's closing call to action.
 *
 * Repeated at the foot of every page: one primary action, said the same way
 * each time, which is the whole point of having exactly one.
 */
export default function ClosingBand({
  className = "bg-shell",
}: {
  /** The band alternates with whatever section precedes it. */
  className?: string;
}) {
  return (
    <section className={`section ${className}`}>
      <div className="section-inner-narrow flex flex-col items-center gap-7 text-center">
        <Sparkle className="h-4 w-4" />
        <h2 className="type-h2 max-w-[20ch]">{closing.heading}</h2>
        {closing.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="type-lead measure">
            {paragraph}
          </p>
        ))}
        <ButtonLink
          href={INQUIRE_HREF}
          size="hero"
          className="mt-2 max-sm:w-full"
        >
          Inquire about your date
        </ButtonLink>
      </div>
    </section>
  );
}
