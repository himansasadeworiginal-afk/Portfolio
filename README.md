# Portfolio — K. Himansa Sadew Aloka

Personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS v4, Three.js, Framer Motion, and GSAP.

## Tech Stack

- **Next.js 16** (App Router, Turbopack, static export)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — 3D hero particles & shards
- **Framer Motion** — scroll animations, carousel, mobile menu, role text
- **GSAP** (ScrollTrigger) — horizontal projects film strip, timeline line draw
- **Lucide React** — icons
- **Formspree** — contact form backend

## Sections

Hero (cinematic Three.js), Marquee Strip, About, Skills (3D tag sphere), Projects (horizontal film strip), Case Studies, Experience, GitHub Activity, Services, Process/Philosophy, Testimonials, Contact, Footer

## Features

- **Wolf Logo Identity** — Animated SVG preloader, ghost wolf hero background, nav logo with eye glow, section dividers, contact watermark, Konami Code easter egg
- **Light/Dark Mode** — Theme toggle with CSS custom properties, localStorage persistence, system preference detection
- **Custom Cursor** — 3-state dynamic cursor (default, hover, project, text), disabled on touch devices
- **Glitch Text Effects** — CSS glitch hover + GSAP character-split scroll reveal on all section headings
- **PWA** — `manifest.json`, `robots.txt`, `sitemap.xml`, OG image
- **Accessibility** — `prefers-reduced-motion` support throughout, 44px minimum tap targets on mobile

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output goes to `out/`.

## Deployment

Pushing to `main` triggers GitHub Actions to build and deploy to GitHub Pages.
The workflow is defined in `.github/workflows/deploy.yml`.

## Data

All content is managed in `src/data/portfolio.ts`. Case study content in `src/data/caseStudies.ts`. Process steps in `src/data/process.ts`.

## Project Structure

```
src/
├── app/            — Pages and layouts
│   ├── case-study/[slug]/
│   └── globals.css
├── components/     — UI components
├── data/           — Content data files
├── hooks/          — Custom React hooks
└── lib/            — Utilities
```

## Phases

All 14 upgrade phases completed. See `../readme.txt` for detailed phase breakdown.
