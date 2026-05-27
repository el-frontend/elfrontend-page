"use client";

import Image from "next/image";
import Link from "next/link";
import { useArcade } from "../../context/arcade-context";
import { PxArrow, PxHeart, PxStar } from "../../components/sprites/pixel";
import { BLOG_COPY } from "../blog-copy";
import type { BlogPost } from "../types";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const { accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];

  if (posts.length === 0) {
    return (
      <section style={{ padding: "40px 32px 60px" }}>
        <div
          className="container"
          style={{
            textAlign: "center",
            padding: "60px 24px",
            border: "4px dashed var(--dim-2)",
          }}
        >
          <div style={{ display: "inline-flex", gap: 12, marginBottom: 18, opacity: 0.7 }}>
            <PxStar scale={3} color="var(--dim)" />
            <PxStar scale={3} color="var(--dim)" />
            <PxStar scale={3} color="var(--dim)" />
          </div>
          <div
            className="pixel-text"
            style={{
              fontSize: 16,
              color: "var(--ink)",
              letterSpacing: "0.1em",
              marginBottom: 12,
            }}
          >
            {t.noResults}
          </div>
          <div
            className="pixel-text"
            style={{
              fontSize: 9,
              color: "var(--dim)",
              letterSpacing: "0.18em",
            }}
          >
            {t.noResultsHint}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: "8px 32px 60px" }}>
      <div className="container">
        <div
          className="grid-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}
        >
          {posts.map((b, i) => (
            <Link
              key={b.id}
              href={`/blog/${b.slug}`}
              className="pcard"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                background: "var(--paper-2)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  background: "#000",
                  borderBottom: "3px solid var(--ink)",
                }}
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(max-width: 880px) 100vw, 380px"
                  style={{ objectFit: "cover", filter: "saturate(1.1)" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    background: "#000",
                    color: "var(--hot-yellow)",
                    padding: "4px 7px",
                    fontFamily: "var(--font-pixel)",
                    fontSize: 8,
                    letterSpacing: "0.15em",
                    border: "2px solid var(--hot-yellow)",
                  }}
                >
                  {b.tag.toUpperCase()}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: accentColor,
                    color: "#000",
                    padding: "4px 7px",
                    fontFamily: "var(--font-pixel)",
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    border: "2px solid #000",
                  }}
                >
                  #{(i + 1).toString().padStart(3, "0")}
                </div>
              </div>
              <div
                style={{
                  padding: "18px 18px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="pixel-text"
                  style={{
                    fontSize: 8,
                    color: "var(--dim)",
                    letterSpacing: "0.18em",
                    marginBottom: 10,
                  }}
                >
                  {b.date.toUpperCase()} · {b.read}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-pixel-body)",
                    fontSize: 22,
                    lineHeight: 1.25,
                    color: "var(--ink)",
                    flex: 1,
                  }}
                >
                  {b.title}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 12,
                    borderTop: "2px dashed var(--dim-2)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <PxHeart scale={1} color="var(--hot-pink)" />
                    <span
                      className="pixel-text"
                      style={{
                        fontSize: 8,
                        color: "var(--dim)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {b.likes}
                    </span>
                  </span>
                  <span
                    className="pixel-text"
                    style={{
                      fontSize: 9,
                      color: accentColor,
                      letterSpacing: "0.15em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {t.readingTime} <PxArrow scale={2} color={accentColor} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
