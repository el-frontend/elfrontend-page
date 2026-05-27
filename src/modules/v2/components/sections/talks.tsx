"use client";

import { useArcade } from "../../context/arcade-context";
import { TALKS } from "../../content/data";
import { PxArrow } from "../sprites/pixel";

export function TalksSection() {
  const { copy, accentColor, lang } = useArcade();

  return (
    <section
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
              <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.talks}
            </div>
            <h2 className="sec-title">
              {copy.talksTitle} <em style={{ color: accentColor }}>{copy.talksTitleEm}</em>
            </h2>
            <p className="sec-sub">{copy.talksSub}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "4px solid var(--ink)",
            background: "var(--paper)",
          }}
        >
          {TALKS.map((tk, i) => (
            <a
              key={tk.id}
              href={tk.href}
              target="_blank"
              rel="noreferrer"
              className="talks-row"
              style={{
                display: "grid",
                gridTemplateColumns: "90px 110px 1fr 180px 24px",
                gap: 20,
                padding: "18px 24px",
                alignItems: "center",
                borderBottom: i < TALKS.length - 1 ? "2px dashed var(--dim-2)" : "none",
                color: "inherit",
                textDecoration: "none",
                transition: "background 0.12s steps(2)",
              }}
            >
              <div
                className="pixel-text"
                style={{
                  fontSize: 9,
                  color: `var(--${tk.color})`,
                  letterSpacing: "0.15em",
                }}
              >
                {tk.kind}
              </div>
              <div
                className="pixel-text"
                style={{
                  fontSize: 9,
                  color: "var(--dim)",
                  letterSpacing: "0.15em",
                }}
              >
                {tk.date[lang]}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-pixel-body)",
                    fontSize: 22,
                    color: "var(--ink)",
                    lineHeight: 1.3,
                  }}
                >
                  {tk.title[lang]}
                </div>
                <div
                  className="pixel-text"
                  style={{
                    fontSize: 8,
                    color: "var(--dim)",
                    letterSpacing: "0.15em",
                    marginTop: 6,
                  }}
                >
                  @ {tk.where.toUpperCase()}
                </div>
              </div>
              <div
                className="pixel-text"
                style={{
                  fontSize: 9,
                  color: "var(--ink)",
                  letterSpacing: "0.05em",
                  textAlign: "right",
                }}
              >
                {tk.meta[lang]}
              </div>
              <div style={{ color: `var(--${tk.color})`, justifySelf: "end" }}>
                <PxArrow scale={2} color={`var(--${tk.color})`} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
