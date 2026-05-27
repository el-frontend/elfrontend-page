"use client";

import Image from "next/image";
import Link from "next/link";
import { useArcade } from "../../context/arcade-context";
import { PxArrow, PxAvatar } from "../../components/sprites/pixel";
import { BLOG_COPY } from "../blog-copy";
import type { BlogPost } from "../types";

export function FeaturedPost({ post }: { post: BlogPost }) {
  const { accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];

  return (
    <section style={{ padding: "0 32px 56px" }}>
      <div className="container">
        <Link
          href={`/blog/${post.slug}`}
          className="pcard"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 0,
            textDecoration: "none",
            color: "inherit",
            background: "var(--paper-2)",
            boxShadow: `8px 8px 0 0 ${accentColor}`,
          }}
        >
          <div
            style={{
              position: "relative",
              borderRight: "3px solid var(--ink)",
              overflow: "hidden",
              minHeight: 340,
            }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 880px) 100vw, 600px"
              style={{ objectFit: "cover", filter: "saturate(1.15)" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: accentColor,
                color: "#000",
                padding: "6px 10px",
                fontFamily: "var(--font-pixel)",
                fontSize: 9,
                letterSpacing: "0.2em",
                border: "3px solid #000",
              }}
            >
              ★ {t.featured}
            </div>
          </div>
          <div
            style={{
              padding: "32px 32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: "#000",
                  color: "var(--hot-yellow)",
                  padding: "5px 9px",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  border: "2px solid var(--hot-yellow)",
                }}
              >
                {post.tag.toUpperCase()}
              </span>
              <span
                className="pixel-text"
                style={{
                  fontSize: 9,
                  color: "var(--dim)",
                  letterSpacing: "0.15em",
                }}
              >
                {post.date.toUpperCase()} · {post.read}
              </span>
            </div>
            <h2
              style={{
                margin: "14px 0 8px",
                fontFamily: "var(--font-pixel-body)",
                fontSize: 36,
                lineHeight: 1.2,
                color: "var(--ink)",
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-pixel-body)",
                fontSize: 21,
                color: "var(--dim)",
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              {post.description}
            </p>
            <div
              style={{
                marginTop: 14,
                paddingTop: 14,
                borderTop: "3px dashed var(--dim-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    border: "2px solid var(--ink)",
                    background: "var(--paper)",
                    padding: 2,
                  }}
                >
                  <PxAvatar scale={1} bg="#000" shirt={accentColor} />
                </div>
                <span
                  className="pixel-text"
                  style={{
                    fontSize: 9,
                    color: "var(--ink)",
                    letterSpacing: "0.1em",
                  }}
                >
                  CARLOS · @ELFRONTEND
                </span>
              </div>
              <span
                className="pixel-text"
                style={{
                  fontSize: 10,
                  color: accentColor,
                  letterSpacing: "0.15em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {t.readingTime} <PxArrow scale={2} color={accentColor} />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
