import Image from "next/image";
import Link from "next/link";

import {
  FacebookIcon,
  type IconComponent,
  InstagramIcon,
  TiktokIcon,
} from "@/components/ui/brand-icons";
import Sparkle from "@/components/ui/sparkle";
import { navItems, siteConfig } from "@/lib/site-config";

const socialLinks: { href: string; label: string; icon: IconComponent }[] = [
  { href: siteConfig.socials.instagram, label: "Instagram", icon: InstagramIcon },
  { href: siteConfig.socials.tiktok, label: "TikTok", icon: TiktokIcon },
  { href: siteConfig.socials.facebook, label: "Facebook", icon: FacebookIcon },
];

export default function Footer() {
  // Rendered on the server, so this reflects the most recent deploy.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-plum text-on-plum">
      <div className="mx-auto max-w-[1104px] px-6 py-16 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label={`${siteConfig.fullName} — home`}>
              {/* Orchid on plum: the artwork's original colourway. */}
              <Image
                src="/images/logo-orchid.png"
                alt={`${siteConfig.fullName} logo`}
                width={1738}
                height={1212}
                className="h-20 w-auto"
              />
            </Link>
            <div className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.22em] text-orchid">
              <span>{siteConfig.tagline}</span>
              <span>{siteConfig.serviceArea}</span>
            </div>
          </div>

          {/* Navigation, mirroring the header */}
          <div className="flex flex-col gap-5">
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-orchid">
              Explore
            </h2>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-[13px] uppercase tracking-[0.18em] text-on-plum transition-colors hover:text-orchid"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-orchid">
              Say hello
            </h2>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-[15px] text-on-plum transition-colors hover:text-orchid"
            >
              {siteConfig.contact.email}
            </a>
            <div className="flex gap-4">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-orchid/40 text-orchid transition-colors hover:bg-orchid hover:text-on-orchid"
                >
                  <span className="sr-only">{label}</span>
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar — the strapline, which is also the home page's sign-off. */}
        <div className="mt-14 flex flex-col gap-4 border-t border-orchid/25 pt-8 text-[11px] uppercase tracking-[0.22em] text-orchid sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3">
            <Sparkle className="fill-orchid" />
            {siteConfig.strapline}
          </span>
          <span>
            © {currentYear} {siteConfig.fullName}
          </span>
        </div>
      </div>
    </footer>
  );
}
