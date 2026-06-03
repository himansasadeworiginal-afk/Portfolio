# Portfolio — K. Himansa Sadew Aloka

**Live:** [himansasadeworiginal-afk.github.io/Portfolio](https://himansasadeworiginal-afk.github.io/Portfolio/)

Personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS v4, Three.js, Framer Motion, and GSAP.

## Tech Stack

- **Next.js 16** (App Router, Turbopack, static export)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — 3D hero, tag sphere
- **Framer Motion** — scroll animations, carousel, mobile menu, role text
- **GSAP** (ScrollTrigger) — horizontal projects film strip, timeline line draw, text effects
- **Lucide React** — icons

## Sections

Hero (cinematic Three.js), Marquee Strip, About, Skills (3D Fibonacci tag sphere), Projects (horizontal GSAP film strip), Case Studies (before/after sliders), Experience (GSAP timeline), GitHub Activity, Services, Process/Philosophy, Testimonials, Contact, Footer (premium)

## Features

- **Wolf Logo Identity** — Animated SVG preloader, ghost wolf hero background, nav logo with eye glow, section dividers, contact watermark, Konami Code easter egg (synthesized howl + particle burst)
- **Light/Dark Mode** — Theme toggle with CSS custom properties, localStorage persistence, system preference fallback
- **Custom Cursor** — 3-state dynamic cursor (dot+ring, hover label, project view, text I-beam), disabled on touch
- **Glitch Text Effects** — CSS glitch hover + GSAP character-split scroll reveal on all section headings
- **3D Interactive** — Three.js particle field + floating shards (hero), Fibonacci sphere skill tags (skills)
- **PWA & SEO** — `manifest.json`, `robots.txt`, `sitemap.xml`, custom OG image, `next/font`, lazy-loaded Three.js
- **Mobile Optimized** — No Three.js on mobile, vertical project stack, 2D skill grid, faster preloader, 44px tap targets
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
├── components/     — UI components
├── data/           — Content data files
├── hooks/          — Custom React hooks
└── lib/            — Utilities
```

## Upgrade Phases (v1.0 → v2.0)

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
