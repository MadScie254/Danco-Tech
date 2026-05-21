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
AI_API_KEY=your_gemini_key
VITE_GA4_ID=G-XXXXXXXXXX
```

`VITE_GA4_ID` is optional and only used when analytics consent is accepted.

### Cloudflare Pages Contact Form

This project uses a Cloudflare Pages Function to send contact form emails via MailChannels.
Set the following environment variables in your Cloudflare Pages project:

- `CONTACT_TO=dmwanjala254@gmail.com`
- `CONTACT_FROM=no-reply@yourdomain.com`
- `CONTACT_SUBJECT_PREFIX=Danco Analytics` (optional)

`CONTACT_FROM` should be an address on a domain you control.

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
