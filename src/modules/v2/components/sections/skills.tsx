"use client";

import { useArcade } from "../../context/arcade-context";
import { SKILL_GROUPS } from "../../content/data";
import { PxArrow } from "../sprites/pixel";

export function SkillsSection() {
  const { copy, accentColor, lang } = useArcade();

  return (
    <section
      id="skills"
      style={{
        padding: "72px 32px",
        background: "var(--paper-2)",
        borderTop: "4px solid var(--dim-2)",
        borderBottom: "4px solid var(--dim-2)",
      }}
    >
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage">
              <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.skills}
            </div>
            <h2 className="sec-title">
              {copy.skillsTitle} <em style={{ color: accentColor }}>{copy.skillsTitleEm}</em>
            </h2>
            <p className="sec-sub">{copy.skillsSub}</p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              fontFamily: "var(--font-pixel)",
              fontSize: 9,
              letterSpacing: "0.15em",
              flexWrap: "wrap",
            }}
          >
            <Legend swatch="var(--hot-green)" label={copy.skillsLegend.mastered} />
            <Legend swatch="var(--hot-yellow)" label={copy.skillsLegend.strong} />
            <Legend swatch="var(--dim-2)" label={copy.skillsLegend.learning} />
          </div>
        </div>

        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {SKILL_GROUPS.map((g) => (
            <div
              key={g.id}
              style={{
                padding: "24px 26px",
                border: "4px solid var(--ink)",
                background: "var(--paper)",
                boxShadow: `5px 5px 0 var(--${g.color})`,
              }}
            >
              <div
                className="pixel-text"
                style={{
                  fontSize: 13,
                  color: `var(--${g.color})`,
                  letterSpacing: "0.15em",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    background: `var(--${g.color})`,
                  }}
                />
                {g.name[lang]}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {g.skills.map((s) => {
                  const bg =
                    s.level === 3
                      ? "var(--hot-green)"
                      : s.level === 2
                        ? "var(--hot-yellow)"
                        : "var(--dim-2)";
                  return (
                    <div
                      key={s.name}
                      style={{ display: "flex", alignItems: "center", gap: 14 }}
                    >
                      <div
                        style={{
                          minWidth: 120,
                          fontFamily: "var(--font-pixel-body)",
                          fontSize: 20,
                          color: "var(--ink)",
                        }}
                      >
                        {s.name}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          gap: 4,
                          height: 18,
                          background: "var(--paper-2)",
                          border: "2px solid var(--dim-2)",
                          padding: 2,
                        }}
                      >
                        {[0, 1, 2].map((slot) => (
                          <div
                            key={slot}
                            style={{
                              flex: 1,
                              background: slot < s.level ? bg : "transparent",
                              transition: "background 0.1s",
                            }}
                          />
                        ))}
                      </div>
                      <div
                        className="pixel-text"
                        style={{
                          fontSize: 9,
                          color: "var(--dim)",
                          minWidth: 36,
                          textAlign: "right",
                        }}
                      >
                        {s.years}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
      <span style={{ display: "inline-block", width: 14, height: 14, background: swatch }} />
      <span style={{ color: "var(--dim)" }}>{label}</span>
    </span>
  );
}
