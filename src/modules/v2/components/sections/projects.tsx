"use client";

import { useArcade } from "../../context/arcade-context";
import { PROJECTS } from "../../content/data";
import { PxArrow } from "../sprites/pixel";

export function ProjectsSection() {
  const { copy, accentColor, lang } = useArcade();

  return (
    <section id="projects" style={{ padding: "72px 32px" }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage">
              <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.projects}
            </div>
            <h2 className="sec-title">
              {copy.projectsTitle} <em style={{ color: accentColor }}>{copy.projectsTitleEm}</em>
            </h2>
            <p className="sec-sub">{copy.projectsSub}</p>
          </div>
        </div>

        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="pcard"
              style={{
                padding: "28px 26px 24px",
                textDecoration: "none",
                color: "inherit",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -3,
                  right: -3,
                  background: `var(--${p.color})`,
                  color: "#000",
                  padding: "5px 10px",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  borderLeft: "3px solid var(--ink)",
                  borderBottom: "3px solid var(--ink)",
                }}
              >
                {p.tag[lang]}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 16,
                  marginBottom: 18,
                }}
              >
                <div
                  className="pixel-text"
                  style={{ fontSize: 18, color: "var(--ink)", letterSpacing: "0.02em" }}
                >
                  {p.name}
                </div>
                <div
                  className="pixel-text"
                  style={{
                    fontSize: 9,
                    color: "var(--dim)",
                    letterSpacing: "0.15em",
                    marginTop: 4,
                  }}
                >
                  {p.year}
                </div>
              </div>
              <p
                style={{
                  margin: "0 0 22px",
                  fontFamily: "var(--font-pixel-body)",
                  fontSize: 21,
                  lineHeight: 1.4,
                  color: "var(--dim)",
                }}
              >
                {p.desc[lang]}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: 8,
                      letterSpacing: "0.1em",
                      padding: "5px 8px",
                      border: `2px solid var(--${p.color})`,
                      color: "var(--ink)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div
                style={{
                  marginTop: 22,
                  paddingTop: 14,
                  borderTop: "2px dashed var(--dim-2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  className="pixel-text"
                  style={{
                    fontSize: 9,
                    color: "var(--dim)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {(i + 1).toString().padStart(2, "0")} / 0{PROJECTS.length}
                </span>
                <span
                  className="pixel-text"
                  style={{
                    fontSize: 9,
                    color: `var(--${p.color})`,
                    letterSpacing: "0.15em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {copy.projectsVisit} <PxArrow scale={2} color={`var(--${p.color})`} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
