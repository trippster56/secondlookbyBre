import type { Metadata } from "next";

import { siteConfig } from "./site-config";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Site-relative path, used for the canonical URL. */
  path: string;
  keywords?: readonly string[];
}

/**
 * Per-route metadata: canonical URL plus Open Graph and Twitter cards.
 * `title` runs through the template declared in the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

/**
 * Structured data describing the business. Emitted once, in the root layout,
 * so every page carries it.
 *
 * `areaServed` is the Pee Dee rather than the whole country: this is a local
 * vendor couples search for by region, and claiming national coverage would
 * dilute exactly the queries she wants to win.
 */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#business"),
    name: siteConfig.fullName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl("/images/logo-plum.png"),
    logo: absoluteUrl("/images/logo-plum.png"),
    email: siteConfig.contact.email,
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: siteConfig.owner,
      jobTitle: "Wedding Content Creator",
    },
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.tiktok,
      siteConfig.socials.facebook,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Florence",
      addressRegion: "SC",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Florence, South Carolina" },
      { "@type": "AdministrativeArea", name: "Pee Dee, South Carolina" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding content packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Content Creation",
            description:
              "Candid, behind-the-scenes photos and vertical video captured on your wedding day and delivered quickly.",
            url: absoluteUrl("/pricing"),
          },
        },
      ],
    },
  };
}

/** FAQ structured data, from the questions the home page already answers. */
export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
