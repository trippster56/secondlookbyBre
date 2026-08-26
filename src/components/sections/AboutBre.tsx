import Image from "next/image";

import Sparkle from "@/components/ui/sparkle";
import { about } from "@/data/home";

/**
 * "Hi, I'm Bre!" — the story behind the brand.
 *
 * Two columns from 1024px, with the photo sticky beside a long read so the
 * image is still there at the end of the third paragraph.
 */
export default function AboutBre() {
  return (
    <section id="about" className="section scroll-mt-24 bg-lilac">
      <div className="section-inner grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[72px]">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[200px] rounded-b-[6px]">
            {/* TODO(bre): a photo of you — this placeholder is a guest filming
                the first dance, which is the idea but not the person. */}
            <Image
              src="/images/about-filming.jpg"
              alt="A guest filming the first dance on her phone from the head table"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <p className="type-eyebrow flex items-center gap-3">
            <Sparkle />
            {about.eyebrow}
          </p>
          <h2 className="type-h2 max-w-[16ch] lg:max-w-none">{about.heading}</h2>

          <div className="flex flex-col gap-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="type-lead measure">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="type-h3 max-w-[24ch] border-t border-rule pt-7">
            {about.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
