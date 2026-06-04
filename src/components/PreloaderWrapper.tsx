"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handleComplete} />}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s ease" }}>
        {children}
      </div>
    </>
  );
}
