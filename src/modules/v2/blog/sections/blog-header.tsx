"use client";

import Link from "next/link";
import { useArcade } from "../../context/arcade-context";
import { PxArrow } from "../../components/sprites/pixel";
import { BLOG_COPY, BLOG_STATS } from "../blog-copy";

export function BlogHeader() {
  const { copy, accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];

  return (
    <section style={{ padding: "56px 32px 24px" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            className="pixel-text"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 10,
              color: "var(--dim)",
              letterSpacing: "0.15em",
              padding: "8px 12px",
              border: "2px solid var(--dim-2)",
            }}
          >
            <PxArrow scale={2} dir="left" /> {t.backHome}
          </Link>
          <span
            className="pixel-text"
            style={{
              fontSize: 9,
              color: "var(--hot-yellow)",
              letterSpacing: "0.25em",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.blog}
          </span>
        </div>

        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 48,
            alignItems: "end",
            marginBottom: 48,
            marginTop: 32,
          }}
        >
          <div>
            <h1
              className="pixel-text"
              style={{
                margin: 0,
                fontSize: 48,
                lineHeight: 1.15,
                color: "var(--ink)",
                letterSpacing: "0.02em",
              }}
            >
              {t.pageTitle}{" "}
              <em style={{ fontStyle: "normal", color: accentColor }}>{t.pageTitleEm}</em>
            </h1>
            <p
              style={{
                margin: "22px 0 0",
                fontFamily: "var(--font-pixel-body)",
                fontSize: 24,
                color: "var(--dim)",
                lineHeight: 1.4,
                maxWidth: 560,
              }}
            >
              {t.pageSub}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {BLOG_STATS.map((s) => (
              <div
                key={s.key}
                style={{
                  padding: "14px 16px",
                  border: "3px solid var(--ink)",
                  background: "var(--paper-2)",
                }}
              >
                <div
                  className="pixel-text"
                  style={{
                    fontSize: 18,
                    color: `var(--${s.color})`,
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.val}
                </div>
                <div
                  className="pixel-text"
                  style={{
                    fontSize: 7,
                    color: "var(--dim)",
                    letterSpacing: "0.2em",
                    marginTop: 8,
                  }}
                >
                  {t[s.key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
