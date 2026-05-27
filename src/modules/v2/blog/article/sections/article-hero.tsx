"use client";

import Image from "next/image";
import type { BlogPost } from "../../types";

export function ArticleHero({ post }: { post: BlogPost }) {
  return (
    <div style={{ padding: "24px 32px 32px" }}>
      <div className="container" style={{ maxWidth: 1040 }}>
        <div
          style={{
            position: "relative",
            aspectRatio: "21/9",
            overflow: "hidden",
            border: "4px solid var(--ink)",
            background: "#000",
            boxShadow: "8px 8px 0 var(--brand-deep)",
          }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1040px) 100vw, 1040px"
            style={{ objectFit: "cover", filter: "saturate(1.15)" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)",
              pointerEvents: "none",
            }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
