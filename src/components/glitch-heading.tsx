"use client";

import { useEffect, useRef } from "react";

interface GlitchHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export default function GlitchHeading({
  text,
  className = "",
  as: Tag = "h2",
}: GlitchHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const chars = container.querySelectorAll<HTMLSpanElement>(".glitch-char");
    if (chars.length === 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      chars.forEach((c) => (c.style.opacity = "1"));
      return;
    }

    // Use IntersectionObserver for scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("gsap").then(({ default: gsap }) => {
              gsap.to(chars, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.03,
                ease: "power3.out",
              });
            });
            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={containerRef}
      className={`glitch-text ${className}`}
      data-text={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="glitch-char inline-block"
          style={{
            opacity: 0,
            transform: "translateY(110%)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
