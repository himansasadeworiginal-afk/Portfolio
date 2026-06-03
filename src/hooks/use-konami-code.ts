"use client";

import { useEffect, useCallback } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function useKonamiCode(onActivate: () => void) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (typeof window === "undefined") return;
      if (!(window as any).__konamiSequence) {
        (window as any).__konamiSequence = [];
      }
      const seq: string[] = (window as any).__konamiSequence;
      seq.push(e.key);
      if (seq.length > KONAMI.length) seq.shift();
      if (seq.length === KONAMI.length && seq.every((k, i) => k === KONAMI[i])) {
        seq.length = 0;
        onActivate();
      }
    },
    [onActivate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
