"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";
import { useKonamiCode } from "@/hooks/use-konami-code";
import { useSynthHowl } from "@/hooks/use-synth-howl";
import { useTheme } from "@/hooks/use-theme";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eyeGlow, setEyeGlow] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const playHowl = useSynthHowl();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKonami = useCallback(() => {
    setEasterEgg(true);
    playHowl();
    setTimeout(() => setEasterEgg(false), 1000);
  }, [playHowl]);

  useKonamiCode(handleKonami);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-[12px] border-b border-gold-primary/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3 group"
            onMouseEnter={() => setEyeGlow(true)}
            onMouseLeave={() => setEyeGlow(false)}
          >
            <div className="relative">
              <svg
                viewBox="0 0 120 120"
                className="w-8 h-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60 10 L38 30 L20 45 L28 80 L18 110 L40 115 L60 120 L80 115 L102 110 L92 80 L100 45 L82 30 Z"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                <path d="M60 50 L44 70 L42 96 L60 102 L78 96 L76 70 Z" stroke="#D4AF37" strokeWidth="1" />
                <circle
                  cx="46"
                  cy="72"
                  r="3"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  className={`transition-all duration-300 ${eyeGlow || easterEgg ? "fill-gold-primary" : "fill-none"}`}
                  style={eyeGlow || easterEgg ? { filter: "drop-shadow(0 0 6px #D4AF37)" } : undefined}
                />
                <circle
                  cx="74"
                  cy="72"
                  r="3"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  className={`transition-all duration-300 ${eyeGlow || easterEgg ? "fill-gold-primary" : "fill-none"}`}
                  style={eyeGlow || easterEgg ? { filter: "drop-shadow(0 0 6px #D4AF37)" } : undefined}
                />
                <path d="M38 30 L28 12 L48 24 M82 30 L92 12 L72 24" stroke="#D4AF37" strokeWidth="1" />
              </svg>
              {easterEgg && (
                <div className="absolute -top-2 -left-2 -right-2 -bottom-2 pointer-events-none">
                  <div className="absolute inset-0 bg-gold-primary/20 rounded-full animate-ping" />
                </div>
              )}
            </div>
            <span className="font-heading text-xl gold-gradient-text hidden sm:block">
              {portfolio.personal.initials}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm uppercase tracking-[0.1em] text-text-muted hover:text-gold-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="size-10 md:size-9 border border-border-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-gold-primary hover:border-gold-primary transition-all duration-300"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              suppressHydrationWarning
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="md:hidden text-text-primary size-10 flex items-center justify-center"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-bg-primary flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-text-primary"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-3xl gold-gradient-text hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
