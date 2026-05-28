"use client";

import { useState } from "react";
import { playPowerUp, playType } from "../../audio";
import { useArcade } from "../../context/arcade-context";
import { PxArrow, PxHeart, PxStar } from "../../components/sprites/pixel";
import { BLOG_COPY } from "../blog-copy";

export function Newsletter() {
  const { accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!email) return;
    playPowerUp();
    setDone(true);
  };

  return (
    <section style={{ padding: "40px 32px 80px" }}>
      <div className="container">
        <div
          className="grid-2"
          style={{
            position: "relative",
            padding: "40px 36px",
            border: "4px solid var(--ink)",
            background: `linear-gradient(135deg, ${accentColor}22 0%, transparent 60%), var(--paper-2)`,
            boxShadow: `8px 8px 0 ${accentColor}`,
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 36,
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "flex",
              gap: 6,
            }}
          >
            <PxStar scale={2} color={accentColor} />
            <PxStar scale={2} color="var(--hot-yellow)" />
            <PxStar scale={2} color={accentColor} />
          </div>

          <div>
            <div
              className="pixel-text"
              style={{
                display: "inline-block",
                fontSize: 9,
                color: "#000",
                letterSpacing: "0.2em",
                background: "var(--hot-yellow)",
                padding: "5px 10px",
                border: "3px solid #000",
                marginBottom: 18,
              }}
            >
              ★ {t.newsletterTag}
            </div>
            <h2
              className="pixel-text"
              style={{
                margin: 0,
                fontSize: 22,
                color: "var(--ink)",
                lineHeight: 1.4,
                letterSpacing: "0.02em",
              }}
            >
              {t.newsletterTitle}
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontFamily: "var(--font-pixel-body)",
                fontSize: 21,
                lineHeight: 1.4,
                color: "var(--dim)",
              }}
            >
              {t.newsletterSub}
            </p>
            <div
              className="pixel-text"
              style={{
                fontSize: 9,
                color: accentColor,
                letterSpacing: "0.18em",
                marginTop: 18,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <PxHeart scale={2} /> {t.newsletterFoot}
            </div>
          </div>

          {done ? (
            <div
              style={{
                padding: 24,
                border: "3px solid var(--hot-green)",
                background: "#000",
                textAlign: "center",
              }}
            >
              <div style={{ display: "inline-flex", gap: 8, marginBottom: 14 }}>
                <PxStar scale={3} />
                <PxStar scale={3} />
                <PxStar scale={3} />
              </div>
              <div
                className="pixel-text"
                style={{
                  fontSize: 13,
                  color: "var(--hot-green)",
                  letterSpacing: "0.1em",
                  marginBottom: 10,
                }}
              >
                {t.newsletterDoneTag}
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-pixel-body)",
                  fontSize: 19,
                  color: "var(--ink)",
                }}
              >
                {t.newsletterDoneMsg}
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key.length === 1) playType();
                }}
                placeholder={t.newsletterPlaceholder}
                aria-label="Email"
                style={{
                  background: "#000",
                  color: "var(--ink)",
                  border: "4px solid var(--ink)",
                  padding: "14px 16px",
                  fontFamily: "var(--font-pixel-body)",
                  fontSize: 22,
                  outline: "none",
                  caretColor: accentColor,
                  width: "100%",
                }}
              />
              <button
                type="submit"
                style={{
                  background: accentColor,
                  color: "#000",
                  border: "4px solid var(--ink)",
                  padding: "14px 26px",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  boxShadow: "4px 4px 0 var(--brand-deep)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <PxArrow scale={2} color="#000" /> {t.newsletterCta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
