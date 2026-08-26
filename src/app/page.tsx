import AboutBre from "@/components/sections/AboutBre";
import ClosingBand from "@/components/sections/ClosingBand";
import FaqSection from "@/components/sections/FaqSection";
import Hero from "@/components/sections/Hero";
import WhatYouReceive from "@/components/sections/WhatYouReceive";
import JsonLd from "@/components/JsonLd";
import { faqItems } from "@/data/faq";
import { faqJsonLd } from "@/lib/seo";

/*
 * Section grounds alternate strictly — shell, lilac, shell, lilac, shell —
 * so no two of the same colour ever meet. The footer's plum closes it.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutBre />
      <WhatYouReceive />
      <FaqSection />
      <ClosingBand />
      <JsonLd
        data={faqJsonLd(
          faqItems.map((item) => ({
            question: item.question,
            answer: item.answerContinued
              ? `${item.answer} ${item.answerContinued}`
              : item.answer,
          })),
        )}
      />
    </>
  );
}
