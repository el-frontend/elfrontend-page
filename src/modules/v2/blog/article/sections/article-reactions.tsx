"use client";

import { useState } from "react";
import { useArcade } from "../../../context/arcade-context";
import { PxCoin, PxHeart, PxStar } from "../../../components/sprites/pixel";
import { BLOG_COPY } from "../../blog-copy";

type ReactionId = "love" | "learn" | "meh";

export function ArticleReactions() {
  const { accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];
  const [chosen, setChosen] = useState<ReactionId | null>(null);

  const reactions: Array<{ id: ReactionId; icon: React.ReactNode; label: string }> = [
    { id: "love", icon: <PxHeart scale={2} color="var(--hot-pink)" />, label: t.rateLoved },
    { id: "learn", icon: <PxStar scale={2} color="var(--hot-yellow)" />, label: t.rateLearned },
    { id: "meh", icon: <PxCoin scale={2} />, label: t.rateOk },
  ];

  return (
    <div style={{ padding: "24px 32px 8px" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div
          style={{
            padding: "24px",
            border: "3px solid var(--ink)",
            background: "var(--paper-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              className="pixel-text"
              style={{
                fontSize: 10,
                color: accentColor,
                letterSpacing: "0.18em",
                marginBottom: 10,
              }}
            >
              {t.ratePost}
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel-body)",
                fontSize: 20,
                color: "var(--dim)",
              }}
            >
              {chosen ? t.rateThanks : t.rateNoLogin}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {reactions.map((r) => {
              const active = chosen === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setChosen(r.id)}
                  style={{
                    background: active ? accentColor : "transparent",
                    color: active ? "#000" : "var(--ink)",
                    border: `3px solid ${active ? accentColor : "var(--dim-2)"}`,
                    padding: "12px 14px",
                    cursor: "pointer",
                    fontFamily: "var(--font-pixel)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {r.icon} {r.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
