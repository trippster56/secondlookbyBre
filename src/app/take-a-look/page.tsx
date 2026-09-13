import ClosingBand from "@/components/sections/ClosingBand";
import GalleryGrid from "@/components/sections/GalleryGrid";
import ReelsFeed from "@/components/sections/ReelsFeed";
import Sparkle from "@/components/ui/sparkle";
import { galleryItems } from "@/data/gallery";
import { fetchInstagramReels } from "@/lib/instagram";
import { pageMetadata } from "@/lib/seo";

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
 * page rebuilds itself hourly. With no `INSTAGRAM_ACCESS_TOKEN` the fetch
 * returns nothing and this is a static page again.
 */
// Must be a literal — Next reads this statically, so it can't be imported.
// Keep it in step with `INSTAGRAM_REVALIDATE_SECONDS` in lib/instagram.ts.
export const revalidate = 3600;

export default async function TakeALookPage() {
  const reels = await fetchInstagramReels();

  // With reels on the page, an empty stills grid has nothing to apologise for —
  // its "being edited right now" state would read as false. Show it only when
  // there are stills, or when there is nothing else on the page.
  const showStills = galleryItems.length > 0 || reels.length === 0;

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

          {reels.length > 0 && (
            <div className="flex flex-col gap-6">
              <p className="type-eyebrow">Straight from Instagram</p>
              <ReelsFeed reels={reels} />
            </div>
          )}

          {showStills && (
            <div className="flex flex-col gap-6" data-testid="stills-grid">
              {reels.length > 0 && <p className="type-eyebrow">Stills</p>}
              <GalleryGrid />
            </div>
          )}
        </div>
      </section>

      <ClosingBand className="bg-lilac" />
    </>
  );
}
