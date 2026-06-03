export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  processSteps: { title: string; description: string }[];
  testimonial?: { quote: string; author: string; company: string };
  beforeImage: string;
  afterImage: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "luxora-ecommerce",
    title: "Luxora E-Commerce Platform",
    subtitle: "A high-end Shopify store transformation that boosted conversion rates by 40%",
    heroImage: "/projects/luxora.svg",
    challenge:
      "Luxora Fashion, a premium clothing brand, was struggling with an outdated WooCommerce store that had slow load times (4.2s), a 2.3% conversion rate, and frequent cart abandonment. They needed a complete overhaul to match their luxury brand identity and scale for growth.",
    solution:
      "We rebuilt the entire store on Shopify with a custom Liquid theme designed for luxury aesthetics. Key improvements included: optimized product filtering with faceted search, a streamlined one-page checkout, lazy-loaded high-res imagery with blur-up placeholders, server-side rendered collections, and a custom loyalty rewards system integrated with Shopify Flow.",
    result:
      "The new store launched in Q4 2023 and immediately delivered measurable improvements. Page load time dropped from 4.2s to 1.2s. The conversion rate nearly doubled, and monthly recurring revenue increased significantly. The client reported a 300% ROI within the first 6 months.",
    metrics: [
      { label: "Conversion Rate Increase", value: "+40%" },
      { label: "Page Load Time", value: "1.2s" },
      { label: "Revenue Growth", value: "+85%" },
    ],
    processSteps: [
      { title: "Discovery & Audit", description: "Analyzed existing store performance, user behavior, and competitor benchmarks to identify key improvement areas." },
      { title: "UX/UI Design", description: "Designed a luxury visual language with gold accents, smooth transitions, and mobile-first layouts in Figma." },
      { title: "Custom Development", description: "Built a bespoke Shopify theme with Liquid, implemented advanced filtering, and optimized every asset." },
      { title: "Launch & Optimisation", description: "Deployed with staged rollout, monitored Core Web Vitals, and iterated based on real user data." },
    ],
    testimonial: {
      quote: "Working with Alex transformed our online store. Our conversion rate jumped 35% in the first month after the redesign. The attention to detail and performance optimisation was remarkable.",
      author: "Sarah Mitchell",
      company: "CEO, Luxora Fashion",
    },
    beforeImage: "/projects/luxora.svg",
    afterImage: "/projects/luxora.svg",
  },
  {
    slug: "zenspa-booking",
    title: "ZenSpa Booking System",
    subtitle: "A custom appointment platform handling 5K+ monthly bookings with real-time availability",
    heroImage: "/projects/zenspa.svg",
    challenge:
      "ZenSpa Group, a chain of wellness centers, was using a manual booking system causing double-bookings, no-shows, and frustrated staff. They needed a centralized platform with real-time availability, online payments, and Zenoti API integration.",
    solution:
      "We built a React + Laravel booking platform with a custom calendar engine. Features included: real-time slot availability with 15-min granularity, Zenoti API sync for inventory and staff schedules, Stripe payment integration with deposit handling, automated SMS/email reminders, and an admin dashboard with analytics.",
    result:
      "The platform eliminated double-bookings entirely and reduced no-shows by 60%. Staff reported saving 15+ hours per week on scheduling. Customer satisfaction scores improved by 35% within the first quarter.",
    metrics: [
      { label: "Monthly Bookings", value: "5K+" },
      { label: "No-Show Reduction", value: "-60%" },
      { label: "Staff Hours Saved", value: "15h/wk" },
    ],
    processSteps: [
      { title: "Requirements Gathering", description: "Shadowed staff operations and mapped the full booking workflow to understand pain points and edge cases." },
      { title: "System Architecture", description: "Designed a scalable API-first architecture with Laravel backend, React SPA frontend, and real-time WebSocket sync." },
      { title: "Integration Layer", description: "Built robust Zenoti API integration with caching, rate limiting, and fallback mechanisms for offline resilience." },
      { title: "Testing & Deployment", description: "Ran parallel testing with the legacy system for 2 weeks before full cutover, ensuring zero data loss." },
    ],
    testimonial: {
      quote: "Alex delivered a complex booking platform on time and under budget. The codebase is clean, well-documented, and has been rock-solid in production handling thousands of daily users.",
      author: "James Rodrigo",
      company: "CTO, ZenSpa Group",
    },
    beforeImage: "/projects/zenspa.svg",
    afterImage: "/projects/zenspa.svg",
  },
  {
    slug: "designwave-agency",
    title: "Agency Portfolio — DesignWave",
    subtitle: "An immersive agency website with GSAP animations and seamless CMS integration",
    heroImage: "/projects/designwave.svg",
    challenge:
      "DesignWave, a creative agency, needed a portfolio website that reflected their design capability. Their existing site was a generic template with poor performance (Lighthouse score 55), no CMS, and couldn't be updated without developer help.",
    solution:
      "We created a visually immersive Next.js site with GSAP scroll animations, dynamic page transitions, and a headless CMS (Sanity) for easy content management. The site featured custom 3D elements, a dynamic case study filter, and a live metrics dashboard showcasing the agency's impact.",
    result:
      "The new site achieved a Lighthouse score of 94 (up from 55). Organic traffic increased by 120% in 3 months, and the agency reported a 40% increase in qualified lead inquiries through the improved contact flow.",
    metrics: [
      { label: "Lighthouse Score", value: "94" },
      { label: "Traffic Increase", value: "+120%" },
      { label: "Lead Growth", value: "+40%" },
    ],
    processSteps: [
      { title: "Creative Direction", description: "Developed a bold visual identity with motion-first principles, establishing the animation language and component library." },
      { title: "Content Architecture", description: "Designed a Sanity CMS schema that gave the marketing team full control without sacrificing design integrity." },
      { title: "Animation Engineering", description: "Implemented GSAP ScrollTrigger timelines, SplitText character reveals, and custom easing curves for a premium feel." },
      { title: "Performance Tuning", description: "Optimized Core Web Vitals through code splitting, image optimization, and strategic lazy loading of heavy components." },
    ],
    testimonial: {
      quote: "The SEO audit and subsequent improvements exceeded our expectations. Our Lighthouse score went from 55 to 94, and we saw a significant uptick in organic traffic within weeks.",
      author: "Priya Kulasuriya",
      company: "Marketing Director, DesignWave",
    },
    beforeImage: "/projects/designwave.svg",
    afterImage: "/projects/designwave.svg",
  },
];
