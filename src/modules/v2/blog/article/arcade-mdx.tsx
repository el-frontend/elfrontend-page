"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { MDXContent } from "@/components/mdx-component";
import Mermaid from "@/components/mermaid";
import { PxArrow } from "../../components/sprites/pixel";

// MDX → arcade-themed pixel components.

const findMermaidCode = (children: ReactNode): string | null => {
  const visit = (node: ReactNode): string | null => {
    if (Array.isArray(node)) {
      for (const child of node) {
        const m = visit(child);
        if (m) return m;
      }
      return null;
    }
    if (!node || typeof node !== "object") return null;
    const el = node as { props?: { children?: ReactNode; "data-language"?: string } };
    if (!el.props) return null;
    if (el.props["data-language"]?.includes("mermaid")) {
      const extract = (n: ReactNode): string => {
        if (typeof n === "string" || typeof n === "number") return String(n);
        if (Array.isArray(n)) return n.map(extract).join("");
        if (n && typeof n === "object" && "props" in n) {
          const p = (n as { props?: { children?: ReactNode } }).props;
          return extract(p?.children);
        }
        return "";
      };
      const code = extract(el.props.children).trim();
      return code.length ? code : null;
    }
    return visit(el.props.children);
  };
  return visit(children);
};

const headingStyle = (size: number): React.CSSProperties => ({
  margin: "32px 0 8px",
  fontFamily: "var(--font-pixel)",
  fontSize: size,
  lineHeight: 1.4,
  letterSpacing: "0.02em",
  color: "var(--brand)",
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const arcadeComponents = {
  h1: ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 style={headingStyle(22)} {...rest}>
      <span style={{ display: "inline-block", width: 14, height: 14, background: "var(--brand)" }} />
      {children}
    </h1>
  ),
  h2: ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={headingStyle(18)} {...rest}>
      <span style={{ display: "inline-block", width: 14, height: 14, background: "var(--brand)" }} />
      {children}
    </h2>
  ),
  h3: ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 style={{ ...headingStyle(14), color: "var(--hot-yellow)" }} {...rest}>
      <span
        style={{ display: "inline-block", width: 10, height: 10, background: "var(--hot-yellow)" }}
      />
      {children}
    </h3>
  ),
  h4: ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 style={{ ...headingStyle(12), color: "var(--hot-yellow)" }} {...rest}>
      {children}
    </h4>
  ),
  p: ({ children, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        margin: 0,
        fontFamily: "var(--font-pixel-body)",
        fontSize: 23,
        lineHeight: 1.6,
        color: "var(--ink)",
      }}
      {...rest}
    >
      {children}
    </p>
  ),
  a: ({ children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      target="_blank"
      rel="noreferrer"
      style={{
        color: "var(--brand)",
        borderBottom: "3px solid var(--brand)",
        paddingBottom: 1,
      }}
      {...rest}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...rest }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
      {...rest}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...rest }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        counterReset: "arcade-li",
      }}
      {...rest}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...rest }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      style={{
        display: "flex",
        gap: 14,
        fontFamily: "var(--font-pixel-body)",
        fontSize: 22,
        lineHeight: 1.5,
        color: "var(--ink)",
      }}
      {...rest}
    >
      <span style={{ flexShrink: 0, marginTop: 8 }}>
        <PxArrow scale={2} color="var(--brand)" />
      </span>
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children, ...rest }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      style={{
        margin: 0,
        padding: "16px 22px",
        borderLeft: "4px solid var(--hot-yellow)",
        background: "var(--paper-2)",
        fontFamily: "var(--font-pixel-body)",
        fontSize: 22,
        color: "var(--ink)",
        lineHeight: 1.5,
      }}
      {...rest}
    >
      {children}
    </blockquote>
  ),
  hr: (rest: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      style={{
        border: 0,
        borderTop: "3px dashed var(--dim-2)",
        margin: "12px 0",
      }}
      {...rest}
    />
  ),
  code: ({ children, className, ...rest }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={className}
      style={{
        background: "var(--paper-2)",
        border: "2px solid var(--dim-2)",
        padding: "2px 6px",
        fontFamily: "var(--font-mono)",
        fontSize: 16,
        color: "var(--hot-green)",
      }}
      {...rest}
    >
      {children}
    </code>
  ),
  pre: ({ children, className }: React.HTMLAttributes<HTMLPreElement>) => {
    const mermaidCode = findMermaidCode(children);
    if (mermaidCode) return <Mermaid chart={mermaidCode} className={className} />;
    return (
      <div
        style={{
          border: "3px solid var(--ink)",
          background: "#000",
          boxShadow: "5px 5px 0 var(--hot-green)",
        }}
      >
        <div
          style={{
            padding: "6px 12px",
            borderBottom: "2px dashed var(--dim-2)",
            background: "var(--paper-2)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ display: "inline-flex", gap: 5 }}>
            <span style={{ width: 10, height: 10, background: "var(--hot-red)" }} />
            <span style={{ width: 10, height: 10, background: "var(--hot-yellow)" }} />
            <span style={{ width: 10, height: 10, background: "var(--hot-green)" }} />
          </span>
          <span
            className="pixel-text"
            style={{
              fontSize: 8,
              color: "var(--dim)",
              letterSpacing: "0.15em",
              marginLeft: "auto",
            }}
          >
            CODE
          </span>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "18px 20px",
            overflowX: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--hot-green)",
          }}
        >
          {children}
        </pre>
      </div>
    );
  },
  img: ({ alt, src, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      src={src}
      style={{
        width: "100%",
        border: "3px solid var(--ink)",
        boxShadow: "4px 4px 0 var(--brand-deep)",
      }}
      {...rest}
    />
  ),
  table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
    <div style={{ overflowX: "auto", border: "3px solid var(--ink)", background: "var(--paper-2)" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-pixel-body)",
          fontSize: 18,
          color: "var(--ink)",
        }}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...rest }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      style={{
        textAlign: "left",
        padding: "10px 14px",
        background: "#000",
        color: "var(--hot-yellow)",
        fontFamily: "var(--font-pixel)",
        fontSize: 10,
        letterSpacing: "0.15em",
        borderBottom: "3px solid var(--dim-2)",
      }}
      {...rest}
    >
      {children}
    </th>
  ),
  td: ({ children, ...rest }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td style={{ padding: "10px 14px", borderTop: "2px dashed var(--dim-2)" }} {...rest}>
      {children}
    </td>
  ),
  Image,
};

export function ArcadeMdx({ code }: { code: string }) {
  // MDXContent's components type is Record<string, ComponentType>; the strict
  // signature of next/image doesn't fit cleanly. Cast at the boundary.
  return (
    <MDXContent
      code={code}
      components={arcadeComponents as unknown as Record<string, React.ComponentType>}
    />
  );
}
