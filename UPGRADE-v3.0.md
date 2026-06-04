# v3.0 Upgrade — H. Sadew / Wolf Industries Rebrand

Full upgrade prompt for the Portfolio1.0 site.

---

PART 1 — OPENING ANIMATION (New Feature)

Create a full-screen cinematic preloader component at src/components/Preloader.tsx. It renders before the main site and plays a 7-stage intro animation. Use sessionStorage so it only plays on the first visit per session — subsequent navigations skip straight to the site.

Stage 1 — Wolf draws itself (0s → 1.5s):
The screen is solid #0A0A0A. The wolf SVG (already in the project) is centred at 280px height. All paths have stroke: #D4AF37, strokeWidth: 1.5, fill: none, and use stroke-dasharray / stroke-dashoffset set to the full path length via getTotalLength(). GSAP animates strokeDashoffset from full length to 0 across all paths with a stagger of 0.08s. Outer fur paths draw first, then inner face, then eyes last.

Stage 2 — Eyes pulse gold (1.5s → 2.1s):
The two eye <path> elements (give them id="wolf-eye-left" and id="wolf-eye-right" in the SVG) animate their CSS filter property: drop-shadow(0 0 0px #D4AF37) → drop-shadow(0 0 14px #D4AF37) → drop-shadow(0 0 0px #D4AF37). GSAP tween with ease: power2.inOut, duration 0.6s. Fill the eye paths with #D4AF37 during this stage.

Stage 3 — "WOLF INDUSTRIES" appears (2.1s → 2.8s):
Below the wolf, the text "WOLF INDUSTRIES" in Playfair Display, 1.1rem, #D4AF37, letter-spacing: 0.2em, uppercase. Animates in with: opacity: 0 → 1 and letter-spacing: 0.05em → 0.4em simultaneously using GSAP, duration 0.7s, ease power3.out.

Stage 4 — Wolf shrinks, "Hi, my name is" appears (2.8s → 3.4s):
GSAP simultaneously:
- Wolf SVG scales from 1 to 0 and fades out (opacity → 0), duration 0.5s, ease power2.in
- "WOLF INDUSTRIES" text also fades out simultaneously
- After a 0.1s delay: the text "Hi, my name is" in Inter, 1rem, #A0A0A0, letter-spacing 0.15em, uppercase, fades in from y: 16px to y: 0, opacity 0 → 1, duration 0.5s

Stage 5 — "H. Sadew" letter-by-letter (3.4s → 4.2s):
Split the string "H. Sadew" into individual <span> elements, one per character (including the period and space — space is a non-breaking space \u00A0). Each character: Playfair Display, clamp(3rem, 8vw, 6.5rem), gold gradient text (background: linear-gradient(135deg, #D4AF37, #F5D060); -webkit-background-clip: text; -webkit-text-fill-color: transparent). GSAP stagger: each char animates from y: 60px, opacity: 0, rotateX: -40deg to y: 0, opacity: 1, rotateX: 0deg with stagger: 0.06s, duration: 0.5s, ease: power4.out. Wrap the chars in a container with perspective: 600px and overflow: hidden per-character for a clean reveal.

Stage 6 — Three skill pills appear (4.2s → 4.8s):
Below the name, three pill elements appear in sequence (stagger 0.18s each):
- ⚡ Fast Worker
- 🧠 Fast Learner
- 🤖 AI-Fluent

Each pill: border: 1px solid rgba(212,175,55,0.5), background: rgba(212,175,55,0.08), color: #D4AF37, border-radius: 9999px, padding: 6px 18px, font-size: 0.8rem, letter-spacing: 0.1em. Each animates from y: 20px, opacity: 0 to y: 0, opacity: 1, duration 0.4s.

Stage 7 — Gold scanner wipe, site reveals (4.8s → 5.6s):
A 2px horizontal gold line (background: #D4AF37, box-shadow: 0 0 12px #D4AF37) sweeps upward across the full screen from top: 100% to top: -2px over 0.6s using GSAP, ease power2.inOut. As it passes each preloader element, those elements fade out (opacity → 0 triggered by scroll position of the line). Then the entire preloader <div> animates y: 0 → -100vh over 0.5s with ease power3.in, revealing the main site underneath which has opacity: 0 and sets to opacity: 1 simultaneously.

The preloader component must be placed in the root layout wrapping the main content, using a useState to track isLoading and conditionally render it above the site.

---

PART 2 — PERSONAL BRANDING UPDATES

Name & Identity
Replace every instance of "Alex Morgan" or [YOUR NAME] with "H. Sadew" throughout the entire codebase including src/data/portfolio.ts, all components, meta tags, OG image config, and footer.

Wolf Industries — Add in these exact locations:
- Navbar: Below the wolf logo mark and the name "H. Sadew", add a subtitle line in 11px, letter-spacing: 0.2em, color: #D4AF37, opacity: 0.7, uppercase: "WOLF INDUSTRIES".
- Hero section eyebrow badge: Change the text from "AVAILABLE FOR WORK" to "WOLF INDUSTRIES · AVAILABLE FOR PROJECTS". Keep the pulsing green dot.
- Hero tagline: Change to: "Creative Director of Wolf Industries. I build fast, intelligent, and visually stunning web experiences."
- About section bio: The bio should read (update the placeholder bio copy): "I'm H. Sadew — a self-taught web developer and Creative Director of Wolf Industries. I specialise in building interactive, high-performance websites and AI-integrated digital experiences. Everything I know, I learned through real projects, relentless experimentation, and a genuine love for the craft. I work fast, learn faster, and I'm deeply fluent in the latest AI tools — using them not as a crutch, but as a force multiplier."
- Services section intro line: Add a subtitle line below the section eyebrow: "Delivered under the Wolf Industries banner — built with precision, speed, and intelligence."
- Footer copyright line: Change to: "© 2025 Wolf Industries · H. Sadew. All rights reserved."

---

PART 3 — ABOUT SECTION CHANGES

Remove the "100K+ Monthly Users Served" stat
Delete this stat counter entirely. Replace it with: "15+" as the number, label "AI Tools Mastered", same counter animation style as the other stats.

Updated stats row (3 stats only):
- 5+ — Years Experience
- 50+ — Projects Delivered
- 15+ — AI Tools Mastered

Wolf logo on the portrait photo
The about section has a portrait image placeholder on the left. Add the wolf SVG as an overlay on top of this image. Implementation:
- Wrap the image in a position: relative container
- Add the wolf SVG as an absolutely positioned child: position: absolute; bottom: -20px; right: -20px; width: 140px; height: 140px; opacity: 0.92; filter: drop-shadow(0 0 20px rgba(212,175,55,0.6))
- Give the SVG paths fill: #D4AF37 — it becomes a gold wolf emblem stamp overlapping the corner of the portrait
- Add a subtle circular glow behind the wolf SVG: a div with border-radius: 50%, background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%), width: 160px, height: 160px, positioned at the same corner

"Wolf Industries" label in about section
Below the name heading "H. Sadew" in the about section right column, add a label line:
"Creative Director · Wolf Industries" in 13px, Inter, letter-spacing: 0.15em, uppercase, color: #D4AF37.

Key facts list — replace with:
- "Self-Taught · Built Through Experience"
- "Based in Colombo, Sri Lanka"
- "Fast Worker · Fast Learner · AI-Fluent"
- "Open to Remote & On-Site Roles"
- "Founder of Wolf Industries"

Remove the degree from the bio/facts
There must be no mention of a university degree, BSc, or formal education anywhere on the site. Replace the Education sub-section in the timeline (if present) with:
A styled card with border-left: 3px solid #D4AF37, background: rgba(212,175,55,0.04), border-radius: 8px, padding: 20px 24px:
- Title: "Self-Made Developer" in Playfair Display, gold
- Subtitle: "No classroom. All craft."
- Body: "Every skill I have was forged through real projects, late nights, trial, error, and an obsession with getting better. Experience is my degree."

---

PART 4 — SKILLS SECTION COMPLETE REBUILD

Remove these categories entirely:
- Backend (PHP, Python, Node.js, MySQL, PostgreSQL, GraphQL, REST APIs tab)
- CMS & eCommerce (Shopify, Liquid, WordPress, WooCommerce — entire tab and all references)
- Dev Tools (Git, Docker, Jira — entire tab)

Replace with 3 new categories:

Tab 1 — Frontend Craft:
| Skill | Proficiency |
|-------|------------|
| HTML5 | 95% |
| CSS3 / Sass / Animations | 95% |
| JavaScript (ES6+) | 92% |
| TypeScript | 80% |
| React | 88% |
| Next.js | 82% |
| Tailwind CSS | 90% |
| Responsive Web Design | 95% |
| Interactive Website Building | 92% |
| Web UI Development | 90% |
| SVG & Canvas Animation | 85% |
| Three.js / WebGL | 70% |

Tab 2 — AI & Intelligent Tools:
| Skill | Proficiency |
|-------|------------|
| AI Integration into Websites | 90% |
| Prompt Engineering | 88% |
| Claude / GPT API Usage | 85% |
| AI-Assisted Development | 92% |
| Building AI-Powered UIs | 82% |
| Workflow Automation with AI | 80% |
| AI Image & Asset Generation | 78% |

Tab 3 — Creative & Design:
| Skill | Proficiency |
|-------|------------|
| UI / UX Design | 85% |
| Figma | 80% |
| Web Motion Design | 82% |
| Brand Identity Design | 75% |
| Logo & Visual Design | 72% |
| Colour Theory & Typography | 80% |

Skill section heading update:
Change the section eyebrow from "CORE TECHNICAL SKILLS" to "EXPERTISE". Change the h2 to: "Built Fast. Learned Faster."

Add a "Core Strengths" bar below the tabs:
A horizontal flex row of 5 pill-shaped badges, always visible regardless of active tab:
⚡ Fast Worker · 🧠 Fast Learner · 🤖 AI-Fluent · 🎨 Detail-Obsessed · 🐺 Wolf Industries
Style: border: 1px solid rgba(212,175,55,0.4), background: rgba(212,175,55,0.06), color: #D4AF37, border-radius: 9999px, padding: 8px 20px, font-size: 0.8rem.

---

PART 5 — BACKGROUND DEPTH LAYERS

Every section below the hero currently feels visually empty. Add ambient background decoration to each. All decorations must be pointer-events: none, position: absolute, z-index: 0, and the section must have position: relative; overflow: hidden. Content stays at z-index: 1.

About Section:
- CSS dot-grid background: background-image: radial-gradient(circle, rgba(212,175,55,0.07) 1px, transparent 1px); background-size: 32px 32px. Apply to the section ::before pseudo-element.
- Wolf SVG watermark: position: absolute; bottom: -40px; right: -60px; width: 320px; opacity: 0.04; filter: grayscale(1) sepia(1) hue-rotate(5deg) saturate(3). Slow breathing animation scale 1 → 1.03, 6s ease-in-out infinite.

Skills Section:
- Diagonal stripe pattern on the ::before: background: repeating-linear-gradient(45deg, transparent, transparent 38px, rgba(212,175,55,0.03) 38px, rgba(212,175,55,0.03) 40px). Full section width and height.
- Large faded text "EXPERTISE" behind the heading: position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: clamp(80px, 15vw, 160px); font-family: 'Playfair Display'; color: rgba(212,175,55,0.03); white-space: nowrap; pointer-events: none; user-select: none.

Projects Section:
- "WI" Wolf Industries monogram: position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: clamp(200px, 35vw, 400px); font-family: 'Playfair Display'; color: rgba(212,175,55,0.025); pointer-events: none; user-select: none; line-height: 1.
- Four corner bracket decorations (SVG): place <svg> elements at each corner of the section, each showing an L-shaped bracket in gold at 8% opacity, size 60px.

Timeline / Experience Section:
- Circuit board side decoration: on both left and right edges of the section, place a vertical SVG pattern of thin gold lines connecting small square nodes (like a PCB trace). Width 60px each side, full section height, gold at 5% opacity.
- Centre wolf watermark: position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 260px; opacity: 0.03.

Services Section:
- SVG hexagonal grid tile as background-image: create a small SVG hexagon (60px wide) as a data URI and tile it: background-image: url("data:image/svg+xml,..."). Gold 1px strokes, opacity: 0.04.
- Large faded "SERVICES" watermark text behind heading, same style as the skills section.

Testimonials Section:
- Radial gold spotlight from top-centre: background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 70%) on the section ::before.
- Oversized quote mark " in Playfair Display, 500px font-size, rgba(212,175,55,0.025), position: absolute; top: -100px; left: -20px.

Contact Section:
- Full wolf watermark: position: absolute; top: 50%; right: -80px; transform: translateY(-50%); width: 400px; opacity: 0.04. Slow continuous rotation: animation: slowSpin 120s linear infinite.
- Dark radial vignette glow from bottom: background: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 60%).

Global — add these CSS animations:
```css
@keyframes slowSpin {
  from { transform: translateY(-50%) rotate(0deg); }
  to { transform: translateY(-50%) rotate(360deg); }
}
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}
```

---

PART 6 — HERO & CYCLING TEXT UPDATES

Hero cycling subtitle — replace the roles with:
1. "Interactive Web Builder"
2. "AI-Integrated Developer"
3. "Wolf Industries Creative Director"
4. "Fast. Precise. Intelligent."

Hero stats / marquee strip (if implemented from V2):
Update the marquee text to include:
HTML5 · CSS3 · JavaScript · React · Next.js · AI Integration · Prompt Engineering · Wolf Industries · Web Animation · Three.js · UI/UX Design ·

And the achievement strip:
5 Years Experience · 50+ Projects · Fast Worker · AI-Fluent · Self-Taught · Wolf Industries · Detail-Obsessed ·

---

PART 7 — SERVICES SECTION UPDATE

Replace the existing 6 services with these (keep the same card component, just update the data):

1. Interactive Website Building — Custom-built interactive websites with rich animations, motion design, and engaging user experiences from scratch.
2. Web UI Development — Pixel-perfect, responsive user interfaces built with modern frameworks. Every detail crafted with precision.
3. AI Integration — Embedding AI tools, APIs, and intelligent features directly into websites and web applications.
4. Motion & Animation Design — Cinematic page transitions, scroll-triggered animations, and micro-interactions that make sites unforgettable.
5. Brand Identity for Web — Visual language, colour systems, and design systems — including the full Wolf Industries-style treatment.
6. Performance Optimisation — Lighthouse audits, load-time reduction, Core Web Vitals improvement, and code refactoring for speed.

In src/data/portfolio.ts, update the services array to match the above.

---

PART 8 — REMOVE ALL SHOPIFY & BACKEND REFERENCES

Do a global search across the entire codebase for the following terms and remove or replace every occurrence:

Terms to remove completely:
Shopify, Liquid, WooCommerce, WordPress (as a skill — can stay in projects if relevant), PHP, Python (as a skill), Node.js, MySQL, PostgreSQL, GraphQL, REST APIs (as a skill tab), Docker, Jira, eCommerce (as a section/tab label), CMS, Zenoti, BSc, University, Computer Science, degree, bachelor

Specific files to check: src/data/portfolio.ts, src/data/projects.ts (if exists), src/components/Skills.tsx (or equivalent), src/components/About.tsx, any Timeline/Experience component.

After removal, audit all portfolio.ts data arrays to ensure no removed skills remain.

---

PART 9 — DATA FILE UPDATES (src/data/portfolio.ts)

Update the entire portfolio config file to reflect the following:

```typescript
export const personalInfo = {
  name: "H. Sadew",
  title: "Web Developer & Creative Director",
  company: "Wolf Industries",
  tagline: "Creative Director of Wolf Industries. I build fast, intelligent, and visually stunning web experiences.",
  email: "[YOUR EMAIL]",
  phone: "[YOUR PHONE]",
  location: "Colombo, Sri Lanka",
  github: "[YOUR GITHUB]",
  linkedin: "[YOUR LINKEDIN]",
  availability: true,
  traits: ["Fast Worker", "Fast Learner", "AI-Fluent"],
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "AI Tools Mastered" }
  ],
  bio: "I'm H. Sadew — a self-taught web developer and Creative Director of Wolf Industries. I specialise in building interactive, high-performance websites and AI-integrated digital experiences. Everything I know, I learned through real projects, relentless experimentation, and a genuine love for the craft. I work fast, learn faster, and I'm deeply fluent in the latest AI tools — using them not as a crutch, but as a force multiplier.",
  education: {
    type: "self-taught",
    title: "Self-Made Developer",
    subtitle: "No classroom. All craft.",
    description: "Every skill I have was forged through real projects, late nights, trial, error, and an obsession with getting better. Experience is my degree."
  },
  heroRoles: [
    "Interactive Web Builder",
    "AI-Integrated Developer",
    "Wolf Industries Creative Director",
    "Fast. Precise. Intelligent."
  ]
}
```

---

PART 10 — FINAL CHECKLIST

When the upgrade is complete, verify the following:

- [ ] Preloader plays on first visit, skipped on refresh (sessionStorage gate)
- [ ] All 7 stages of the preloader animation fire in sequence
- [ ] "H. Sadew" letter-drop with skill pills shows correctly
- [ ] Wolf logo appears as gold emblem on the about portrait
- [ ] "Wolf Industries" label present in navbar, hero badge, about section, services, and footer
- [ ] Stats row shows: 5+ Years · 50+ Projects · 15+ AI Tools (no "100K users")
- [ ] Skills section has exactly 3 tabs: Frontend Craft, AI & Intelligent Tools, Creative & Design
- [ ] No mention of Shopify, PHP, Python, MySQL, Node, WordPress (as skills), degree, or university anywhere
- [ ] Education section replaced with "Self-Made Developer" card
- [ ] Hero cycling text shows the 4 updated roles
- [ ] All 6 sections below the hero have background depth decoration
- [ ] Services updated to the 6 new ones listed above
- [ ] portfolio.ts reflects all updated data
- [ ] All [YOUR X] placeholders clearly marked for easy replacement
