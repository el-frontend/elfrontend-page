"use client";

import { useArcade } from "../../context/arcade-context";
import { SOCIALS } from "../../content/data";
import { PxCoin, PxController, PxFloppy, PxSocial, PxStar } from "../sprites/pixel";

export function ArcadeFooter() {
  const { copy } = useArcade();
  return (
    <footer style={{ padding: "40px 32px 32px" }}>
      <div
        className="container grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "inline-flex", gap: 5 }}>
            <PxStar scale={2} />
            <PxStar scale={2} />
            <PxStar scale={2} />
          </span>
          <span
            className="pixel-text"
            style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.18em" }}
          >
            {copy.footerLeft}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 20, alignItems: "center" }}>
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.label}
              aria-label={s.label}
              style={{ color: "var(--ink)", display: "inline-flex" }}
            >
              <PxSocial id={s.id} scale={3} />
            </a>
          ))}
        </div>

        <div
          className="pixel-text footer-right"
          style={{
            fontSize: 9,
            color: "var(--dim)",
            letterSpacing: "0.18em",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          {copy.footerRight} <PxCoin scale={3} />
        </div>
      </div>

      <div
        className="container"
        style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "4px dashed var(--dim-2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <div
          className="pixel-text"
          style={{
            fontSize: 9,
            color: "var(--dim)",
            letterSpacing: "0.18em",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <PxController scale={2} /> {copy.cheatLabel}:{" "}
          <span style={{ color: "var(--hot-yellow)" }}>{copy.cheatHint}</span>
        </div>
        <div
          className="pixel-text"
          style={{
            fontSize: 9,
            color: "var(--dim)",
            letterSpacing: "0.18em",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <PxFloppy scale={2} /> {copy.footerBuilt}
        </div>
      </div>
    </footer>
  );
}
