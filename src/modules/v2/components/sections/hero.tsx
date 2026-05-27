"use client";

import { useArcade } from "../../context/arcade-context";
import { PxAvatar } from "../sprites/pixel";
import { HeroChat } from "./hero-chat";

export function HeroSection() {
  const { copy, accentColor, difficulty } = useArcade();

  return (
    <section id="home" style={{ padding: "56px 32px 64px", position: "relative" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            className="pixel-text"
            style={{
              fontSize: 11,
              color: "var(--hot-yellow)",
              letterSpacing: "0.3em",
              marginBottom: 14,
            }}
          >
            ► {copy.greeting.toUpperCase()}
          </div>
          <h1
            className="pixel-text"
            style={{
              margin: 0,
              fontSize: 38,
              lineHeight: 1.4,
              color: "var(--ink)",
              letterSpacing: "0.02em",
            }}
          >
            {copy.typeLine}{" "}
            <span style={{ color: accentColor }}>{copy.typeAccent}</span>
            <span
              className="arcade-blink"
              style={{
                display: "inline-block",
                width: 24,
                height: 38,
                background: accentColor,
                verticalAlign: "-8px",
                marginLeft: 8,
              }}
            />
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                border: "5px solid var(--ink)",
                background: "var(--paper-2)",
                display: "inline-block",
                boxShadow: "6px 6px 0 0 var(--brand-deep)",
              }}
            >
              <PxAvatar scale={7} bg="#1d1438" shirt={accentColor} />
            </div>
            <span
              style={{
                position: "absolute",
                top: -14,
                right: -22,
                background: "var(--hot-green)",
                color: "#000",
                fontFamily: "var(--font-pixel)",
                fontSize: 9,
                padding: "5px 8px",
                letterSpacing: "0.15em",
                border: "3px solid #000",
                transform: "rotate(8deg)",
              }}
            >
              LV. 34
            </span>
            <div
              style={{
                marginTop: 14,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
              }}
            >
              <div
                className="pixel-text"
                style={{ fontSize: 8, color: "var(--ink)", letterSpacing: "0.15em" }}
              >
                HP <span style={{ color: "var(--hot-green)" }}>████████</span>
                <span style={{ color: "var(--dim-2)" }}>██</span>
              </div>
              <div
                className="pixel-text"
                style={{ fontSize: 8, color: "var(--ink)", letterSpacing: "0.15em" }}
              >
                MP <span style={{ color: "var(--hot-blue)" }}>██████</span>
                <span style={{ color: "var(--dim-2)" }}>████</span>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 520 }}>
            <div
              className="pixel-text"
              style={{
                fontSize: 11,
                color: accentColor,
                letterSpacing: "0.15em",
                marginBottom: 10,
              }}
            >
              {copy.name.toUpperCase()}
            </div>
            <div
              className="pixel-text"
              style={{
                fontSize: 9,
                color: "var(--dim)",
                letterSpacing: "0.15em",
                marginBottom: 18,
              }}
            >
              {copy.handle} · LA HABANA, CU
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-pixel-body)",
                fontSize: 24,
                lineHeight: 1.45,
                color: "var(--ink)",
              }}
            >
              {copy.intro[difficulty]}
            </p>
          </div>
        </div>

        <HeroChat />
      </div>
    </section>
  );
}
