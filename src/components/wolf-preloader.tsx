"use client";

import { useEffect, useRef, useState } from "react";

export default function WolfPreloader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"draw" | "shimmer" | "exit">("draw");
  const preloaderRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<SVGElement | null>(null);

  useEffect(() => {
    const shown = sessionStorage.getItem("wolf-preloader-shown");
    if (shown) {
      setVisible(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const drawDuration = isMobile ? 1200 : 1800;

    const paths = document.querySelectorAll("#wolf-preloader-svg path, #wolf-preloader-svg ellipse, #wolf-preloader-svg circle");
    let totalLength = 0;
    paths.forEach((p) => {
      const len = (p as SVGPathElement).getTotalLength?.() || 200;
      (p as SVGPathElement).style.strokeDasharray = `${len}`;
      (p as SVGPathElement).style.strokeDashoffset = `${len}`;
      totalLength = Math.max(totalLength, len);
    });

    const start = performance.now();

    function draw(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / drawDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      paths.forEach((p) => {
        const len = (p as SVGPathElement).getTotalLength?.() || 200;
        (p as SVGPathElement).style.strokeDashoffset = `${len * (1 - eased)}`;
      });

      if (progress < 1) {
        requestAnimationFrame(draw);
      } else {
        setPhase("shimmer");
        setTimeout(() => setPhase("exit"), 600);
      }
    }

    requestAnimationFrame(draw);

    return () => {
      sessionStorage.setItem("wolf-preloader-shown", "true");
    };
  }, []);

  useEffect(() => {
    if (phase === "exit" && preloaderRef.current) {
      const el = preloaderRef.current;
      el.style.transform = "translateY(0)";
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.7s cubic-bezier(0.77, 0, 0.18, 1), opacity 0.5s ease";
        el.style.transform = "translateY(-100%)";
      });
      setTimeout(() => {
        sessionStorage.setItem("wolf-preloader-shown", "true");
        setVisible(false);
      }, 800);
    }
  }, [phase]);

  if (!visible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0A]"
      style={{ transition: "transform 0.7s cubic-bezier(0.77, 0, 0.18, 1), opacity 0.5s ease" }}
    >
      <div className={`relative ${phase === "shimmer" ? "wolf-shimmer" : ""}`}>
        <svg
          id="wolf-preloader-svg"
          viewBox="0 0 512 512"
          className="w-48 h-48 md:w-64 md:h-64"
          fill="none"
        >
          <g id="wolf-preloader">
            <path id="preloader-outer-face" d="M256 40 L160 120 L80 160 L100 240 L60 340 L120 400 L180 460 L256 480 L332 460 L392 400 L452 340 L412 240 L432 160 L352 120 Z" stroke="#D4AF37" stroke-width="3" fill="none"/>
            <path id="preloader-ears" d="M160 120 L120 40 L200 100 M352 120 L392 40 L312 100" stroke="#D4AF37" stroke-width="3" fill="none"/>
            <path id="preloader-inner-face" d="M256 180 L196 220 L180 300 L220 360 L256 380 L292 360 L332 300 L316 220 Z" stroke="#D4AF37" stroke-width="2" fill="none"/>
            <path id="preloader-nose" d="M240 340 L256 360 L272 340" stroke="#D4AF37" stroke-width="2" fill="none"/>
            <ellipse id="preloader-eye-left" cx="216" cy="240" rx="14" ry="16" stroke="#D4AF37" stroke-width="2.5" fill="none"/>
            <ellipse id="preloader-eye-right" cx="296" cy="240" rx="14" ry="16" stroke="#D4AF37" stroke-width="2.5" fill="none"/>
            <circle id="preloader-pupil-left" cx="216" cy="240" r="6" fill="none"/>
            <circle id="preloader-pupil-right" cx="296" cy="240" r="6" fill="none"/>
            <path id="preloader-fur-details" d="M160 160 L120 140 L140 180 M352 160 L392 140 L372 180 M120 260 L90 250 L110 290 M392 260 L422 250 L402 290" stroke="#D4AF37" stroke-width="1.5" fill="none"/>
            <path id="preloader-muzzle" d="M220 360 L200 390 M292 360 L312 390" stroke="#D4AF37" stroke-width="2" fill="none"/>
          </g>
        </svg>
        {phase === "shimmer" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent animate-shimmer rounded-full" />
        )}
      </div>
      <style>{`
        .wolf-shimmer {
          animation: wolfPulse 0.6s ease-in-out;
        }
        @keyframes wolfPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
