/**
 * The three packages, transcribed from Bre's pricing guide (the PRICING GUIDE
 * card she sent, September 2026).
 *
 * Pricing is hourly with a minimum per tier; the tiers differ only in the rate,
 * the minimum, and how many edited videos are included. The bullets are her
 * wording from the guide — fix a typo, but don't rewrite them.
 */

/**
 * Flips the "draft packages" notice on /pricing, and turns any `TODO` value
 * into a "to be confirmed" chip. Real numbers are in, so it is off.
 */
export const PLACEHOLDER_PRICING = false;

export interface Package {
  id: string;
  name: string;
  /** One line on who the tier suits. */
  summary: string;
  /** Hourly rate. */
  price: string;
  /** The booking minimum for this tier. */
  hours: string;
  /** The delivery window shown on the card; the bullets carry the detail. */
  turnaround: string;
  includes: string[];
  /** The tier the page leads with. One only. */
  featured?: boolean;
}

export const packages: Package[] = [
  {
    id: "standard",
    name: "Standard",
    summary:
      "Everything from the hours you book, plus one edit ready to post.",
    price: "$75/hour",
    hours: "4-hour minimum",
    turnaround: "24–48 hours",
    includes: [
      "All usable, unedited photos + video clips delivered within 24 hours",
      "1 edited, ready-to-post video delivered within 24–48 hours",
      "Pre-wedding consultation to discuss timeline, vision + must-have content",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    summary:
      "A longer day covered, and two edits to tell it properly.",
    price: "$100/hour",
    hours: "5-hour minimum",
    turnaround: "24–48 hours",
    includes: [
      "All usable, unedited photos + video clips delivered within 24 hours",
      "2 edited, ready-to-post videos delivered within 24–48 hours",
      "Pre-wedding consultation to discuss timeline, vision + must-have content",
    ],
    featured: true,
  },
  {
    id: "deluxe",
    name: "Deluxe",
    summary:
      "The fullest coverage, with three edits across the whole day.",
    price: "$125/hour",
    hours: "6-hour minimum",
    turnaround: "24–48 hours",
    includes: [
      "All usable, unedited photos + video clips delivered within 24 hours",
      "3 edited, ready-to-post videos delivered within 24–48 hours",
      "Pre-wedding consultation to discuss timeline, vision + must-have content",
    ],
  },
];
