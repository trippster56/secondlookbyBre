import Sparkle from "@/components/ui/sparkle";

import FaqAccordion from "./FaqAccordion";

/** The FAQ band: heading on the left, the accordion beside it on desktop. */
export default function FaqSection() {
  return (
    <section id="faq" className="section scroll-mt-24 bg-lilac">
      <div className="section-inner grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-[72px]">
        <div className="flex flex-col gap-4 lg:sticky lg:top-12 lg:self-start">
          <p className="type-eyebrow flex items-center gap-3">
            <Sparkle />
            FAQ
          </p>
          <h2 className="type-h2 max-w-[14ch]">
            A few things you might be wondering
          </h2>
        </div>
        <FaqAccordion />
      </div>
    </section>
  );
}
