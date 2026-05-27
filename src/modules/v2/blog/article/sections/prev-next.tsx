"use client";

import Link from "next/link";
import { useArcade } from "../../../context/arcade-context";
import { PxArrow } from "../../../components/sprites/pixel";
import { BLOG_COPY } from "../../blog-copy";
import type { BlogPost } from "../../types";

type Props = { prev: BlogPost | null; next: BlogPost | null };

export function PrevNext({ prev, next }: Props) {
  const { lang } = useArcade();
  const t = BLOG_COPY[lang];

  if (!prev && !next) return null;

  return (
    <div style={{ padding: "24px 32px 24px" }}>
      <div className="container" style={{ maxWidth: 1040 }}>
        <div
          className="grid-2"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          {prev ? <Card post={prev} dir="prev" label={t.prev} /> : <div />}
          {next ? <Card post={next} dir="next" label={t.next} /> : <div />}
        </div>
      </div>
    </div>
  );
}

function Card({ post, dir, label }: { post: BlogPost; dir: "prev" | "next"; label: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="pcard"
      style={{
        padding: "20px 22px",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        textAlign: dir === "next" ? "right" : "left",
      }}
    >
      <div
        className="pixel-text"
        style={{
          fontSize: 9,
          color: "var(--dim)",
          letterSpacing: "0.2em",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          justifyContent: dir === "next" ? "flex-end" : "flex-start",
        }}
      >
        {dir === "prev" ? (
          <>
            <PxArrow scale={2} dir="left" color="var(--dim)" /> {label}
          </>
        ) : (
          <>
            {label} <PxArrow scale={2} color="var(--dim)" />
          </>
        )}
      </div>
      <div
        style={{
          fontFamily: "var(--font-pixel-body)",
          fontSize: 20,
          color: "var(--ink)",
          lineHeight: 1.3,
        }}
      >
        {post.title}
      </div>
    </Link>
  );
}
