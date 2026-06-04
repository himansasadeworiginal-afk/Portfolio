"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const played = sessionStorage.getItem("preloaderPlayed");
    if (played) {
      setVisible(false);
      onComplete();
      return;
    }

    import("gsap").then((gsapModule) => {
      const gs = gsapModule.default;

      const tl = gs.timeline({
        onComplete: () => {
          sessionStorage.setItem("preloaderPlayed", "true");
        },
      });

      const paths = document.querySelectorAll("#wolf-svg path");
      const eyeLeft = document.querySelector("#wolf-eye-left") as SVGPathElement | null;
      const eyeRight = document.querySelector("#wolf-eye-right") as SVGPathElement | null;

      paths.forEach((p) => {
        const len = (p as SVGPathElement).getTotalLength();
        gs.set(p, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
      });

      const outerPaths: Element[] = [];
      const innerPaths: Element[] = [];
      const eyePaths: Element[] = [];

      paths.forEach((p) => {
        if (p.id === "wolf-eye-left" || p.id === "wolf-eye-right") {
          eyePaths.push(p);
        } else if (p.classList.contains("inner")) {
          innerPaths.push(p);
        } else {
          outerPaths.push(p);
        }
      });

      // Stage 1: Wolf draws itself (0s -> 1.5s)
      tl.to(outerPaths, {
        strokeDashoffset: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      })
        .to(
          innerPaths,
          {
            strokeDashoffset: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          ">+0.1"
        )
        .to(
          eyePaths,
          {
            strokeDashoffset: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: "power2.out",
          },
          ">+0.1"
        )

        // Stage 2: Eyes pulse gold (1.5s -> 2.1s)
        .to(
          [eyeLeft, eyeRight],
          {
            fill: "#D4AF37",
            duration: 0.01,
          },
          ">"
        )
        .to(
          [eyeLeft, eyeRight],
          {
            keyframes: {
              filter: [
                "drop-shadow(0 0 0px #D4AF37)",
                "drop-shadow(0 0 14px #D4AF37)",
                "drop-shadow(0 0 0px #D4AF37)",
              ],
            },
            duration: 0.6,
            ease: "power2.inOut",
          },
          "<"
        )

        // Stage 3: "WOLF INDUSTRIES" appears (2.1s -> 2.8s)
        .to(
          "#preloader-title",
          {
            opacity: 1,
            letterSpacing: "0.4em",
            duration: 0.7,
            ease: "power3.out",
          },
          ">"
        )

        // Stage 4: Wolf shrinks, "Hi, my name is" appears (2.8s -> 3.4s)
        .to(
          "#wolf-group",
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          ">"
        )
        .to(
          "#preloader-title",
          {
            opacity: 0,
            duration: 0.3,
          },
          "<"
        )
        .to(
          "#preloader-greeting",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          ">+=0.1"
        )

        // Stage 5: "H. Sadew" letter-by-letter (3.4s -> 4.2s)
        .to(
          "#preloader-name .char-span",
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power4.out",
          },
          ">"
        )

        // Stage 6: Three skill pills appear (4.2s -> 4.8s)
        .to(
          "#preloader-pills .pill",
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.18,
            ease: "power2.out",
          },
          ">"
        )

        // Stage 7: Gold scanner wipe, site reveals (4.8s -> 5.6s)
        .to("#scanner-line", {
          top: "-2px",
          duration: 0.6,
          ease: "power2.inOut",
        })
        .to(
          "#preloader-content > *",
          {
            opacity: 0,
            duration: 0.2,
            stagger: 0.03,
          },
          "<"
        )
        .to(containerRef.current, {
          y: "-100vh",
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            setVisible(false);
            onComplete();
          },
        });
    });
  }, [onComplete]);

  if (!visible) return null;

  const nameChars = "H.\u00A0Sadew".split("").map((c, i) => (
    <span
      key={i}
      className="char-span inline-block"
      style={{
        opacity: 0,
        transform: "translateY(60px) rotateX(-40deg)",
        fontFamily: "var(--font-playfair), serif",
        fontSize: "clamp(3rem, 8vw, 6.5rem)",
        background: "linear-gradient(135deg, #D4AF37, #F5D060)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        perspective: "600px",
      }}
    >
      {c === "\u00A0" ? "\u00A0" : c}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] bg-[#0A0A0A] flex flex-col items-center justify-center"
      style={{ perspective: "600px" }}
    >
      <div id="preloader-content" className="flex flex-col items-center justify-center">
        <div id="wolf-group" className="flex flex-col items-center">
          <svg
            id="wolf-svg"
            width="280"
            height="280"
            viewBox="0 0 280 280"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 280, height: 280 }}
          >
            {/* Outer fur paths - ears and outer head */}
            <path
              className="outer"
              d="M140 40 L110 15 L95 55 L105 70 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              className="outer"
              d="M140 40 L170 15 L185 55 L175 70 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              className="outer"
              d="M70 100 Q60 70 45 85 Q40 95 55 110 L75 105 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              className="outer"
              d="M210 100 Q220 70 235 85 Q240 95 225 110 L205 105 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              className="outer"
              d="M60 130 Q30 120 20 145 Q15 165 35 175 L55 165 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              className="outer"
              d="M220 130 Q250 120 260 145 Q265 165 245 175 L225 165 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Outer fur - cheek ruffs */}
            <path
              className="outer"
              d="M65 170 Q50 190 55 210 Q65 225 85 215"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              className="outer"
              d="M215 170 Q230 190 225 210 Q215 225 195 215"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Main head outline */}
            <path
              className="outer"
              d="M80 85 Q100 65 140 60 Q180 65 200 85 Q220 110 225 145 Q225 175 215 200 Q200 225 170 235 Q155 240 140 240 Q125 240 110 235 Q80 225 65 200 Q55 175 55 145 Q55 110 80 85 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Inner face - muzzle */}
            <path
              className="inner"
              d="M140 240 Q140 250 125 255 Q110 250 110 240"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              className="inner"
              d="M140 240 Q140 250 155 255 Q170 250 170 240"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Inner face - nose */}
            <path
              className="inner"
              d="M125 255 Q130 260 140 262 Q150 260 155 255"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Inner face - brow ridges */}
            <path
              className="inner"
              d="M95 120 Q110 110 125 118"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              className="inner"
              d="M185 120 Q170 110 155 118"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Inner face - muzzle lines */}
            <path
              className="inner"
              d="M140 242 L140 255"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Eyes */}
            <path
              id="wolf-eye-left"
              className="eye"
              d="M105 140 Q115 130 127 140"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              id="wolf-eye-right"
              className="eye"
              d="M175 140 Q165 130 153 140"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
          </svg>

          <p
            id="preloader-title"
            style={{
              opacity: 0,
              fontFamily: "var(--font-playfair), serif",
              fontSize: "1.1rem",
              color: "#D4AF37",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginTop: "24px",
            }}
          >
            WOLF INDUSTRIES
          </p>
        </div>

        <p
          id="preloader-greeting"
          style={{
            opacity: 0,
            transform: "translateY(16px)",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "1rem",
            color: "#A0A0A0",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Hi, my name is
        </p>

        <div
          id="preloader-name"
          style={{
            perspective: "600px",
            marginBottom: "24px",
            overflow: "hidden",
          }}
        >
          {nameChars}
        </div>

        <div
          id="preloader-pills"
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["⚡ Fast Worker", "🧠 Fast Learner", "🤖 AI-Fluent"].map((text) => (
            <span
              key={text}
              className="pill"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                border: "1px solid rgba(212,175,55,0.5)",
                background: "rgba(212,175,55,0.08)",
                color: "#D4AF37",
                borderRadius: "9999px",
                padding: "6px 18px",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div
        id="scanner-line"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: "100%",
          height: "2px",
          background: "#D4AF37",
          boxShadow: "0 0 12px #D4AF37",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
}
