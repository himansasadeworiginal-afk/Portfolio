"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import GlitchHeading from "@/components/glitch-heading";

function getSkills() {
  const all: { name: string; level: number; category: string }[] = [];
  const cats: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    cms: "CMS & eCommerce",
    devops: "Tools & DevOps",
  };
  for (const [key, skills] of Object.entries(portfolio.skills)) {
    for (const s of skills) {
      all.push({ ...s, category: cats[key] || key });
    }
  }
  return all;
}

function fibonacciSphere(count: number, radius: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }
  return points;
}

function SkillTag({
  name,
  level,
  index,
  total,
}: {
  name: string;
  level: number;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="skill-tag absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
      style={{
        background: "rgba(212,175,55,0.08)",
        border: "1px solid rgba(212,175,55,0.3)",
        color: "#D4AF37",
        borderRadius: "20px",
        padding: "6px 14px",
        fontSize: "13px",
        fontFamily: "var(--font-inter), sans-serif",
        whiteSpace: "nowrap",
        transition: "transform 0.3s ease, opacity 0.3s ease",
        willChange: "transform",
        opacity: 1,
        pointerEvents: "auto",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = `translate(${el.dataset.x}, ${el.dataset.y}) scale(1.4) translateZ(60px)`;
        el.style.opacity = "1";
        el.style.zIndex = "10";
        el.style.background = "rgba(212,175,55,0.15)";
        el.style.boxShadow = "0 0 20px rgba(212,175,55,0.3)";
        document.querySelectorAll(".skill-tag").forEach((other) => {
          if (other !== el) (other as HTMLElement).style.opacity = "0.3";
        });
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = `translate(${el.dataset.x}, ${el.dataset.y}) scale(1) translateZ(0)`;
        el.style.opacity = "1";
        el.style.zIndex = "1";
        el.style.background = "rgba(212,175,55,0.08)";
        el.style.boxShadow = "none";
        document.querySelectorAll(".skill-tag").forEach((other) => {
          (other as HTMLElement).style.opacity = "1";
        });
      }}
    >
      {name}
      <span className="ml-1.5 text-[10px] opacity-60">{level}%</span>
    </div>
  );
}

function TagSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const skills = useMemo(() => getSkills().slice(0, 24), []);
  const positions = useMemo(() => fibonacciSphere(skills.length, 280), [skills.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined" || window.innerWidth < 768) {
      setReady(false);
      return;
    }

    setReady(true);
    let animId: number;
    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const tags = container.querySelectorAll<HTMLElement>(".skill-tag");
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;

    function updatePositions() {
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      tags.forEach((tag, i) => {
        const p = positions[i];
        const x = p.x * cosY - p.z * sinY;
        const z = p.x * sinY + p.z * cosY;
        const y = p.y * cosX - z * sinX;
        const finalZ = p.y * sinX + z * cosX;

        const scale = ((finalZ + 350) / 700) * 0.5 + 0.5;
        const opacity = Math.max(0.3, Math.min(1, scale));

        const screenX = centerX + x;
        const screenY = centerY + y;

        tag.style.transform = `translate(-50%, -50%) translate(${screenX}px, ${screenY}px) scale(${scale})`;
        tag.style.opacity = String(opacity);
        tag.style.zIndex = String(Math.round(scale * 100));
        tag.dataset.x = `${screenX - centerX}px`;
        tag.dataset.y = `${screenY - centerY}px`;
      });
    }

    function animate() {
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      targetAngleX += (mouseY * 0.005 - targetAngleX) * 0.02;
      targetAngleY += (mouseX * 0.005 - targetAngleY) * 0.02;

      targetAngleX += 0.002;
      targetAngleY += 0.003;

      updatePositions();
      animId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    container.addEventListener("mousemove", handleMouseMove);
    updatePositions();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [positions]);

  return (
    <div
      ref={containerRef}
      className={`relative ${ready ? "w-full h-[500px]" : "hidden"}`}
    >
      {skills.map((skill, i) => (
        <SkillTag
          key={skill.name}
          name={skill.name}
          level={skill.level}
          index={i}
          total={skills.length}
        />
      ))}
    </div>
  );
}

function MobileSkillsGrid() {
  const skills = useMemo(() => getSkills(), []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="text-center"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "#D4AF37",
            borderRadius: "20px",
            padding: "8px 12px",
            fontSize: "12px",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {skill.name}
          <span className="ml-1 text-[10px] opacity-60">{skill.level}%</span>
        </div>
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section id="skills" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
            EXPERTISE
          </span>
          <GlitchHeading
            text="Skills & Tech Stack"
            className="font-heading text-4xl gold-gradient-text mt-2"
          />
        </div>

        {/* Sphere or Grid */}
        {isMobile ? <MobileSkillsGrid /> : <TagSphere />}

        {/* Category Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Frontend Skills", count: 8, desc: "HTML, CSS, JS, React & more" },
            { label: "Backend Skills", count: 7, desc: "PHP, Python, Node, DBs" },
            { label: "CMS & eCommerce", count: 6, desc: "Shopify, WordPress, Figma" },
            { label: "Dev Tools", count: 7, desc: "Git, Docker, Analytics, SEO" },
          ].map((cat) => (
            <div
              key={cat.label}
              className="bg-bg-elevated border border-border-subtle rounded-lg p-5 text-center hover:border-gold-primary/60 transition-all duration-300"
            >
              <span className="font-heading text-3xl gold-gradient-text">{cat.count}</span>
              <p className="font-body text-sm text-gold-primary mt-1">{cat.label}</p>
              <p className="font-body text-xs text-text-muted mt-1">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
