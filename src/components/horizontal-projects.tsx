"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import GlitchHeading from "@/components/glitch-heading";
import { portfolio } from "@/data/portfolio";
import BrowserFrame from "@/components/browser-frame";
import { useCountUp } from "@/hooks/use-count-up";

function MetricCounter({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <span className="font-heading text-lg gold-gradient-text">{count}</span>
      <span className="font-body text-[10px] text-text-subtle uppercase tracking-[0.1em] ml-1">{label}</span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
  isFeatured,
  isMobile,
}: {
  project: typeof portfolio.projects[number];
  index: number;
  total: number;
  isFeatured: boolean;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;
    card.style.transform = `perspective(1000px) rotateY(${dx * 6}deg) rotateX(${dy * -3}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    setSpotlight({ x: 50, y: 50 });
  }, []);

  const projectNum = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`flex-shrink-0 ${isMobile ? "w-full mb-8" : "w-[75vw]"} ${isMobile ? "" : "h-[80vh]"} ${isMobile ? "" : "px-3"}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full h-full bg-bg-elevated border ${isFeatured ? "border-l-[3px] border-l-gold-primary" : "border-border-subtle"} rounded-xl overflow-hidden transition-transform duration-200 ease-out`}
        style={{
          transformStyle: "preserve-3d",
          background: `radial-gradient(circle 200px at ${spotlight.x}% ${spotlight.y}%, rgba(212,175,55,0.08), transparent)`,
        }}
      >
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} h-full`}>
          {/* Left: Browser Frame with Screenshot */}
          <div className={`${isMobile ? "w-full" : "w-[55%]"} ${isMobile ? "h-56" : "h-full"} p-4 flex flex-col justify-center`}>
            <BrowserFrame label={project.title}>
              <div className="relative overflow-hidden group">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={338}
                  className="w-full h-48 object-cover transition-all duration-400 group-hover:scale-105 group-hover:grayscale-0 grayscale-[80%]"
                  unoptimized
                  loading="lazy"
                />
              </div>
            </BrowserFrame>
            {isFeatured && (
              <div className="flex gap-6 mt-3 px-2">
                <MetricCounter value={96} label="Lighthouse" />
                <MetricCounter value={1.2} label="s Load" />
                <MetricCounter value={40} label="K Users" />
              </div>
            )}
          </div>

          {/* Right: Project Details */}
          <div className={`${isMobile ? "w-full p-5" : "w-[45%] p-10"} flex flex-col justify-center`}>
            <span className="font-heading text-[8rem] gold-gradient-text opacity-15 leading-none mb-[-2rem] select-none">
              {projectNum}
            </span>
            <h3 className="font-heading text-3xl gold-gradient-text mb-3 relative z-10">
              {project.title}
            </h3>
            <p className="font-body text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.1em] bg-gold-primary/10 text-gold-primary px-3 py-1 rounded-full border border-gold-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={project.liveUrl}
                className="inline-flex items-center gap-2 bg-gold-primary text-black font-body text-sm font-semibold px-5 py-2 rounded-full hover:bg-gold-light transition-colors"
              >
                Live Site <ExternalLink size={14} />
              </a>
              <a
                href={project.codeUrl}
                className="inline-flex items-center gap-2 border border-gold-primary text-gold-primary font-body text-sm font-semibold px-5 py-2 rounded-full hover:bg-gold-primary hover:text-black transition-all"
              >
                View Code <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [hintHidden, setHintHidden] = useState(false);
  const [touchIndex, setTouchIndex] = useState(0);
  const touchStartX = useRef(0);
  const isSwiping = useRef(false);

  const projects = portfolio.projects;
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const allProjects = featured ? [featured, ...others] : others;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Desktop: GSAP ScrollTrigger horizontal scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;

    import("gsap").then((gsapModule) => {
      import("gsap/ScrollTrigger").then((stModule) => {
        gsap = gsapModule.default;
        ScrollTrigger = stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const rail = railRef.current;
        const progress = progressRef.current;
        if (!section || !rail) return;

        const totalWidth = rail.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxScroll = -(totalWidth - viewportWidth);

        ctx = gsap.context(() => {
          gsap.to(rail, {
            x: maxScroll,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: "top top",
              end: () => `+=${totalWidth - viewportWidth}`,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self: any) => {
                const p = self.progress;
                if (progress) {
                  progress.style.transform = `scaleX(${p})`;
                }
              },
            },
          });
        });

        ScrollTrigger.refresh();
      });
    });

    return () => {
      ctx?.revert();
      ScrollTrigger?.refresh();
    };
  }, []);

  // Mobile: touch/swipe gesture
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 10) isSwiping.current = true;
    if (Math.abs(delta) > 40 && isSwiping.current) {
      if (delta < 0 && touchIndex < allProjects.length - 1) {
        setTouchIndex((prev) => Math.min(prev + 1, allProjects.length - 1));
        touchStartX.current = e.touches[0].clientX;
        isSwiping.current = false;
      } else if (delta > 0 && touchIndex > 0) {
        setTouchIndex((prev) => Math.max(prev - 1, 0));
        touchStartX.current = e.touches[0].clientX;
        isSwiping.current = false;
      }
    }
  }, [touchIndex, allProjects.length]);

  const handleTouchEnd = useCallback(() => {
    isSwiping.current = false;
  }, []);

  // Fade hint on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!hintHidden) setHintHidden(true);
    };
    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [hintHidden]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-bg-surface"
      ref={sectionRef}
    >
      {/* WI Monogram Watermark */}
      <div
        className="absolute pointer-events-none z-0 select-none leading-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "clamp(200px, 35vw, 400px)",
          fontFamily: "var(--font-playfair), serif",
          color: "rgba(212,175,55,0.025)",
          lineHeight: 1,
        }}
      >
        WI
      </div>

      {/* Corner Brackets */}
      <svg className="absolute top-0 left-0 pointer-events-none z-0" width="60" height="60" viewBox="0 0 60 60">
        <path d="M0 0 L60 0 L60 8 L8 8 L8 60 L0 60 Z" fill="rgba(212,175,55,0.08)" />
      </svg>
      <svg className="absolute top-0 right-0 pointer-events-none z-0" width="60" height="60" viewBox="0 0 60 60">
        <path d="M60 0 L0 0 L0 8 L52 8 L52 60 L60 60 Z" fill="rgba(212,175,55,0.08)" />
      </svg>
      <svg className="absolute bottom-0 left-0 pointer-events-none z-0" width="60" height="60" viewBox="0 0 60 60">
        <path d="M0 60 L60 60 L60 52 L8 52 L8 0 L0 0 Z" fill="rgba(212,175,55,0.08)" />
      </svg>
      <svg className="absolute bottom-0 right-0 pointer-events-none z-0" width="60" height="60" viewBox="0 0 60 60">
        <path d="M60 60 L0 60 L0 52 L52 52 L52 0 L60 0 Z" fill="rgba(212,175,55,0.08)" />
      </svg>

      {/* Eyebrow + Heading */}
      <div className="pt-16 pb-8 px-6 text-center">
        <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
          FEATURED WORK
        </span>
        <GlitchHeading
          text="Projects That Speak Louder Than Words"
          className="font-heading text-4xl gold-gradient-text mt-2"
        />
      </div>

      {/* Scroll Progress Bar */}
      <div className="h-[2px] bg-border-subtle mx-6 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gold-primary origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Drag Hint */}
      <div
        ref={hintRef}
        className={`flex items-center justify-center gap-2 py-2 transition-opacity duration-500 ${hintHidden ? "opacity-0" : "opacity-100"}`}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-text-subtle">
          Drag to explore
        </span>
        <ChevronRight size={12} className="text-gold-primary" />
      </div>

      {/* Projects Rail */}
      <div
        ref={railRef}
        className={`flex ${isMobile ? "flex-col" : ""} gap-0 px-6 pb-16`}
        style={{ touchAction: "pan-y" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {(isMobile ? allProjects.filter((_, i) => i === touchIndex) : allProjects).map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={isMobile ? touchIndex : i}
            total={allProjects.length}
            isFeatured={i === 0 && !!featured}
            isMobile={isMobile}
          />
        ))}
      </div>
      {isMobile && (
        <div className="flex justify-center gap-2 pb-6">
          {allProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setTouchIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === touchIndex ? "bg-gold-primary w-6" : "bg-border-subtle"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
