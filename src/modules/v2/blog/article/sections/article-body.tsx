"use client";

import { ArcadeMdx } from "../arcade-mdx";

export function ArticleBody({ code, lang }: { code: string; lang: string }) {
  return (
    <article lang={lang} style={{ padding: "24px 32px 48px" }}>
      <div
        className="container arcade-prose"
        style={{
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <ArcadeMdx code={code} />
      </div>
    </article>
  );
}
