import ClosingBand from "@/components/sections/ClosingBand";
import GalleryGrid from "@/components/sections/GalleryGrid";
import Sparkle from "@/components/ui/sparkle";
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

export default function TakeALookPage() {
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

          <GalleryGrid />
        </div>
      </section>

      <ClosingBand className="bg-lilac" />
    </>
  );
}
