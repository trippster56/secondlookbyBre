# The Second Look by Bre

Marketing site for **The Second Look by Bre** — wedding-day content creation in
Florence, South Carolina, and beyond.

Candid, behind-the-scenes photos and vertical video shot on the wedding day and
delivered quickly. Three pages: the story and what's included, the portfolio,
and packages with the enquiry form.

## Stack

| Concern    | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)            |
| UI         | React 19                                      |
| Styling    | Tailwind CSS v4 (CSS-first `@theme`)          |
| Components | shadcn (`base-nova`) on Base UI primitives    |
| Icons      | lucide-react                                  |
| Email      | Resend                                        |
| Tests      | Playwright                                    |
| Hosting    | Vercel                                        |

Every page is statically prerendered except `/take-a-look`, which revalidates
hourly to pick up Bre's latest Instagram reels. Two server functions:
`/api/contact` and `/api/instagram/refresh`, the daily cron that keeps the
Instagram token alive.

The stack deliberately mirrors [Breliz Designs](../brelizdesigns) — same client,
same maintainer, so the two sites stay one thing to learn.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional for local work
npm run dev                  # http://localhost:3000
```

The enquiry form works without any configuration: with no `RESEND_API_KEY`
present, `/api/contact` logs the submission to the server console and returns
success.

### Scripts

| Script              | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server                                    |
| `npm run build`     | Production build                              |
| `npm start`         | Serve the production build                    |
| `npm run lint`      | ESLint (`eslint-config-next`)                 |
| `npm run typecheck` | `tsc --noEmit`                                |
| `npm test`          | Playwright across desktop, mobile and tablet  |
| `npm run test:all`  | Every Playwright project                      |

## Environment

| Variable               | Required   | Notes                                        |
| ---------------------- | ---------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | production | Canonical origin, no trailing slash          |
| `RESEND_API_KEY`       | production | Without it, submissions are logged not sent  |
| `RESEND_FROM_EMAIL`    | optional   | Defaults to `onboarding@resend.dev`          |
| `RESEND_TO_EMAIL`      | optional   | Defaults to `siteConfig.contact.email`       |
| `INSTAGRAM_ACCESS_TOKEN` | optional | Seed token for the reels feed on `/take-a-look` |
| `BLOB_READ_WRITE_TOKEN` | with the feed | Set by connecting a Blob store; holds the rotated token |
| `CRON_SECRET`          | with the feed | Bearer token Vercel's cron sends to the refresh route |

## Layout

```
src/
├── app/                    # Routes, one directory per page
│   ├── layout.tsx          # Fonts, base metadata, business JSON-LD
│   ├── globals.css         # Design tokens + Tailwind theme
│   ├── page.tsx            # Home
│   ├── take-a-look/        # Portfolio
│   ├── pricing/            # Packages + the enquiry form island
│   ├── sitemap.ts          # /sitemap.xml
│   ├── robots.ts           # /robots.txt
│   ├── icon.svg            # Favicon — the logo's sparkle
│   ├── apple-icon.png      # Touch icon
│   ├── opengraph-image.tsx # Social card, generated
│   ├── api/contact/        # Enquiry endpoint (+ dev-only email preview)
│   └── api/instagram/      # Daily cron: rotates the Instagram token
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Composed, page-level blocks
│   └── ui/                 # Primitives (Button, Field, Sparkle, icons)
├── data/                   # Page content: copy, FAQ, packages, gallery
└── lib/
    ├── site-config.ts      # Brand, contact details, socials, SEO defaults
    ├── instagram.ts        # The reels feed behind /take-a-look
    ├── instagram-token.ts  # Where that feed's token lives, and how it rotates
    ├── seo.ts              # Per-page metadata + structured data helpers
    ├── contact-email.ts    # The notification email
    ├── brand-mark.ts       # The sparkle's paths
    └── utils.ts            # `cn`
```

Copy, packages and contact details live in `src/data/` and
`src/lib/site-config.ts`. Editing text should not mean editing a component.

## Design tokens

`src/app/globals.css` holds the whole visual system, and it is a direct
transcription of the agreed build spec (direction 1b, "light and airy"):

- **Colour** — `plum` `#531F55` and `orchid` `#EEA2F2` are fixed by the logo;
  `plum-mid`, `orchid-deep`, `shell`, `lilac`, `rule` and the three `ink` steps
  are support. Sections alternate `shell` / `lilac`, never two the same in a
  row. Orchid never carries text.
- **Type** — `font-serif` is Cormorant Garamond (display, 400 plus one italic
  clause per headline), `font-sans` is Karla (300/400/500/600). Both are
  self-hosted through `next/font`. The scale is exposed as `.type-h1` …
  `.type-eyebrow`, which carry the responsive steps.
- **Spacing** — a 4px base: 8, 16, 28, 44, 72, 100. Sections use the `.section`
  class, which is the site's only vertical rhythm.

## SEO

- Per-route `title`, `description` and canonical URL via `pageMetadata()`.
- Open Graph and Twitter cards on every route, with a generated 1200×630 image.
- `ProfessionalService` structured data site-wide, with `areaServed` set to
  Florence and the Pee Dee, plus `FAQPage` data built from `src/data/faq.ts`.
- `sitemap.xml` and `robots.txt` generated from code.
- One `<h1>` per page.

Set `NEXT_PUBLIC_SITE_URL` in production — canonical URLs, the sitemap and OG
tags are all derived from it.

## Testing

```bash
npm run build && npm start        # in one shell
BASE_URL=http://localhost:3000 npx playwright test
```

Run `npx playwright test` on its own and it will start the dev server itself.
Coverage: every route renders with a single `<h1>` and complete metadata,
structured data is present, navigation on both breakpoints, the enquiry form's
success, failure, validation and date-picker paths, the gallery's populated and
empty states, and the contact API's validation.

## The portfolio feed

`/take-a-look` reads Bre's latest reels from Instagram so the portfolio keeps
itself current — a new reel appears on the site without a deploy. Tiles play in
place; the corner link opens the original post.

### Setting it up

1. Bre's Instagram (`@thesecondlookbybre`) must be a **professional** account —
   Creator or Business.
2. Create an app in the Meta dashboard with **Instagram API with Instagram
   Login**, authorise her account, and exchange the short-lived token for a
   long-lived one.
3. Paste it into `INSTAGRAM_ACCESS_TOKEN` in Vercel, connect a **Blob store** to
   the project (which sets `BLOB_READ_WRITE_TOKEN`), and set `CRON_SECRET` to
   any long random string.
4. Trigger the first rotation once: `GET /api/instagram/refresh?force=1` with
   `Authorization: Bearer $CRON_SECRET`.

### Why it doesn't need touching again

Meta's long-lived tokens expire after 60 days, so the token has to rotate, and
environment variables are read-only at runtime. `src/lib/instagram-token.ts`
therefore keeps the live token in a **private blob**, seeded from
`INSTAGRAM_ACCESS_TOKEN` on the first run. The cron in `vercel.json` calls
`/api/instagram/refresh` daily; the route exchanges the token for a fresh 60-day
one only when fewer than 30 days remain, then revalidates `/take-a-look`. A
missed day costs nothing.

The one way to break the chain is to let it lapse entirely: an *expired* token
cannot be refreshed, and Bre has to reauthorise. Nothing else about the feed is
load-bearing — without a token, an expired one, or a Meta outage, the fetch
returns an empty list and the page falls back to the stills grid in
`src/data/gallery.ts`. A broken feed is never a broken page.

## Still outstanding

See the "Before launch" list in `CLAUDE.md` — photos, socials, the domain and
the Instagram token are still outstanding.
