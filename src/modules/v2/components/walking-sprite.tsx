"use client";

import { useEffect, useState } from "react";
import { useArcade } from "../context/arcade-context";
import { PxWalker } from "./sprites/pixel";

export function WalkingSprite() {
  const { accentColor } = useArcade();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setFrame((f) => f + 1), 220);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="walker">
      <PxWalker frame={frame} accent={accentColor} scale={4} />
    </div>
  );
}
