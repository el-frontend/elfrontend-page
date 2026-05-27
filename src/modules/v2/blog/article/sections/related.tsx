"use client";

import Image from "next/image";
import Link from "next/link";
import { useArcade } from "../../../context/arcade-context";
import { PxArrow } from "../../../components/sprites/pixel";
import { BLOG_COPY } from "../../blog-copy";
import type { BlogPost } from "../../types";

export function Related({ posts }: { posts: BlogPost[] }) {
  const { accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];

  if (posts.length === 0) return null;

  return (
    <section style={{ padding: "48px 32px 32px" }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage">
              <PxArrow scale={2} color="var(--hot-yellow)" /> {t.keepReading}
            </div>
            <h2 className="sec-title">
              {t.relatedTitle} <em style={{ color: accentColor }}>{t.relatedTitleEm}</em>
            </h2>
          </div>
        </div>
        <div
          className="grid-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}
        >
          {posts.slice(0, 3).map((b) => (
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
                  borderBottom: "3px solid var(--ink)",
                }}
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(max-width: 880px) 100vw, 380px"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 3px)",
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
              </div>
              <div style={{ padding: "16px 18px" }}>
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
                    fontSize: 21,
                    lineHeight: 1.25,
                    color: "var(--ink)",
                  }}
                >
                  {b.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
