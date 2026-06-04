"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Download,
  Mail,
  Phone,
  MapPin,
  Code2,
  ArrowRight,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import Navigation from "@/components/navigation";
import ScrollProgress from "@/components/scroll-progress";
import SectionWrapper from "@/components/section-wrapper";
import Toast from "@/components/toast";
import SectionDivider from "@/components/section-divider";
import MarqueeStrip from "@/components/marquee-strip";
import HorizontalProjects from "@/components/horizontal-projects";
import SkillsSection from "@/components/tag-sphere";
import CaseStudiesSection from "@/components/case-studies-section";
import ProcessSection from "@/components/process-section";
import GitHubSection from "@/components/github-section";
import GlitchHeading from "@/components/glitch-heading";
import MobileHeroParticles from "@/components/mobile-hero-particles";
import Footer from "@/components/footer";
import { useCountUp } from "@/hooks/use-count-up";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { portfolio } from "@/data/portfolio";
import { assetPath } from "@/lib/paths";

const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false, loading: () => null });
const ParticleCanvas = dynamic(() => import("@/components/particle-canvas"), { ssr: false, loading: () => null });
const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false, loading: () => null });
const Confetti = dynamic(() => import("@/components/confetti"), { ssr: false, loading: () => null });
const TestimonialsCarousel = dynamic(() => import("@/components/testimonials-carousel"), { ssr: false, loading: () => null });
import MagneticButton from "@/components/magnetic-button";

export default function Home() {
  const prefersReduced = useReducedMotion();
  const [scrambledText, setScrambledText] = useState("[YOUR NAME]");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });
  const [confettiActive, setConfettiActive] = useState(false);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  useEffect(() => {
    const target = portfolio.personal.name;
    let frame = 0;
    const totalFrames = 30;

    const interval = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setScrambledText(target);
        clearInterval(interval);
        return;
      }

      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * target.length);

      let result = "";
      for (let i = 0; i < target.length; i++) {
        if (i < revealedCount) {
          result += target[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setScrambledText(result);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const roles = [
    "Front-End Web Designer & Developer",
    "Shopify Specialist",
    "Full-Stack Engineer",
    "UI/UX Enthusiast",
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    if (prefersReduced) return;
    let ctx: gsap.Context | undefined;

    import("gsap").then((gsapModule) => {
      import("gsap/ScrollTrigger").then((stModule) => {
        const gsap = gsapModule.default;
        gsap.registerPlugin(stModule.ScrollTrigger);

        ctx = gsap.context(() => {
          const wolfGhost = document.querySelector("#hero-wolf-ghost");
          if (wolfGhost) {
            gsap.to(wolfGhost, {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          const timelineLine = document.querySelector("#timeline-gold-line");
          if (!timelineLine) return;

          gsap.fromTo(
            timelineLine,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: "#experience",
                start: "top 30%",
                end: "bottom 60%",
                scrub: 1,
              },
            }
          );
        });
      });
    });

    return () => ctx?.revert();
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <main>
        {/* HERO */}
        <SectionWrapper id="hero" className="relative min-h-screen flex items-center justify-center bg-bg-primary overflow-hidden">
          <HeroScene />
          <MobileHeroParticles />

          <div
            id="hero-wolf-ghost"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              zIndex: 2,
              filter: "brightness(0.8) sepia(1) saturate(2) hue-rotate(5deg)",
            }}
          >
            <img
              src="/Portfolio/logo1.png"
              alt=""
              className="w-[70vh] h-[70vh] object-contain opacity-[0.06]"
              style={{
                animation: "wolfBreathe 4s ease-in-out infinite",
              }}
            />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                AVAILABLE FOR WORK
              </span>
            </div>

            <h1 id="hero-name" className="font-heading text-[clamp(3rem,8vw,7rem)] gold-gradient-text tracking-[-0.02em] leading-none mb-4 inline-block">
              {portfolio.personal.name.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block hero-char"
                  style={{
                    opacity: 0,
                    transform: "translateY(100px)",
                    animation: `heroCharReveal 0.06s ${i * 0.04}s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            <div
              id="hero-line"
              className="w-0 h-px bg-gold-primary mx-auto mb-6"
              style={{
                animation: "heroLineDraw 0.4s 1.5s forwards ease-out",
              }}
            />

            <div className="font-body text-lg text-text-muted mb-6 h-8 overflow-hidden relative">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIndex}
                  initial={prefersReduced ? {} : { y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={prefersReduced ? {} : { y: -60, opacity: 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.3, ease: "easeInOut" }}
                  className="block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="font-body text-text-muted mb-10 max-w-xl mx-auto">
              {portfolio.personal.tagline}
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <MagneticButton href="#projects" variant="primary">
                View My Work <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton href={assetPath(portfolio.personal.resumeUrl)} variant="outline">
                <Download size={16} />
                Download CV
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-text-subtle">
              SCROLL
            </span>
            <motion.div
              animate={prefersReduced ? {} : { y: [0, 8, 0] }}
              transition={{ duration: prefersReduced ? 0 : 1.5, repeat: Infinity }}
            >
              <ChevronDown size={16} className="text-gold-primary" />
            </motion.div>
          </div>
        </SectionWrapper>

        <MarqueeStrip />

        <SectionDivider />

        {/* ABOUT */}
        <SectionWrapper id="about" className="py-24 bg-bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                  <div className="relative w-[400px] h-[500px] max-w-full mx-auto">
                    <Image src={portfolio.personal.profileImage} alt={portfolio.personal.name} width={400} height={500} className="w-full h-full object-cover rounded-xl" unoptimized loading="lazy" />
                  <div className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] rounded-xl border-2 border-transparent pointer-events-none">
                    <div className="absolute -top-[2px] -left-[2px] w-16 h-16 border-t-2 border-l-2 border-gold-primary rounded-tl-[14px]" />
                    <div className="absolute -top-[2px] -right-[2px] w-16 h-16 border-t-2 border-r-2 border-gold-primary rounded-tr-[14px]" />
                    <div className="absolute -bottom-[2px] -left-[2px] w-16 h-16 border-b-2 border-l-2 border-gold-primary rounded-bl-[14px]" />
                    <div className="absolute -bottom-[2px] -right-[2px] w-16 h-16 border-b-2 border-r-2 border-gold-primary rounded-br-[14px]" />
                  </div>
                </div>

                <div className="flex justify-center gap-12 mt-8">
                  {portfolio.stats.map((stat) => (
                    <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                  ))}
                </div>
              </div>

              <div>
                <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                  ABOUT ME
                </span>
                <GlitchHeading
                  text="Crafting Digital Experiences That Matter"
                  className="font-heading text-4xl gold-gradient-text mt-2 mb-6 text-left"
                />

                {portfolio.personal.bio.map((paragraph, i) => (
                  <p key={i} className="font-body text-text-muted leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}

                <ul className="space-y-2 mb-8">
                  {portfolio.personal.keyFacts.map((fact) => (
                    <li key={fact} className="flex items-center gap-2 font-body text-sm text-text-muted">
                      <span className="text-gold-primary">›</span>
                      {fact}
                    </li>
                  ))}
                </ul>

                <a
                  href={portfolio.personal.resumeUrl}
                  className="inline-flex items-center gap-2 border border-gold-primary text-gold-primary font-body text-sm font-semibold px-8 py-3 rounded-full hover:bg-gold-primary hover:text-black transition-all duration-300"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionDivider />

        <SkillsSection />

        <SectionDivider />

        <SectionDivider />

        {/* PROJECTS */}
        <HorizontalProjects />

        <SectionDivider />

        <CaseStudiesSection />

        <SectionDivider />

        {/* EXPERIENCE */}
        <SectionWrapper id="experience" className="py-24 bg-bg-primary">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                CAREER JOURNEY
              </span>
              <GlitchHeading
                text="5 Years of Building the Web"
                className="font-heading text-4xl gold-gradient-text mt-2"
              />
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-border-subtle" />
              <div
                id="timeline-gold-line"
                className="absolute left-1/2 -translate-x-px top-0 w-[2px] bg-gold-primary z-10"
                style={{ height: "0%" }}
              />

              {portfolio.experience.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={prefersReduced ? {} : { opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : i * 0.2 }}
                  className={`relative flex items-start gap-8 mb-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:pl-0 pl-8`}
                >
                  <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 top-1 w-[18px] h-[18px] bg-gold-primary rounded-full border-4 border-bg-primary z-10" />

                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <div className="bg-bg-elevated border border-border-subtle rounded-lg p-6 hover:border-gold-primary/60 transition-all duration-300">
                      <span className="font-body text-xs text-gold-primary uppercase tracking-[0.1em]">
                        {exp.period}
                      </span>
                      <h3 className="font-heading text-xl text-text-primary mt-1">
                        {exp.role}
                      </h3>
                      <p className="font-body text-sm text-text-muted mb-4">
                        {exp.company}
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((a) => (
                          <li key={a.slice(0, 20)} className="font-body text-sm text-text-muted flex items-start gap-2">
                            <span className="text-gold-primary mt-1">•</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="inline-block bg-bg-elevated border border-border-subtle rounded-lg p-6">
                <p className="font-body text-xs text-gold-primary uppercase tracking-[0.1em] mb-1">
                  {portfolio.education.period}
                </p>
                <h3 className="font-heading text-lg gold-gradient-text">
                  {portfolio.education.degree}
                </h3>
                <p className="font-body text-sm text-text-muted">
                  {portfolio.education.school}
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionDivider />

        <GitHubSection />

        <SectionDivider />

        {/* SERVICES */}
        <SectionWrapper id="services" className="py-24 bg-bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                WHAT I DO
              </span>
              <GlitchHeading
                text="End-to-End Web Development Services"
                className="font-heading text-4xl gold-gradient-text mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.services.map((service) => (
                <div
                  key={service.title}
                  className="bg-bg-elevated border border-border-subtle rounded-lg p-8 hover:border-gold-primary/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 border border-gold-primary rounded-lg flex items-center justify-center mb-5 group-hover:bg-gold-primary/10 transition-colors">
                    <Code2 size={22} className="text-gold-primary" />
                  </div>
                  <h3 className="font-heading text-xl gold-gradient-text mb-3">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionDivider />

        <ProcessSection />

        <SectionDivider />

        {/* TESTIMONIALS */}
        <SectionWrapper id="testimonials" className="py-24 bg-bg-primary">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                KIND WORDS
              </span>
              <GlitchHeading
                text="What Clients Say"
                className="font-heading text-4xl gold-gradient-text mt-2"
              />
            </div>

            <TestimonialsCarousel />
          </div>
        </SectionWrapper>

        <SectionDivider />

        {/* CONTACT */}
        <SectionWrapper id="contact" className="py-24 bg-bg-surface relative overflow-hidden">
          <div
            className="absolute right-[-10%] top-0 h-full flex items-center pointer-events-none z-0"
            style={{ animation: "wolfRotate 120s linear infinite" }}
          >
            <img
              src="/Portfolio/logo1.png"
              alt=""
              className="h-full max-h-[600px] w-auto object-contain opacity-[0.04]"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
                GET IN TOUCH
              </span>
              <GlitchHeading
                text="Let's Build Something Great"
                className="font-heading text-4xl gold-gradient-text mt-2"
              />
              <p className="font-body text-text-muted mt-4">
                Open to freelance projects, full-time roles, and consultations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative">
                <div className="flex items-center gap-2 mb-8">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-body text-sm text-green-500 font-semibold">
                    Open to Work
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-gold-primary rounded-lg flex items-center justify-center">
                      <Mail size={18} className="text-gold-primary" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-subtle uppercase tracking-[0.1em]">
                        Email
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(portfolio.personal.email);
                          setToast({ visible: true, message: "Email copied!" });
                        }}
                        className="font-body text-sm text-text-primary hover:text-gold-primary transition-colors"
                      >
                        {portfolio.personal.email}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-gold-primary rounded-lg flex items-center justify-center">
                      <Phone size={18} className="text-gold-primary" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-subtle uppercase tracking-[0.1em]">
                        Phone
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(portfolio.personal.phone);
                          setToast({ visible: true, message: "Phone copied!" });
                        }}
                        className="font-body text-sm text-text-primary hover:text-gold-primary transition-colors"
                      >
                        {portfolio.personal.phone}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-gold-primary rounded-lg flex items-center justify-center">
                      <MapPin size={18} className="text-gold-primary" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-subtle uppercase tracking-[0.1em]">
                        Location
                      </p>
                      <p className="font-body text-sm text-text-primary">
                        {portfolio.personal.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <a
                    href={portfolio.personal.social.github}
                    className="size-11 border border-border-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-gold-primary hover:border-gold-primary transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={18} />
                  </a>
                  <a
                    href={portfolio.personal.social.linkedin}
                    className="size-11 border border-border-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-gold-primary hover:border-gold-primary transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                  <a
                    href={portfolio.personal.social.twitter}
                    className="size-11 border border-border-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-gold-primary hover:border-gold-primary transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <TwitterIcon size={18} />
                  </a>
                </div>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[200px] text-gold-primary/5 font-heading select-none pointer-events-none leading-none">
                  ⬡
                </div>
              </div>

              <div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setFormState("loading");
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    try {
                      const res = await fetch("https://formspree.io/f/mvzyeeda", {
                        method: "POST",
                        headers: { "Accept": "application/json" },
                        body: data,
                      });
                      if (!res.ok) throw new Error("Failed to send");
                      setFormState("success");
                      setConfettiActive(true);
                      setTimeout(() => setConfettiActive(false), 3000);
                      form.reset();
                    } catch {
                      setFormState("error");
                    }
                  }}
                  className="space-y-5"
                >
                  {[
                    { label: "Name", type: "text" },
                    { label: "Email", type: "email" },
                    { label: "Subject", type: "text" },
                  ].map((field) => (
                    <div key={field.label} className="relative">
                      <input
                        type={field.type}
                        id={field.label.toLowerCase()}
                        placeholder=" "
                        className="peer w-full bg-transparent border border-border-subtle rounded-lg px-4 pt-6 pb-2 font-body text-sm text-text-primary focus:border-gold-primary focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)] outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor={field.label.toLowerCase()}
                        className="absolute left-4 top-5 text-text-subtle text-sm font-body peer-focus:text-xs peer-focus:top-2 peer-focus:text-gold-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2 transition-all duration-200"
                      >
                        {field.label}
                      </label>
                    </div>
                  ))}

                  <div className="relative">
                    <textarea
                      id="message"
                      rows={5}
                      placeholder=" "
                      className="peer w-full bg-transparent border border-border-subtle rounded-lg px-4 pt-6 pb-2 font-body text-sm text-text-primary focus:border-gold-primary focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)] outline-none transition-all duration-300 resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-5 text-text-subtle text-sm font-body peer-focus:text-xs peer-focus:top-2 peer-focus:text-gold-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2 transition-all duration-200"
                    >
                      Message
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formState !== "idle"}
                    className="w-full bg-gold-primary text-black font-body text-sm font-semibold py-3 rounded-lg hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {formState === "idle" && (
                      <>
                        Send Message <ArrowRight size={16} />
                      </>
                    )}
                    {formState === "loading" && (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </>
                    )}
                    {formState === "success" && (
                      <>
                        <CheckCircle size={16} /> Message Sent!
                      </>
                    )}
                    {formState === "error" && (
                      <>
                        <XCircle size={16} /> Failed to Send
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>

      <Footer />

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast({ visible: false, message: "" })}
      />
      <Confetti active={confettiActive} />
    </>
  );
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-heading text-3xl gold-gradient-text">
        {count}{suffix}
      </p>
      <p className="font-body text-xs text-text-muted uppercase tracking-[0.1em] mt-1">
        {label}
      </p>
    </div>
  );
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}


