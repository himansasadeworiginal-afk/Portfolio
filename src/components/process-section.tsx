"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/data/process";
import GlitchHeading from "@/components/glitch-heading";

function ProcessStepCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  return (
    <div className="flex flex-col items-center text-center relative z-10 px-4">
      <span className="font-heading text-[5rem] gold-gradient-text opacity-15 leading-none select-none">
        {step.number}
      </span>
      <h3 className="font-heading text-xl gold-gradient-text mt-2 mb-3">
        {step.title}
      </h3>
      <p className="font-body text-sm text-text-muted leading-relaxed max-w-xs">
        {step.description}
      </p>
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.style.width = "100%";
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(line);

    // Reset on scroll back up
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        line.style.width = "0%";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="process" className="py-24 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
            MY APPROACH
          </span>
          <GlitchHeading
            text="How I Work"
            className="font-heading text-4xl gold-gradient-text mt-2"
          />
          <p className="font-body text-text-muted mt-4 max-w-xl mx-auto">
            A proven 4-step process that takes your project from concept to launch with clarity and precision.
          </p>
        </div>

        <div ref={sectionRef} className="relative">
          {/* Connecting line */}
          <div className="absolute top-[88px] left-[10%] right-[10%] h-[2px] bg-border-subtle hidden md:block" />
          <div
            ref={lineRef}
            className="absolute top-[88px] left-[10%] h-[2px] bg-gold-primary hidden md:block transition-all duration-[1500ms] ease-out"
            style={{ width: "0%" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative">
            {processSteps.map((step, i) => (
              <ProcessStepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
