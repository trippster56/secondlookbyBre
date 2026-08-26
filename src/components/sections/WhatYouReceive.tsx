import { ButtonLink } from "@/components/ui/button";
import Sparkle from "@/components/ui/sparkle";
import { receive } from "@/data/home";

/**
 * "What You'll Receive" — the seven-item list.
 *
 * Two columns from 1024px with the last item spanning both, exactly as the
 * artboard draws it. The heading is centred on desktop and left-aligned on
 * phones, where centred text at this size reads awkwardly.
 */
export default function WhatYouReceive() {
  return (
    <section className="section bg-shell">
      <div className="section-inner-narrow flex flex-col items-start gap-11 lg:items-center lg:text-center">
        <div className="flex flex-col gap-4 lg:items-center">
          <p className="type-eyebrow flex items-center gap-3">
            <Sparkle />
            {receive.eyebrow}
          </p>
          <h2 className="type-h2 max-w-[760px]">{receive.heading}</h2>
        </div>

        <ul className="grid w-full gap-3 text-left lg:grid-cols-2 lg:gap-x-11 lg:gap-y-4">
          {receive.items.map((item, index) => (
            <li
              key={item}
              className={`flex items-baseline gap-3.5 rounded-[4px] bg-lilac px-5 py-5 lg:px-6 ${
                index === receive.items.length - 1 ? "lg:col-span-2" : ""
              }`}
            >
              <Sparkle className="translate-y-px" />
              <span className="type-body">{item}</span>
            </li>
          ))}
        </ul>

        <ButtonLink
          href="/pricing"
          tone="primary"
          size="md"
          className="max-sm:w-full"
        >
          View packages
        </ButtonLink>
      </div>
    </section>
  );
}
