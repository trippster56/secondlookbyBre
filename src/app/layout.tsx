import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";

import JsonLd from "@/components/JsonLd";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { businessJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

// Self-hosted through next/font — no render-blocking request to Google.
// Cormorant carries the display voice at 400 plus one italic clause per
// headline; Karla carries everything else.
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

const karla = Karla({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.owner,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${karla.variable} ${cormorant.variable}`}>
      <body>
        <div className="min-h-screen bg-shell">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <JsonLd data={businessJsonLd()} />
      </body>
    </html>
  );
}
