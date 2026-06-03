"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/section-wrapper";
import GlitchHeading from "@/components/glitch-heading";
import { caseStudies } from "@/data/caseStudies";

function BeforeAfterSlider({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => handleMove(e.touches[0].clientX),
    [handleMove]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden select-none cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <Image
        src={after}
        alt={`${title} — After`}
        fill
        className="object-cover"
        unoptimized
        loading="lazy"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={before}
          alt={`${title} — Before`}
          fill
          className="object-cover grayscale"
          unoptimized
          loading="lazy"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gold-primary z-10 pointer-events-none"
        style={{ left: `${position}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-gold-primary border-2 border-black flex items-center justify-center pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8L22 12L18 16" />
          <path d="M6 8L2 12L6 16" />
        </svg>
      </div>
      <span className="absolute top-2 left-2 bg-black/70 text-[10px] uppercase tracking-[0.1em] text-gold-primary px-2 py-0.5 rounded font-body z-20">
        BEFORE
      </span>
      <span className="absolute top-2 right-2 bg-black/70 text-[10px] uppercase tracking-[0.1em] text-gold-primary px-2 py-0.5 rounded font-body z-20">
        AFTER
      </span>
    </div>
  );
}

export default function CaseStudiesSection() {
  const studies = caseStudies;

  return (
    <SectionWrapper id="case-studies" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
            CASE STUDIES
          </span>
          <GlitchHeading
            text="Real Projects, Real Results"
            className="font-heading text-4xl gold-gradient-text mt-2"
          />
          <p className="font-body text-text-muted mt-4 max-w-xl mx-auto">
            Detailed breakdowns of how I tackled complex challenges and delivered measurable outcomes for my clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {studies.map((study) => (
            <div
              key={study.slug}
              className="bg-bg-elevated border border-border-subtle rounded-xl overflow-hidden hover:border-gold-primary/60 transition-all duration-300 group"
            >
              <BeforeAfterSlider
                before={study.beforeImage}
                after={study.afterImage}
                title={study.title}
              />

              <div className="p-6">
                <h3 className="font-heading text-xl gold-gradient-text mb-2">
                  {study.title}
                </h3>
                <p className="font-body text-sm text-text-muted mb-4 line-clamp-2">
                  {study.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {study.metrics.map((m) => (
                    <span
                      key={m.label}
                      className="text-[10px] uppercase tracking-[0.1em] bg-gold-primary/10 text-gold-primary px-2.5 py-1 rounded-full border border-gold-primary/20 font-body"
                    >
                      {m.value} {m.label}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/case-study/${study.slug}`}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-gold-primary hover:text-gold-light transition-colors group/link"
                >
                  Read Case Study
                  <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
