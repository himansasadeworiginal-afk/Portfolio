"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "project" | "text";

const isTouch = () =>
  typeof window !== "undefined" &&
  (window.innerWidth < 768 || "ontouchstart" in window);

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (isTouch()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    };

    const getCursorState = (target: HTMLElement | null): { state: CursorState; label: string } => {
      if (!target) return { state: "default", label: "" };

      const isInput = target.closest("input, textarea, select, [contenteditable]");
      if (isInput) return { state: "text", label: "" };

      const isProject = target.closest("#projects, #case-studies") || target.closest('[class*="project"]');
      const isLink = target.closest("a");
      const isButton = target.closest("button");

      if (isProject && !isLink && !isButton) return { state: "project", label: "VIEW" };
      if (isLink) return { state: "hover", label: "OPEN" };
      if (isButton) return { state: "hover", label: "CLICK" };

      return { state: "default", label: "" };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const result = getCursorState(target);
      setState(result.state);
      setLabel(result.label);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver, true);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver, true);
    };
  }, []);

  const ringSize = state === "project" ? 80 : state === "hover" ? 48 : state === "text" ? 24 : 28;
  const center = ringSize / 2;
  const dash = state === "project" ? "dashed" : "solid";

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-[6px] h-[6px] bg-gold-primary rounded-full"
        style={{
          transform: "translate(0, 0)",
          opacity: state === "default" ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none flex items-center justify-center"
        style={{
          transform: "translate(0, 0)",
          width: ringSize,
          height: ringSize,
          margin: -center,
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: ringSize,
            height: ringSize,
            border: state === "text" ? "1px solid var(--gold-primary)" : "1px solid rgba(var(--gold-rgb), 0.5)",
            borderRadius: state === "text" ? 1 : "50%",
            borderStyle: dash,
            background: state === "text" ? "var(--gold-primary)" : "transparent",
            transition: "width 0.3s ease-out, height 0.3s ease-out, border-radius 0.3s ease-out, border-style 0.3s, background 0.3s",
            animation: state === "hover" ? "cursorSpin 2s linear infinite" : state === "project" ? "cursorSpin 1s linear infinite" : "none",
          }}
        >
          <span
            ref={textRef}
            className="text-[9px] uppercase tracking-[0.15em] font-body text-gold-primary select-none"
            style={{
              opacity: state === "hover" || state === "project" ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          >
            {label}
          </span>
        </div>
      </div>
      <style>{`
        @keyframes cursorSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
