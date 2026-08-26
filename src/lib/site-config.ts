/**
 * ========================================
 * SITE CONFIGURATION
 * ========================================
 * Single source of truth for everything site-specific: brand copy, contact
 * details, social links, SEO defaults. Nothing below should be hardcoded
 * anywhere else.
 */

const FALLBACK_SITE_URL = "https://thesecondlookbybre.com";

/**
 * The canonical origin, no trailing slash.
 *
 * `NEXT_PUBLIC_SITE_URL` is read at build time and can arrive in three broken
 * shapes: absent, present but empty (a Vercel variable added without a value),
 * or a bare host with no protocol. All three used to reach `new URL()`, which
 * throws at module load and fails the build while collecting page data. Resolve
 * them here instead, so a bad variable degrades to the fallback domain.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteConfig = {
  // ── Branding ──────────────────────────
  name: "The Second Look",
  fullName: "The Second Look by Bre",
  shortName: "Second Look",
  owner: "Breanna Lisenby",
  ownerFirstName: "Bre",
  // Lower case to match the way the tagline renders in the page title and on
  // the OG card.
  tagline: "wedding day content creation",
  serviceArea: "Florence, South Carolina + Beyond",
  // The eyebrow above the hero headline.
  heroEyebrow: "Florence, SC · travel available",
  // The hero headline, split so the middle clause can take the italic plum-mid
  // emphasis. One italic clause per headline is a spec rule, so this is the
  // only place on the site that does it.
  heroHeadline: {
    lead: "Wedding day content creation for the moments you lived,",
    emphasis: "the ones you missed,",
    trail: "and everything in between.",
  },
  heroSubline:
    "Candid, behind-the-scenes photos and videos captured on your wedding day and delivered quickly, so you don't have to wait weeks to experience it all over again.",
  description:
    "Candid, behind-the-scenes wedding day photos and vertical video, captured on your wedding day and delivered quickly. Based in Florence, South Carolina, with travel available.",
  // The line the footer and the home page's closing band both carry.
  strapline:
    "Your behind-the-scenes bestie with a camera roll dedicated entirely to your day",

  // Canonical origin. No trailing slash.
  // TODO(bre): confirm the domain, then set NEXT_PUBLIC_SITE_URL in Vercel.
  url: resolveSiteUrl(),

  // ── Contact ───────────────────────────
  contact: {
    // TODO(bre): the inbox enquiries should land in. Until this is confirmed,
    // /api/contact falls back to logging rather than sending.
    email: "hello@thesecondlookbybre.com",
  },

  // ── Social ────────────────────────────
  // TODO(bre): real handles. The footer links these three, in this order.
  socials: {
    instagram: "https://www.instagram.com/thesecondlookbybre/",
    tiktok: "https://www.tiktok.com/@thesecondlookbybre",
    facebook: "https://www.facebook.com/thesecondlookbybre/",
  },

  // ── SEO ───────────────────────────────
  // Wedding-content terms only. Breliz Designs covers the local-business work
  // under its own brand and site; nothing here should compete with it.
  seo: {
    keywords: [
      "wedding content creator",
      "wedding content creation",
      "Florence SC wedding content creator",
      "Pee Dee wedding content creator",
      "behind the scenes wedding photos",
      "wedding day social media content",
      "South Carolina wedding content creator",
      "The Second Look by Bre",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Primary navigation, mirrored by the header on desktop and mobile.
 *
 * Three routes, but the nav names four things: About and FAQ are sections of
 * the home page, so they are anchors rather than pages. The header's Inquire
 * pill is separate — it is the site's one primary action and never sits in
 * this list.
 */
export const navItems = [
  { name: "about", path: "/#about" },
  { name: "packages", path: "/pricing" },
  { name: "portfolio", path: "/take-a-look" },
  { name: "faq", path: "/#faq" },
] as const;

/** Where every "inquire" call to action points. */
export const INQUIRE_HREF = "/pricing#inquire";
