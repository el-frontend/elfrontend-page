"use client";

import { useEffect, useState } from "react";
import { playFanfare } from "../audio";
import { useArcade } from "../context/arcade-context";
import { useKonami } from "../hooks/use-konami";

export function KonamiBanner() {
  const { copy, cycleAccent } = useArcade();
  const [visible, setVisible] = useState(false);

  useKonami(() => {
    playFanfare();
    cycleAccent();
    setVisible(true);
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;
  return <div className="konami-banner">{copy.konami}</div>;
}
