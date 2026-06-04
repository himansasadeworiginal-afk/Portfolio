# Portfolio — H. Sadew

**Live:** [himansasadeworiginal-afk.github.io/Portfolio](https://himansasadeworiginal-afk.github.io/Portfolio/)

Personal portfolio website for **H. Sadew**, Creative Director of **Wolf Industries**. Built with Next.js 16, TypeScript, Tailwind CSS v4, Three.js, Framer Motion, and GSAP.

## Tech Stack

- **Next.js 16** (App Router, Turbopack, static export)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — 3D hero, tag sphere
- **Framer Motion** — scroll animations, carousel, mobile menu, role text
- **GSAP** (ScrollTrigger) — horizontal projects film strip, timeline line draw, text effects, preloader
- **Lucide React** — icons

## Sections

Cinematic Preloader (7-stage GSAP), Hero (Three.js), Marquee Strip, About, Skills (3-tab Fibonacci sphere: Frontend/AI/Creative), Projects (GSAP film strip), Case Studies (before/after sliders), Experience (GSAP timeline), GitHub Activity, Services, Process, Testimonials, Contact, Footer

## Features

- **Wolf Identity** — Animated 7-stage preloader, gold emblem on portrait, "WI" monogram, ghost wolf watermarks throughout
- **Preloader** — Wolf SVG stroke-draw, gold eye pulse, letter-by-letter name reveal, skill pills, scanner wipe (sessionStorage-gated)
- **Light/Dark Mode** — Theme toggle with CSS custom properties, localStorage persistence, system preference fallback
- **Custom Cursor** — 4-state dynamic cursor (dot+ring, hover label, project view, text I-beam), disabled on touch
- **Glitch Text Effects** — CSS glitch hover + GSAP character-split scroll reveal on all section headings
- **3D Interactive** — Three.js particle field + floating shards (hero), 3-tab Fibonacci sphere skill tags
- **Background Depth** — Dot-grid, stripes, hexagonal tile, circuit board, watermarks, and spotlights on every section
- **PWA & SEO** — `manifest.json`, `robots.txt`, `sitemap.xml`, custom OG image, `next/font`, lazy-loaded Three.js
- **Mobile Optimized** — No Three.js on mobile, vertical project stack, 2D skill grid, tap targets
- **Accessibility** — `prefers-reduced-motion` support throughout, semantic HTML, ARIA labels

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static export goes to `out/`.

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
├── components/     — UI components (Preloader, Navigation, Skills, Projects, etc.)
├── data/           — Content data files
├── hooks/          — Custom React hooks
└── lib/            — Utilities
```

## Upgrade Phases

### v2.0

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Wolf Logo — Core Identity (preloader, ghost, nav, dividers, watermark, Konami) | ✓ |
| 2 | Hero — Cinematic Rebuild (Three.js, GSAP char-split, slot-machine roles, magnetic buttons) | ✓ |
| 3 | Marquee Strip (dual-row infinite scroll, tech keywords + achievements) | ✓ |
| 4 | Projects — Horizontal Film Strip (GSAP ScrollTrigger, 3D tilt, spotlight, metrics) | ✓ |
| 5 | Skills — 3D Fibonacci Tag Sphere (Three.js CSS3DRenderer, mouse-responsive) | ✓ |
| 6 | Case Studies (before/after slider, dynamic routes, editorial layout, View Transitions) | ✓ |
| 7 | Process/Philosophy (4-step horizontal, IntersectionObserver line draw) | ✓ |
| 8 | GitHub Activity (contribution graph, repo cards, currently building badge) | ✓ |
| 9 | Text Effects (CSS glitch hover, GSAP character-split scroll reveal on all h2s) | ✓ |
| 10 | Cursor Redesign (3 states: default, hover, project, text; disabled on touch) | ✓ |
| 11 | Footer Premium (wolf watermark, magnetic CTA, animated gold border, nav + socials) | ✓ |
| 12 | Light/Dark Mode (CSS custom properties, localStorage, system preference, smooth transition) | ✓ |
| 13 | PWA & SEO (manifest.json, OG image, robots.txt, sitemap.xml, lazy loading) | ✓ |
| 14 | Mobile Experience (no Three.js, vertical projects, 2D skills, 44px tap targets) | ✓ |

### v3.0 — Sadew / Wolf Industries Rebrand

| # | Change | Area | Status |
|---|--------|------|--------|
| 1 | Cinematic 7-stage preloader (GSAP) | `Preloader.tsx` | ✓ |
| 2 | Personal branding: "H. Sadew", "Wolf Industries" everywhere | Data + components | ✓ |
| 3 | About section: new stats, wolf emblem overlay, self-made card | `page.tsx` | ✓ |
| 4 | Skills: 3 new tabs (Frontend Craft, AI, Creative/Design) | `tag-sphere.tsx` | ✓ |
| 5 | Background depth layers on every section | `page.tsx`, components | ✓ |
| 6 | Hero cycling text, marquee updates | `page.tsx`, `marquee-strip.tsx` | ✓ |
| 7 | Services: 6 new services | `portfolio.ts` | ✓ |
| 8 | Remove all Shopify/PHP/backend/degree references | Global cleanup | ✓ |
| 9 | `portfolio.ts` full rewrite | Data | ✓ |
