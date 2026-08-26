@README.md

Read the README first — it covers the stack, layout and environment.

## Architecture rules

### The build spec is the source of truth

This site was designed before it was built. The agreed direction is **1b,
"light and airy"** — Cormorant Garamond + Karla, plum on off-white, orchid only
on interaction — and every token in `globals.css` is a transcription of that
spec, not a preference. If a value looks arbitrary, it isn't: check the spec
before changing it.

The rules that come out of it, and that the whole site depends on:

- **Sections alternate `shell` / `lilac`.** Never two of the same in a row.
  Max two background colours per viewport.
- **Orchid never carries text.** It is a fill, a wash, or the sparkle glyph.
  Anything sitting on orchid takes `on-orchid` (`#431745`).
- **The orchid hero wash appears once per page**, top-right of the hero only,
  as a soft radial with no hard edge.
- **One primary pill per section.** The orchid hover is the only place orchid
  becomes a background at full strength.
- **Rules are 1px.** Never thicker.
- **Cormorant never goes below 28px** — it goes spindly. Use Karla instead.
- **One italic clause per headline, maximum.** Today that budget is spent on
  the hero's "the ones you missed".

### Vertical rhythm is one class: `.section`

64px/24px on phones, 80px/32px from 640, 100px/48px from 1024 — set once in
`globals.css`. Every section on every route uses it, including each page's
first, so no route carries its own top spacing. If a page needs to breathe
differently, that is a site-wide decision, not a per-page class.

### Components first

Use what exists before building something new. Check in this order:

1. **`src/components/ui/`** — project primitives: `Button`/`ButtonLink` (the
   pill, with the spec's tones and sizes), `Field`/`FieldInput`/`FieldSelect`/
   `FieldTextarea`/`FieldDatePicker`, `Sparkle`, `ArrowLink`, brand icons.
2. **shadcn** — `npx shadcn@latest add <component>` for anything else. The
   registry is configured in `components.json` (`base-nova` style, Base UI
   primitives). Match the existing files' shape: `cva` for variants, `cn` to
   merge classes.
3. **Only then** write something new, and make it reusable.

**`shadcn add` overwrites `button.tsx`.** Most registry components depend on
it, so any `add` silently replaces the site's pill — `tone`, the sizes and
`ButtonLink` all go, and every CTA on the site changes shape. Check
`git status` after an `add` and `git checkout -- src/components/ui/button.tsx`
if it appears.

### No native form controls

`<select>` and `<input type="date">` render the operating system's widget:
neither takes the site's type or palette, and on iOS both become full-height
system sheets. The enquiry form uses `FieldSelect` (Base UI Select) and
`FieldDatePicker` (react-day-picker in a Popover) instead. `FieldDatePicker`
holds a `yyyy-MM-dd` string, which is what `/api/contact` and the notification
email expect, and it closes off dates before today — a wedding enquiry is
always about a date still to come.

Do not pass `autoFocus` to `Calendar`. react-day-picker focuses a day before
the popover has been positioned, and the browser follows it — scrolling the
visitor to the top of the page.

### Content is data

Copy, FAQ answers, packages and gallery items belong in `src/data/`. Brand
details, contact info, socials and SEO defaults belong in
`src/lib/site-config.ts`. A copy change should never require touching a
component.

The copy in `src/data/home.ts` and `src/data/faq.ts` is **Bre's own writing**,
from her brief. Fix a typo, but do not "improve" her voice.

### Server by default

Pages are Server Components. Add `"use client"` only for genuine interactivity,
and push it to the smallest leaf — see `components/sections/FaqAccordion.tsx`
and `app/pricing/inquire-form.tsx`, which are client islands inside server
pages. `Header` is client-side only because of the mobile menu.

### Metadata is not optional

Every new route exports `metadata` built with `pageMetadata()` from
`src/lib/seo.ts`, and carries exactly one `<h1>`. Add the route to
`src/app/sitemap.ts`.

## Watch out for

- **The supplied logo has its plum background baked in.** The original
  (`The Second Look.PNG`, a 2000×2000 square) is orchid ink on a solid plum
  field — it is *not* transparent, so dropping it on the off-white header
  would put a plum tile in the corner. `public/images/logo-plum.png`,
  `logo-orchid.png` and `logo-shell.png` are keyed versions: the plum ground
  was removed by projecting each pixel onto the plum→orchid axis and using
  that as alpha. **Use `logo-plum.png` on light grounds and `logo-orchid.png`
  on plum.** If the artwork is ever reissued, prefer a real transparent SVG and
  delete the keyed PNGs.
- **The header logo has a fixed height and `w-auto`.** The lockup is three
  stacked lines; letting it size itself from the intrinsic 1738×1212 would
  overhang the bar.
- **The favicon is a redrawn sparkle, not the logo's.** The logo's own star is
  fine-lined and disintegrates below 32px, so `src/lib/brand-mark.ts` holds a
  slightly bolder reading of the same shape. `src/app/icon.svg` carries the
  same paths inline because a static file has to be self-contained — **keep
  the two in step**, and re-render `public/images/icon-*.png` from `icon.svg`
  if the paths change.
- **Every photo on the site is a placeholder.** They came from the design
  session, not from Bre's camera roll, and they are not her work. They are
  fine for layout and must not survive launch — see below.
- **Package prices are drafts.** `src/data/packages.ts` exports
  `PLACEHOLDER_PRICING`, which renders the "draft packages" notice on
  `/pricing` and turns every `TODO` value into a "to be confirmed" chip. The
  flag exists so nothing false can ship silently. Flip it to `false` only when
  every figure is real.
- **The gallery is empty-safe.** `/take-a-look` renders a "being edited right
  now" state when `galleryItems` is empty, so real work can be dropped in as a
  data-only change.
- **`fill()` before hydration loses its value.** The enquiry form is a
  controlled React island; a Playwright `fill()` that lands pre-hydration is
  overwritten when React takes over. `tests/inquire.spec.ts` has a `fillField`
  helper that retries until the value sticks — use it rather than raw `fill()`.

## Before launch

Everything below is a placeholder with a `TODO(bre)` marker in the code:

1. **Domain** — `NEXT_PUBLIC_SITE_URL`. `site-config.ts` assumes
   `thesecondlookbybre.com`.
2. **Enquiry inbox** — `siteConfig.contact.email`, plus `RESEND_TO_EMAIL` and
   `RESEND_FROM_EMAIL` in Vercel. Until the key is set, enquiries are logged,
   not delivered.
3. **Social URLs** — Instagram, TikTok and Facebook in `siteConfig.socials`.
4. **Package prices, coverage and turnaround** — `src/data/packages.ts`, then
   set `PLACEHOLDER_PRICING = false`.
5. **Photography** — the hero trio (`src/data/home.ts`), the about portrait
   (`components/sections/AboutBre.tsx`) and every gallery item
   (`src/data/gallery.ts`). Replace with Bre's real work, and rewrite the alt
   text to describe the actual moment.
