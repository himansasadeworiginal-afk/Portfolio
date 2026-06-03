"use client";

import { useRef, useState, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "outline",
  className = "",
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [liquid, setLiquid] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    setLiquid({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, active: true });

    if (dist < 80) {
      const pull = (80 - dist) / 80;
      btn.style.transform = `translate(${deltaX * pull * 0.3}px, ${deltaY * pull * 0.3}px)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;

    btn.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
    btn.style.transform = "translate(0, 0)";
    setLiquid({ x: 50, y: 50, active: false });
    setTimeout(() => {
      if (btn) btn.style.transition = "";
    }, 600);
  }, []);

  const baseClasses = `inline-flex items-center gap-2 font-body text-sm font-semibold px-8 py-3 rounded-full transition-colors duration-300 relative overflow-hidden ${
    variant === "primary"
      ? "bg-gold-primary text-black hover:bg-gold-light"
      : "border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-black"
  } ${className}`;

  const liquidStyle: React.CSSProperties =
    variant === "primary" && liquid.active
      ? {
          background: `radial-gradient(circle 80px at ${liquid.x}% ${liquid.y}%, rgba(255,255,255,0.3) 0%, transparent 70%)`,
        }
      : {};

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={liquidStyle}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: "transform" }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform" }}
    >
      {content}
    </button>
  );
}
