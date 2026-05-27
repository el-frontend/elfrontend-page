"use client";

import { useArcade } from "../../context/arcade-context";
import { STATS } from "../../content/data";

export function StatsStrip() {
  const { copy } = useArcade();
  return (
    <section
      style={{
        borderTop: "4px solid var(--brand)",
        borderBottom: "4px solid var(--brand)",
        background: "var(--paper-2)",
      }}
    >
      <div className="container" style={{ padding: 0 }}>
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div
              key={s.key}
              style={{
                padding: "28px 24px",
                textAlign: "center",
                borderRight: i < 3 ? "2px dashed var(--dim-2)" : "none",
              }}
            >
              <div
                className="pixel-text"
                style={{
                  fontSize: 32,
                  color: `var(--${s.color})`,
                  letterSpacing: "0.04em",
                }}
              >
                {s.val}
              </div>
              <div
                className="pixel-text"
                style={{
                  fontSize: 9,
                  color: "var(--dim)",
                  marginTop: 12,
                  letterSpacing: "0.2em",
                }}
              >
                {copy.statsLabels[s.key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
