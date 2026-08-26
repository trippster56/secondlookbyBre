"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";

import { faqItems } from "@/data/faq";

/**
 * "A few things you might be wondering."
 *
 * A client island inside a server page — the only interactive thing on the
 * home page. The panel animates on the height Base UI measures for it, and
 * the plus rotates into a minus rather than swapping icons, which keeps the
 * motion to one transform.
 */
export default function FaqAccordion() {
  return (
    <Accordion.Root className="flex w-full flex-col border-t border-rule">
      {faqItems.map((item) => (
        <Accordion.Item
          key={item.question}
          className="border-b border-rule"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left">
              <span className="type-h3 transition-colors group-hover:text-plum-mid">
                {item.question}
              </span>
              <Plus
                aria-hidden="true"
                className="mt-1 h-5 w-5 shrink-0 text-orchid-deep transition-transform duration-300 group-data-[panel-open]:rotate-45"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
            <div className="flex flex-col gap-4 pb-7 pr-10">
              <p className="type-lead measure">{item.answer}</p>
              {item.answerContinued && (
                <p className="type-lead measure">{item.answerContinued}</p>
              )}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
