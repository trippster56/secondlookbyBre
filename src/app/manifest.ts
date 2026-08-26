import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * Web app manifest, linked automatically into every page's <head>.
 *
 * The maskable icons live in /public because Android installs read them from
 * there rather than through the App Router's icon convention. Colours are the
 * off-white page ground and the plum from globals.css, so the install splash
 * matches the site.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfafb",
    theme_color: "#531f55",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
