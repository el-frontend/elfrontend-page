"use client";

import { MDXContent } from "@/components/mdx-component";
import Mermaid from "@/components/mermaid";
import React, { type ReactNode } from "react";

// Element styles live in `.v4-prose` (v4.css); only behaviour is overridden here.

const extractText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
};

const findMermaidCode = (node: ReactNode): string | null => {
  if (Array.isArray(node)) {
    for (const child of node) {
      const code = findMermaidCode(child);
      if (code) return code;
    }
    return null;
  }
  if (!React.isValidElement(node)) return null;
  const props = node.props as { children?: ReactNode; "data-language"?: string };
  if (props["data-language"]?.includes("mermaid")) {
    return extractText(props.children).trim() || null;
  }
  return findMermaidCode(props.children);
};

const components = {
  a: ({ href = "", ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noreferrer" {...rest} />
    ) : (
      <a href={href} {...rest} />
    ),
  pre: ({ children, ...rest }: React.HTMLAttributes<HTMLPreElement>) => {
    const mermaid = findMermaidCode(children);
    if (mermaid) return <Mermaid chart={mermaid} className="v4-mermaid" />;
    return <pre {...rest}>{children}</pre>;
  },
};

export function V4Mdx({ code }: { code: string }) {
  return (
    <MDXContent
      code={code}
      components={components as unknown as Record<string, React.ComponentType>}
    />
  );
}
