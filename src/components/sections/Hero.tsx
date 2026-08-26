import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import Sparkle from "@/components/ui/sparkle";
import { heroPhotos } from "@/data/home";
import { INQUIRE_HREF, siteConfig } from "@/lib/site-config";

/**
 * The home page hero: headline left, a photo trio right.
 *
 * The orchid wash is the one decorative flourish in the whole direction —
 * a soft radial at 34% peak with no hard edge, top-right of the hero only,
 * dropped to 20% on phones where it would otherwise sit under the headline.
 */
export default function Hero() {
  const { heroHeadline } = siteConfig;

  return (
    <section className="relative overflow-hidden bg-shell px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:pb-[104px] lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[620px] w-[620px] rounded-full opacity-60 lg:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(238,162,242,0.34), rgba(238,162,242,0) 68%)",
        }}
      />

      <div className="section-inner relative grid items-center gap-12 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:gap-[72px]">
        <div className="flex flex-col gap-7">
          <p className="type-eyebrow flex items-center gap-3">
            <Sparkle />
            {siteConfig.heroEyebrow}
          </p>

          <h1 className="type-h1">
            {heroHeadline.lead}{" "}
            <em className="italic text-plum-mid">
              {heroHeadline.emphasis}
            </em>{" "}
            {heroHeadline.trail}
          </h1>

          <p className="type-lead measure-lead">{siteConfig.heroSubline}</p>

          <div>
            <ButtonLink href={INQUIRE_HREF} size="hero" className="max-sm:w-full">
              Inquire about your date
            </ButtonLink>
          </div>
        </div>

        {/*
          One 9:16 arch and two 4:3 crops. On phones the arch goes full width
          above the pair, which keeps the tall crop from squashing; from 640px
          the three cells hold the layout the artboard draws.
        */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="relative col-span-2 h-[360px] overflow-hidden rounded-t-[200px] rounded-b-[6px] sm:col-span-1 sm:row-span-2 sm:h-full">
            <Image
              src={heroPhotos.arch.src}
              alt={heroPhotos.arch.alt}
              fill
              priority
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-[150px] overflow-hidden rounded-[6px] lg:h-[210px]">
            <Image
              src={heroPhotos.detail.src}
              alt={heroPhotos.detail.alt}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-[150px] overflow-hidden rounded-[6px] lg:h-[210px]">
            <Image
              src={heroPhotos.reception.src}
              alt={heroPhotos.reception.alt}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
