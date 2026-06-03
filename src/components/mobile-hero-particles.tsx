"use client";

export default function MobileHeroParticles() {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gold-primary/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `mobileParticle${i % 4} ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
        />
      ))}
      <style>{`
        @keyframes mobileParticle0 {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translate(${40 + Math.random() * 60}px, ${-20 - Math.random() * 40}px) scale(0); opacity: 0; }
        }
        @keyframes mobileParticle1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translate(${-30 - Math.random() * 50}px, ${20 + Math.random() * 40}px) scale(0); opacity: 0; }
        }
        @keyframes mobileParticle2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translate(${20 + Math.random() * 40}px, ${30 + Math.random() * 50}px) scale(0); opacity: 0; }
        }
        @keyframes mobileParticle3 {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translate(${-40 - Math.random() * 60}px, ${-30 - Math.random() * 40}px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
