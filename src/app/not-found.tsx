import { ButtonLink } from "@/components/ui/button";
import Sparkle from "@/components/ui/sparkle";

export default function NotFound() {
  return (
    <section className="section bg-shell">
      <div className="section-inner-narrow flex flex-col items-center gap-7 text-center">
        <Sparkle className="h-4 w-4" />
        <h1 className="type-h1">This page slipped away.</h1>
        <p className="type-lead measure">
          The link may be out of date. The wedding content, the packages and the
          way to reach me are all still here.
        </p>
        <ButtonLink href="/" size="hero" className="max-sm:w-full">
          Back to the beginning
        </ButtonLink>
      </div>
    </section>
  );
}
