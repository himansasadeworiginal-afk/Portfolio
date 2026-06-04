const techItems = [
  "HTML5", "CSS3", "JavaScript", "React", "Next.js",
  "AI Integration", "Prompt Engineering", "Wolf Industries", "Web Animation", "Three.js", "UI/UX Design",
];

const achievementItems = [
  "5 Years Experience", "50+ Projects", "Fast Worker", "AI-Fluent",
  "Self-Taught", "Wolf Industries", "Detail-Obsessed",
];

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: string[];
  direction: "left" | "right";
  duration: number;
}) {
  const tripled = [...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden whitespace-nowrap marquee-row">
      <div
        className="flex gap-8 marquee-content"
        style={{
          animation: `marquee${direction === "left" ? "Left" : "Right"} ${duration}s linear infinite`,
        }}
      >
        {tripled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-gold-primary/60 text-xs uppercase tracking-[0.15em] font-body">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-gold-primary/40" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div className="w-full bg-bg-surface py-3 overflow-hidden marquee-strip group">
      <MarqueeRow items={techItems} direction="left" duration={30} />
      <div className="h-3" />
      <MarqueeRow items={achievementItems} direction="right" duration={35} />
      <style>{`
        .marquee-strip:hover .marquee-content {
          animation-play-state: paused;
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
