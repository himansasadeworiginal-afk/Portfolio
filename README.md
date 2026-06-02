# Portfolio — K. Himansa Sadew Aloka

Personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, and GSAP.

## Tech Stack

- **Next.js 16** (App Router, Turbopack, static export)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — scroll animations, carousel, mobile menu
- **GSAP** — timeline gold line draw effect
- **Lucide React** — icons
- **Formspree** — contact form backend

## Sections

Hero, About, Skills, Projects, Experience, Services, Testimonials, Contact

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

All content is managed in a single file: `src/data/portfolio.ts`
