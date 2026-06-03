"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BarChart3, Clock, TrendingUp } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { portfolio } from "@/data/portfolio";

const metricIcons = [TrendingUp, BarChart3, Clock];

export default function CaseStudyClient({
  slugPromise,
}: {
  slugPromise: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const backRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    slugPromise.then((p) => setSlug(p.slug));
  }, [slugPromise]);

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <h1 className="font-heading text-4xl gold-gradient-text mb-4">Case Study Not Found</h1>
          <p className="font-body text-text-muted mb-6">The case study you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/#case-studies" className="inline-flex items-center gap-2 text-gold-primary hover:text-gold-light font-body text-sm">
            <ArrowLeft size={16} /> Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.href = "/#case-studies";
      });
    } else {
      window.location.href = "/#case-studies";
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Link
        ref={backRef}
        href="/#case-studies"
        onClick={handleBackClick}
        className="fixed top-20 left-6 z-40 flex items-center gap-2 bg-bg-elevated/80 backdrop-blur-sm border border-border-subtle rounded-full px-4 py-2 text-text-muted hover:text-gold-primary hover:border-gold-primary/60 transition-all duration-300 font-body text-sm"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <section className="relative h-[50vh] md:h-[60vh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent z-10" />
        <Image
          src={study.heroImage}
          alt={study.title}
          fill
          className="object-cover object-top"
          unoptimized
          loading="lazy"
        />
        <div className="relative z-20 max-w-5xl mx-auto px-6 pb-12 md:pb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
            CASE STUDY
          </span>
          <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] gold-gradient-text mt-2 leading-tight">
            {study.title}
          </h1>
          <p className="font-body text-text-muted mt-3 max-w-2xl text-lg">
            {study.subtitle}
          </p>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {study.metrics.map((metric, i) => {
              const Icon = metricIcons[i] || TrendingUp;
              return (
                <div key={metric.label} className="text-center border-r border-border-subtle last:border-r-0">
                  <Icon size={20} className="mx-auto text-gold-primary mb-2" />
                  <p className="font-heading text-2xl md:text-3xl gold-gradient-text">
                    {metric.value}
                  </p>
                  <p className="font-body text-xs text-text-muted uppercase tracking-[0.1em] mt-1">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                The Challenge
              </span>
              <h2 className="font-heading text-2xl gold-gradient-text mt-2 mb-4">
                The Challenge
              </h2>
              <p className="font-body text-text-muted leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div>
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                The Solution
              </span>
              <h2 className="font-heading text-2xl gold-gradient-text mt-2 mb-4">
                The Solution
              </h2>
              <p className="font-body text-text-muted leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          <div className="bg-bg-elevated border border-border-subtle rounded-xl p-8 mb-16">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
              The Result
            </span>
            <h2 className="font-heading text-2xl gold-gradient-text mt-2 mb-4">
              The Result
            </h2>
            <p className="font-body text-text-muted leading-relaxed">
              {study.result}
            </p>
          </div>

          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                The Process
              </span>
              <h2 className="font-heading text-3xl gold-gradient-text mt-2">
                How We Got There
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {study.processSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="bg-bg-elevated border border-border-subtle rounded-lg p-6 hover:border-gold-primary/60 transition-all duration-300"
                >
                  <span className="font-heading text-5xl gold-gradient-text opacity-20 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg gold-gradient-text mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {study.testimonial && (
            <div className="border border-gold-primary/30 rounded-xl p-8 md:p-12 text-center mb-16 bg-gradient-to-b from-gold-primary/5 to-transparent">
              <svg className="w-8 h-8 text-gold-primary/40 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="font-heading text-xl md:text-2xl text-text-primary leading-relaxed mb-6">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-body text-sm gold-gradient-text font-semibold">
                  {study.testimonial.author}
                </p>
                <p className="font-body text-xs text-text-muted">
                  {study.testimonial.company}
                </p>
              </div>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-gold-primary text-black font-body text-sm font-semibold px-8 py-3 rounded-full hover:bg-gold-light transition-all duration-300"
            >
              Start a Similar Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-bg-primary py-12 border-t border-gold-primary/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-heading text-2xl gold-gradient-text">
            {portfolio.personal.initials}
          </span>
          <p className="font-body text-xs text-text-subtle mt-4">
            &copy; {new Date().getFullYear()} {portfolio.personal.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
