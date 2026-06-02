"use client";

import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

const GOLD_COLORS = ["#D4AF37", "#F5D060", "#A8862A", "#FFD700", "#FFC125"];

export default function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;

    const newPieces: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 30,
      y: 40,
      vx: (Math.random() - 0.5) * 12,
      vy: -(Math.random() * 10 + 5),
      size: Math.random() * 6 + 4,
      color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));

    const interval = setInterval(() => {
      setPieces((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 0.016,
            y: p.y + p.vy * 0.016,
            vy: p.vy + 200 * 0.016,
            rotation: p.rotation + p.rotationSpeed,
          }))
          .filter((p) => p.y < 120);

        if (updated.length === 0) {
          clearInterval(interval);
        }
        return updated.length > 0 ? updated : prev;
      });
    }, 16);

    const timeout = setTimeout(() => {
      setPieces(newPieces);
    }, 0);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      setPieces([]);
    };
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
}
