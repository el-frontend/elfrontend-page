"use client";

import type { Dispatch, SetStateAction } from "react";
import { useArcade } from "../../context/arcade-context";
import { BLOG_COPY, BLOG_TAGS_EN, BLOG_TAGS_ES } from "../blog-copy";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  tag: string;
  setTag: Dispatch<SetStateAction<string>>;
  sort: "newest" | "popular";
  setSort: Dispatch<SetStateAction<"newest" | "popular">>;
  count: number;
};

export function BlogToolbar({ query, setQuery, tag, setTag, sort, setSort, count }: Props) {
  const { accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];
  const tags = lang === "en" ? BLOG_TAGS_EN : BLOG_TAGS_ES;
  const allKey = tags[0]; // ALL / TODO sentinel

  return (
    <section style={{ padding: "0 32px 28px" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              border: "3px solid var(--ink)",
              background: "#000",
              padding: "4px 4px 4px 14px",
              minWidth: 280,
              flex: "1 1 280px",
              maxWidth: 420,
            }}
          >
            <span style={{ color: accentColor, marginRight: 10, display: "inline-flex" }}>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.filterPlaceholder}
              aria-label={t.filterPlaceholder}
              style={{
                flex: 1,
                background: "transparent",
                border: 0,
                outline: "none",
                color: "var(--ink)",
                fontFamily: "var(--font-pixel-body)",
                fontSize: 21,
                padding: "10px 0",
                caretColor: accentColor,
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                style={{
                  background: "transparent",
                  border: 0,
                  color: "var(--dim)",
                  padding: "8px 12px",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <span
              className="pixel-text"
              style={{ fontSize: 10, color: "var(--dim)", letterSpacing: "0.18em" }}
            >
              <span style={{ color: accentColor }}>{count.toString().padStart(2, "0")}</span>{" "}
              {t.postsCount}
            </span>
            <div style={{ display: "inline-flex", border: "3px solid var(--dim-2)" }}>
              {(["newest", "popular"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSort(s)}
                  style={{
                    background: sort === s ? accentColor : "transparent",
                    color: sort === s ? "#000" : "var(--dim)",
                    border: 0,
                    padding: "8px 14px",
                    fontFamily: "var(--font-pixel)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                  }}
                >
                  {s === "newest" ? t.sortNewest : t.sortPopular}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 18,
          }}
        >
          <span
            className="pixel-text"
            style={{
              fontSize: 9,
              color: "var(--dim)",
              letterSpacing: "0.2em",
              marginRight: 8,
            }}
          >
            {t.tagsLabel}:
          </span>
          {tags.map((tg) => {
            const active = tag === tg || (tg === allKey && tag === "ALL");
            return (
              <button
                key={tg}
                type="button"
                onClick={() => setTag(tg === allKey ? "ALL" : tg)}
                style={{
                  background: active ? accentColor : "transparent",
                  color: active ? "#000" : "var(--ink)",
                  border: `2px solid ${active ? accentColor : "var(--dim-2)"}`,
                  padding: "7px 12px",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                  transition: "border-color 0.12s",
                }}
              >
                {tg}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
