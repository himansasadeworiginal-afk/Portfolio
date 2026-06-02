"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

const COLORS = [
  "#D4AF37", "#F5D060", "#A8862A", "#FFD700", "#E8C84A",
  "#C9A832", "#B8860B", "#DAA520", "#CD853F", "#DEB887",
];

export default function LogoOrbit() {
  const logos = portfolio.techLogos;

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[300px] md:h-[400px]">
      {logos.map((logo, i) => {
        const angle = (i / logos.length) * 360;
        const radius = i % 2 === 0 ? 120 : 90;
        const duration = 12 + (i % 5) * 2;
        const delay = i * 0.5;

        return (
          <motion.div
            key={logo}
            className="absolute left-1/2 top-1/2"
            style={{
              width: 0,
              height: 0,
            }}
          >
            <motion.div
              className="absolute cursor-default"
              style={{
                width: "fit-content",
                transform: `translate(-50%, -50%)`,
              }}
              animate={{
                x: [Math.cos((angle * Math.PI) / 180) * radius, Math.cos(((angle + 360) * Math.PI) / 180) * radius],
                y: [Math.sin((angle * Math.PI) / 180) * radius * 0.6, Math.sin(((angle + 360) * Math.PI) / 180) * radius * 0.6],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay: -delay,
              }}
              whileHover={{
                scale: 1.3,
                transition: { duration: 0.2 },
              }}
            >
              <div className="group relative">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold border-2 transition-all duration-300"
                  style={{
                    borderColor: COLORS[i % COLORS.length],
                    color: COLORS[i % COLORS.length],
                    backgroundColor: "rgba(17,17,17,0.8)",
                    boxShadow: `0 0 10px ${COLORS[i % COLORS.length]}33`,
                  }}
                >
                  {logo.slice(0, 3).toUpperCase()}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  <span className="font-body text-[10px] text-gold-primary bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle">
                    {logo}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
