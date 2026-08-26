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

Every page is statically prerendered; `/api/contact` is the only server
function.

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
│   └── api/contact/        # Enquiry endpoint (+ dev-only email preview)
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Composed, page-level blocks
│   └── ui/                 # Primitives (Button, Field, Sparkle, icons)
├── data/                   # Page content: copy, FAQ, packages, gallery
└── lib/
    ├── site-config.ts      # Brand, contact details, socials, SEO defaults
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

## Still outstanding

See the "Before launch" list in `CLAUDE.md` — real prices, photos, socials,
the domain and the enquiry inbox are all still placeholders.
