"use client";

import Link from "next/link";
import { useState } from "react";
import { useArcade } from "../../../context/arcade-context";
import { PxArrow, PxAvatar, PxSocial } from "../../../components/sprites/pixel";
import { BLOG_COPY } from "../../blog-copy";
import type { BlogPost } from "../../types";

type Props = { post: BlogPost };

export function ArticleHeader({ post }: Props) {
  const { accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];

  return (
    <header style={{ padding: "48px 32px 24px" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Link
          href="/blog"
          className="pixel-text"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 10,
            color: "var(--dim)",
            letterSpacing: "0.15em",
            padding: "8px 12px",
            border: "2px solid var(--dim-2)",
            marginBottom: 32,
          }}
        >
          <PxArrow scale={2} dir="left" /> {t.backToBlog}
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: accentColor,
              color: "#000",
              padding: "5px 10px",
              fontFamily: "var(--font-pixel)",
              fontSize: 9,
              letterSpacing: "0.2em",
              border: "3px solid #000",
            }}
          >
            {post.tag.toUpperCase()}
          </span>
          <span
            className="pixel-text"
            style={{ fontSize: 9, color: "var(--hot-yellow)", letterSpacing: "0.2em" }}
          >
            {post.date.toUpperCase()}
          </span>
          <span
            className="pixel-text"
            style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.2em" }}
          >
            ·
          </span>
          <span
            className="pixel-text"
            style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.2em" }}
          >
            {post.read} {t.readLabel}
          </span>
        </div>

        <h1
          className="pixel-text"
          style={{
            margin: 0,
            fontSize: 34,
            lineHeight: 1.3,
            letterSpacing: "0.01em",
            color: "var(--ink)",
          }}
        >
          {post.title}
        </h1>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              border: "3px solid var(--ink)",
              background: "var(--paper-2)",
              padding: 3,
              display: "inline-flex",
            }}
          >
            <PxAvatar scale={3} bg="#000" shirt={accentColor} />
          </div>
          <div>
            <div
              className="pixel-text"
              style={{
                fontSize: 11,
                color: "var(--ink)",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}
            >
              {t.byAuthor}
            </div>
            <div
              className="pixel-text"
              style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.15em" }}
            >
              {t.authorLocation}
            </div>
          </div>
          <ShareGroup slug={post.slug} title={post.title} />
        </div>
      </div>
    </header>
  );
}

function ShareGroup({ slug, title }: { slug: string; title: string }) {
  const { accentColor, lang } = useArcade();
  const t = BLOG_COPY[lang];
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : "";
  const onCopy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore — older browsers / blocked clipboard
    }
  };

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
      <ShareLink href={xUrl} label="Share on X" accent={accentColor}>
        <PxSocial id="x" scale={3} />
      </ShareLink>
      <ShareLink href={linkedinUrl} label="Share on LinkedIn" accent={accentColor}>
        <PxSocial id="linkedin" scale={3} />
      </ShareLink>
      <button
        type="button"
        onClick={onCopy}
        title={copied ? t.shareCopied : t.shareCopy}
        aria-label={copied ? t.shareCopied : t.shareCopy}
        style={{
          width: 38,
          height: 38,
          background: copied ? accentColor : "transparent",
          border: `2px solid ${copied ? accentColor : "var(--dim-2)"}`,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: copied ? "#000" : "var(--ink)",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          aria-hidden
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  );
}

function ShareLink({
  href,
  label,
  accent,
  children,
}: {
  href: string;
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={label}
      aria-label={label}
      style={{
        width: 38,
        height: 38,
        background: "transparent",
        border: "2px solid var(--dim-2)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ink)",
        // Hover handled via class would be cleaner, but inline keeps the component self-contained.
        transition: "border-color 0.12s, color 0.12s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.color = accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--dim-2)";
        e.currentTarget.style.color = "var(--ink)";
      }}
    >
      {children}
    </a>
  );
}
