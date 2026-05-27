"use client";

import { useEffect, useState } from "react";
import { useArcade } from "../../context/arcade-context";

export function ReadingProgress() {
  const { accentColor } = useArcade();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        background: "rgba(0,0,0,0.6)",
        borderBottom: "2px solid var(--ink)",
        zIndex: 90,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `repeating-linear-gradient(90deg, ${accentColor} 0 8px, transparent 8px 10px)`,
          transition: "width 0.08s linear",
        }}
      />
    </div>
  );
}
