import ClosingBand from "@/components/sections/ClosingBand";
import ReelsFeed from "@/components/sections/ReelsFeed";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import Sparkle from "@/components/ui/sparkle";
import { fetchInstagramReels } from "@/lib/instagram";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Take a Look",
  description:
    "Real moments from real weddings — candid, behind-the-scenes photos and vertical video from wedding days across Florence, South Carolina and the Pee Dee.",
  path: "/take-a-look",
  keywords: [
    "wedding content creator portfolio",
    "behind the scenes wedding video",
  ],
});

/**
 * The one route that isn't fully static: the reels come from Instagram, so the
 * page rebuilds itself hourly. The portfolio is Instagram — the six latest
 * reels here, everything else one click away on her profile. With no token the
 * fetch returns nothing and the page is just the link out.
 */
// Must be a literal — Next reads this statically, so it can't be imported.
// Keep it in step with `INSTAGRAM_REVALIDATE_SECONDS` in lib/instagram.ts.
export const revalidate = 3600;

export default async function TakeALookPage() {
  const reels = await fetchInstagramReels();

  return (
    <>
      <section className="section bg-shell">
        <div className="section-inner flex flex-col gap-11">
          <div className="flex flex-col gap-4">
            <p className="type-eyebrow flex items-center gap-3">
              <Sparkle />
              Portfolio
            </p>
            <h1 className="type-h1">Take a Look</h1>
            <p className="type-lead measure">
              Real moments. Real weddings. The parts of the day you’ll want to
              watch again and again.
            </p>
          </div>

          <ReelsFeed reels={reels} />

          <ButtonLink
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            tone="secondary"
            className="self-center max-sm:w-full"
          >
            <InstagramIcon className="h-4 w-4" />
            See more on Instagram
          </ButtonLink>
        </div>
      </section>

      <ClosingBand className="bg-lilac" />
    </>
  );
}
