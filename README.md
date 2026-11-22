# Danco Analytics

Modern portfolio and company site for Danco Analytics. Built with React + Vite, styled with Tailwind, and optimized for performance, accessibility, and strong storytelling.

## Highlights

- Case studies with measurable impact
- Thought leadership and research sections
- Consent-based analytics (GA4)
- Responsive, mobile-first layout
- Fast build and deploy via Vite

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Recharts

## Local Setup

### Prerequisites

- Node.js (v18+ recommended)

### Install

```bash
npm install
```

### Environment

Create a `.env.local` in the project root:

```bash
VITE_GA4_ID=G-XXXXXXXXXX
```

`VITE_GA4_ID` is optional and only used when analytics consent is accepted.

### Contact Form API

The site posts inquiries to `POST /api/contact`. The Worker (`src/worker.ts`) and Pages Function (`functions/api/contact.ts`) share the same intake pipeline in `src/lib/contact-intake.ts`.

### Insights search

The Insights hub (`/#insights`) searches the shared catalog in `src/lib/insights-catalog.ts`. Filters are shareable on the query string and do not replace the `#insights` hash:

- `q` — words matched across title, summary, tags, venue, date, place, and format
- `kind` — `article`, `talk`, or `research`
- `tag` — one normalized tag, such as `ml`

With no filter, the hub keeps the speaking, research, and article sections. A filter replaces those sections with the ranked matches.

Set these secrets in the Cloudflare project (do not commit them):

- `CONTACT_TO` — destination inbox
- `CONTACT_FROM` — an address on a domain you control
- `CONTACT_SUBJECT_PREFIX=Danco Analytics` (optional)

Run unit tests with `npm test`.

### Assets

Add these files so the UI renders correctly:

- `public/assets/photo/profile.jpg`
- `public/assets/resume/Danco-Analytics-Resume.pdf`
- `public/assets/case-studies/smart-grid.jpg`
- `public/assets/case-studies/real-estate.jpg`
- `public/assets/case-studies/health-it.jpg`
- `public/assets/og/danco-analytics-og.jpg`

Optional (higher quality): add `.webp` or `.avif` versions for the case studies.

### Run

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

- Netlify config: `netlify.toml`
- GitHub Actions CI: `.github/workflows/ci.yml`

## Structure

- `src/components` — sections and UI blocks
- `public/assets` — images, PDFs, and social previews

## Notes

- Use `http://localhost:3000/` during development so assets load correctly.
- Update `public/sitemap.xml` and `public/robots.txt` with your production domain.
