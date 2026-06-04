"use client";

import { useEffect, useRef, useState } from "react";

export default function WolfPreloader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"show" | "exit">("show");
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shown = sessionStorage.getItem("wolf-preloader-shown");
    if (shown) {
      setVisible(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const duration = isMobile ? 1200 : 1800;

    const timer = setTimeout(() => {
      setPhase("exit");
    }, duration);

    return () => {
      clearTimeout(timer);
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
      <div className="relative">
        <img
          src="/Portfolio/logo1.png"
          alt="Logo"
          className="w-48 h-48 md:w-64 md:h-64 object-contain animate-fadeIn"
          style={{
            animation: "preloaderFadeIn 0.6s ease-out forwards",
          }}
        />
        {phase === "show" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent animate-shimmer rounded-full" />
        )}
      </div>
      <style>{`
        @keyframes preloaderFadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
