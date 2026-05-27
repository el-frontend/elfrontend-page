"use client";

import { useArcade } from "../../context/arcade-context";
import { PxArrow, PxStar } from "../sprites/pixel";

export function AboutSection() {
  const { copy, accentColor, difficulty } = useArcade();

  return (
    <section id="about" style={{ padding: "72px 32px" }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage">
              <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.about}
            </div>
            <h2 className="sec-title">
              {copy.aboutTitle} <em style={{ color: accentColor }}>{copy.aboutTitleEm}</em>
            </h2>
            <p className="sec-sub">{copy.aboutSub}</p>
          </div>
        </div>

        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-pixel-body)",
                fontSize: 23,
                lineHeight: 1.55,
                color: "var(--ink)",
              }}
            >
              {copy.aboutBody[difficulty]}
            </p>
            <div
              style={{
                marginTop: 36,
                padding: "24px 24px 20px",
                border: "3px solid var(--ink)",
                background: "var(--paper-2)",
                boxShadow: "5px 5px 0 var(--hot-yellow)",
              }}
            >
              <div
                className="pixel-text"
                style={{
                  fontSize: 10,
                  color: "var(--hot-yellow)",
                  letterSpacing: "0.2em",
                  marginBottom: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <PxStar scale={2} /> {copy.workingOnNow}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {copy.nowList[difficulty].map((n, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                  >
                    <span
                      style={{
                        color: "var(--hot-green)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 14,
                        marginTop: 4,
                      }}
                    >
                      ▶
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-pixel-body)",
                        fontSize: 21,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                      }}
                    >
                      {n}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {copy.facts.map((f) => (
              <div
                key={f.k}
                style={{
                  padding: "18px 16px",
                  border: "3px solid var(--ink)",
                  background: "var(--paper-2)",
                }}
              >
                <div
                  className="pixel-text"
                  style={{
                    fontSize: 8,
                    color: `var(--${f.color})`,
                    letterSpacing: "0.2em",
                    marginBottom: 10,
                  }}
                >
                  {f.k}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-pixel-body)",
                    fontSize: 20,
                    color: "var(--ink)",
                  }}
                >
                  {f.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
