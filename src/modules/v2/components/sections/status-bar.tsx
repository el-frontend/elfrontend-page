"use client";

import { playClick } from "../../audio";
import { useArcade } from "../../context/arcade-context";
import type { Lang } from "../../content/copy";
import { PxHeart, PxStar } from "../sprites/pixel";

const tinyBtn: React.CSSProperties = {
  background: "transparent",
  border: "2px solid var(--dim-2)",
  color: "var(--ink)",
  padding: "5px 9px",
  fontFamily: "var(--font-pixel)",
  fontSize: 9,
  letterSpacing: "0.1em",
  cursor: "pointer",
};

export function StatusBar() {
  const { copy, lang, setLang, sound, setSound, crt, setCrt } = useArcade();
  const lives = 3;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        flexWrap: "wrap",
        padding: "10px 24px",
        background: "#000",
        borderBottom: "4px solid var(--brand)",
        fontFamily: "var(--font-pixel)",
        fontSize: 10,
        color: "var(--ink)",
        position: "sticky",
        top: 0,
        zIndex: 80,
      }}
    >
      <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
        <PxStar scale={2} />
        <PxStar scale={2} />
        <PxStar scale={2} />
      </span>
      <span>1-PLAYER</span>
      <span style={{ color: "var(--dim-2)" }}>·</span>
      <span style={{ color: "var(--hot-green)" }}>HI: 99,999</span>
      <span style={{ color: "var(--dim-2)" }}>·</span>
      <span>{copy.stages.home}</span>

      <span style={{ marginLeft: "auto", display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
          {Array.from({ length: lives }).map((_, i) => (
            <PxHeart key={i} scale={2} />
          ))}
        </span>

        <button
          onClick={() => {
            // Play before flipping so a "sound: off" → "on" still chirps.
            playClick();
            setSound(!sound);
          }}
          style={tinyBtn}
          type="button"
        >
          {copy.soundLabel}:
          <span style={{ color: sound ? "var(--hot-green)" : "var(--hot-red)", marginLeft: 6 }}>
            {sound ? copy.onOff.on : copy.onOff.off}
          </span>
        </button>

        <button
          onClick={() => {
            playClick();
            setCrt(!crt);
          }}
          style={tinyBtn}
          type="button"
        >
          {copy.crtLabel}:
          <span style={{ color: crt ? "var(--hot-green)" : "var(--hot-red)", marginLeft: 6 }}>
            {crt ? copy.onOff.on : copy.onOff.off}
          </span>
        </button>

        <span style={{ display: "inline-flex", border: "2px solid var(--ink)" }}>
          {(["en", "es"] as Lang[]).map((c) => (
            <button
              key={c}
              onClick={() => {
                playClick();
                setLang(c);
              }}
              style={{
                background: lang === c ? "var(--brand)" : "transparent",
                color: lang === c ? "#000" : "var(--ink)",
                border: 0,
                padding: "5px 10px",
                fontFamily: "var(--font-pixel)",
                fontSize: 9,
                letterSpacing: "0.08em",
                cursor: "pointer",
              }}
              type="button"
            >
              {c.toUpperCase()}
            </button>
          ))}
        </span>
      </span>
    </div>
  );
}
