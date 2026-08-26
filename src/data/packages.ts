/**
 * ⚠️ PLACEHOLDER PRICING — NOT BRE'S NUMBERS.
 *
 * The brief has no package tiers yet, so these three are drafted structure,
 * not quoted prices. Every figure below is marked TODO on purpose: the site
 * renders the marker verbatim, so nothing false can reach a couple's screen
 * while the real numbers are still outstanding.
 *
 * To go live: replace `price` and `turnaround` on each tier with the real
 * values, delete the TODO comments, and check `PLACEHOLDER_PRICING` below is
 * flipped to false — that flag is what renders the "draft" notice on the
 * pricing page.
 */

export const PLACEHOLDER_PRICING = true;

export interface Package {
  id: string;
  name: string;
  /** One line on who the tier suits. */
  summary: string;
  /** TODO(bre): real price. */
  price: string;
  /** Coverage window. TODO(bre): confirm hours. */
  hours: string;
  /** TODO(bre): real turnaround, raw and edited. */
  turnaround: string;
  includes: string[];
  /** The middle tier is the one most couples land on — say so, once. */
  featured?: boolean;
}

export const packages: Package[] = [
  {
    id: "highlight",
    name: "The Highlight",
    summary:
      "The parts of the day you would most want back: getting ready through the first dance.",
    price: "TODO",
    hours: "TODO — half day",
    turnaround: "TODO",
    includes: [
      "Behind-the-scenes coverage of the moments you choose",
      "Candid photos and vertical video clips",
      "A set of edited short-form videos ready to post",
      "Your full camera roll, delivered digitally",
    ],
  },
  {
    id: "full-day",
    name: "The Full Day",
    summary:
      "Getting ready, details, ceremony, reception, and everything in between.",
    price: "TODO",
    hours: "TODO — full day",
    turnaround: "TODO",
    includes: [
      "Full-day behind-the-scenes coverage",
      "Candid photos and vertical video clips throughout",
      "Getting ready, details, ceremony, reception + everything in between",
      "Edited short-form videos/Reels, social-media-ready",
      "A camera roll full of moments ready to relive and share",
    ],
    featured: true,
  },
  {
    id: "weekend",
    name: "The Weekend",
    summary:
      "For couples whose wedding is a weekend — rehearsal, welcome party and the day itself.",
    price: "TODO",
    hours: "TODO — multi-day",
    turnaround: "TODO",
    includes: [
      "Everything in The Full Day",
      "Rehearsal dinner and welcome party coverage",
      "A same-night teaser posted while the weekend is still happening",
      "Extended edit set across the whole weekend",
    ],
  },
];
