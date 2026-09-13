import Sparkle from "@/components/ui/sparkle";
import { ButtonLink } from "@/components/ui/button";
import type { Package } from "@/data/packages";
import { INQUIRE_HREF } from "@/lib/site-config";

/** A value still waiting on Bre renders as a marker, never as a made-up number. */
function Value({ value }: { value: string }) {
  if (!value.startsWith("TODO")) return <>{value}</>;

  return (
    <span className="rounded-full bg-lilac px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-plum-mid">
      To be confirmed
    </span>
  );
}

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article
      className={`flex flex-col gap-6 rounded-[6px] border bg-shell p-7 lg:p-8 ${
        pkg.featured ? "border-outline" : "border-rule"
      }`}
    >
      <div className="flex flex-col gap-3">
        {pkg.featured && (
          <p className="type-eyebrow flex items-center gap-2 text-plum-mid">
            <Sparkle className="h-2.5 w-2.5" />
            A good place to start
          </p>
        )}
        <h3 className="type-h3">{pkg.name}</h3>
        <p className="type-body text-ink-soft">{pkg.summary}</p>
      </div>

      <dl className="flex flex-col gap-3 border-y border-rule py-5">
        <div className="flex items-center justify-between gap-4">
          <dt className="type-eyebrow">Investment</dt>
          <dd className="type-body text-plum">
            <Value value={pkg.price} />
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="type-eyebrow">Coverage</dt>
          <dd className="type-body text-plum">
            <Value value={pkg.hours} />
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="type-eyebrow">Delivery</dt>
          <dd className="type-body text-plum">
            <Value value={pkg.turnaround} />
          </dd>
        </div>
      </dl>

      <ul className="flex flex-1 flex-col gap-3">
        {pkg.includes.map((line) => (
          <li key={line} className="flex items-baseline gap-3">
            <Sparkle className="h-2.5 w-2.5 translate-y-px" />
            <span className="type-body">{line}</span>
          </li>
        ))}
      </ul>

      <ButtonLink
        href={INQUIRE_HREF}
        tone={pkg.featured ? "primary" : "secondary"}
        size="block"
      >
        Inquire
      </ButtonLink>
    </article>
  );
}
