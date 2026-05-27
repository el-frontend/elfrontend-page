"use client";

import Image from "next/image";
import Link from "next/link";
import { useArcade } from "../../context/arcade-context";
import { PxArrow } from "../sprites/pixel";

export type ArcadeBlogPost = {
  slug: string;
  title: string;
  date: string;
  read: string;
  tag: string;
  image: string;
};

export function BlogSection({ posts }: { posts: ArcadeBlogPost[] }) {
  const { copy, accentColor } = useArcade();

  return (
    <section
      id="blog"
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
              <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.blog}
            </div>
            <h2 className="sec-title">
              {copy.blogTitle} <em style={{ color: accentColor }}>{copy.blogTitleEm}</em>
            </h2>
            <p className="sec-sub">{copy.blogSub}</p>
          </div>
          <Link
            className="px-link pixel-text"
            href="/blog"
            style={{ fontSize: 10, letterSpacing: "0.2em" }}
          >
            {copy.blogCta} <PxArrow scale={2} />
          </Link>
        </div>

        <div
          className="grid-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}
        >
          {posts.map((b, i) => (
            <Link
              key={b.slug}
              href={`/blog/${b.slug}`}
              className="pcard"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                background: "var(--paper)",
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
                  style={{ objectFit: "cover", filter: "saturate(1.05)" }}
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
                    marginTop: 16,
                    paddingTop: 12,
                    borderTop: "2px dashed var(--dim-2)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="pixel-text"
                    style={{
                      fontSize: 8,
                      color: "var(--dim)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    #{(i + 1).toString().padStart(3, "0")}
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
                    {copy.blogRead} <PxArrow scale={2} color={accentColor} />
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
