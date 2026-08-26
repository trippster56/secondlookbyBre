"use client";

import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import Sparkle from "@/components/ui/sparkle";
import { siteConfig } from "@/lib/site-config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section bg-shell">
      <div className="section-inner-narrow flex flex-col items-center gap-7 text-center">
        <Sparkle className="h-4 w-4" />
        <h1 className="type-h1">Something went wrong.</h1>
        <p className="type-lead measure">
          Sorry about that. Try again — and if it keeps happening, email{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>{" "}
          and I’ll pick it up from there.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button onClick={reset} size="hero">
            Try again
          </Button>
          <ButtonLink href="/" tone="secondary" size="hero">
            Back to the beginning
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
