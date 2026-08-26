"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import Sparkle from "@/components/ui/sparkle";
import { INQUIRE_HREF, navItems, siteConfig } from "@/lib/site-config";

const MOBILE_MENU_ID = "mobile-menu";

export default function Header() {
  const pathname = usePathname();
  // The route the menu was opened on is stored alongside the flag, so any
  // navigation — a menu link, or the browser's back button — closes the menu
  // without needing an effect to chase the pathname.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const isMenuOpen = menu.open && menu.path === pathname;
  const setIsMenuOpen = (open: boolean) => setMenu({ open, path: pathname });

  // While the full-screen menu is up, hold the page still behind it and let
  // Escape dismiss it.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu((current) => ({ ...current, open: false }));
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const isCurrent = (path: string) => pathname === path;

  return (
    <header className="border-b border-rule bg-shell">
      <div className="mx-auto flex max-w-[1104px] items-center justify-between gap-8 px-6 py-4 lg:px-12 lg:py-5">
        {/*
          The wordmark is a stacked, three-line lockup on a transparent ground
          — the supplied artwork has its plum background baked in, so the
          variants in /public/images are keyed versions of it. On this
          off-white header the plum one sits directly on the page with no tile,
          which is what the spec asks for. Height is fixed and the width
          follows, so the lockup can never overhang the bar.
        */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${siteConfig.fullName} — home`}
        >
          <Image
            src="/images/logo-plum.png"
            alt={`${siteConfig.fullName} logo`}
            width={1738}
            height={1212}
            priority
            className="h-12 w-auto lg:h-16"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              aria-current={isCurrent(item.path) ? "page" : undefined}
              className="text-[12px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-plum"
            >
              {item.name}
            </Link>
          ))}
          <ButtonLink href={INQUIRE_HREF} tone="nav" size="nav">
            Inquire
          </ButtonLink>
        </nav>

        {/* Mobile: the primary action stays visible beside the menu button. */}
        <div className="flex items-center gap-3 md:hidden">
          <ButtonLink href={INQUIRE_HREF} tone="nav" size="nav">
            Inquire
          </ButtonLink>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 text-plum"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — full-screen lilac overlay */}
      <div
        id={MOBILE_MENU_ID}
        // Stays mounted so it can slide; `inert` keeps it out of the tab order
        // and away from screen readers while it is off-canvas.
        inert={!isMenuOpen}
        className={`fixed inset-0 z-50 bg-lilac transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-rule px-6 py-4">
            <Image
              src="/images/logo-plum.png"
              alt=""
              width={1738}
              height={1212}
              className="h-12 w-auto"
            />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-plum"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          <nav className="flex flex-col px-6" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                aria-current={isCurrent(item.path) ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-rule py-5 text-[15px] uppercase tracking-[0.18em] text-plum last:border-0"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col items-center gap-6 px-6 pb-10 pt-8">
            <ButtonLink
              href={INQUIRE_HREF}
              tone="primary"
              size="block"
              onClick={() => setIsMenuOpen(false)}
            >
              Inquire about your date
            </ButtonLink>
            <Sparkle />
          </div>
        </div>
      </div>
    </header>
  );
}
