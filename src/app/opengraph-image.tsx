import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.fullName} — ${siteConfig.tagline}`;

/**
 * Social share card. The plum wordmark sits on the site's off-white ground
 * with the orchid rule under it — the same lockup the header uses, at poster
 * scale. `next/og` cannot load the site's webfonts, so the tagline is set in
 * the system sans rather than silently falling back mid-render.
 */
export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/images/logo-plum.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FCFAFB",
        }}
      >
        <img src={logoSrc} alt="" width={492} height={343} />

        <div
          style={{
            width: 220,
            height: 3,
            background: "#EEA2F2",
            marginTop: 44,
            marginBottom: 32,
          }}
        />

        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            color: "#8A3C8D",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            color: "#9B6C9E",
            textTransform: "uppercase",
            marginTop: 16,
          }}
        >
          {siteConfig.serviceArea}
        </div>
      </div>
    ),
    size,
  );
}
