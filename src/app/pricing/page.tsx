import PackageCard from "@/components/sections/PackageCard";
import Sparkle from "@/components/ui/sparkle";
import { closing } from "@/data/home";
import { PLACEHOLDER_PRICING, packages } from "@/data/packages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

import InquireForm from "./inquire-form";

export const metadata = pageMetadata({
  title: "Packages & Inquire",
  description:
    "Wedding content packages from The Second Look by Bre, and the form to tell me about your day. Based in Florence, South Carolina, with travel available.",
  path: "/pricing",
  keywords: ["wedding content creator pricing", "book a wedding content creator"],
});

export default function PricingPage() {
  return (
    <>
      {/* Packages */}
      <section className="section bg-shell">
        <div className="section-inner flex flex-col gap-11">
          <div className="flex flex-col gap-4">
            <p className="type-eyebrow flex items-center gap-3">
              <Sparkle />
              Packages
            </p>
            <h1 className="type-h1 max-w-[18ch]">
              Wedding content, built around your day.
            </h1>
            <p className="type-lead measure">
              Every package is priced by the hour with a minimum, so you only
              book the part of the day you want covered. Tell me what yours
              looks like and I’ll come back with what fits.
            </p>
          </div>

          {PLACEHOLDER_PRICING && (
            <p className="rounded-[6px] border border-outline bg-lilac px-6 py-5 type-body text-plum">
              <strong className="font-medium">Draft packages.</strong> The tiers
              below are structure only — investment, coverage and delivery times
              are still being finalised, and are shown as “to be confirmed”
              until they are. Send an enquiry and you’ll get real numbers back.
            </p>
          )}

          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <p className="type-body text-ink-soft measure">
            Travelling beyond the Pee Dee, or planning something that doesn’t
            fit a tier? That’s common — say so in your enquiry and we’ll build
            it.
          </p>
        </div>
      </section>

      {/* Inquire */}
      <section id="inquire" className="section scroll-mt-24 bg-lilac">
        <div className="section-inner grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[72px]">
          <div className="flex flex-col gap-6 lg:sticky lg:top-12 lg:self-start">
            <p className="type-eyebrow flex items-center gap-3">
              <Sparkle />
              Inquire about your date
            </p>
            <h2 className="type-h2 max-w-[16ch]">{closing.heading}</h2>
            {closing.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="type-lead measure">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-col gap-2 border-t border-rule pt-6">
              <span className="type-eyebrow">Prefer email?</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="type-body text-plum transition-colors hover:text-plum-mid"
              >
                {siteConfig.contact.email}
              </a>
              <span className="type-body text-ink-soft">
                {siteConfig.serviceArea}
              </span>
            </div>
          </div>

          <InquireForm />
        </div>
      </section>
    </>
  );
}
