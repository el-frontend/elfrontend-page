import { blogs } from "#site/content";
import { absoluteUrl, AUTHOR, SITE_NAME } from "@/lib/metadata";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const posts = blogs
    .filter((b) => b.published)
    .sort((a, b) => b.date.localeCompare(a.date));

  const items = posts
    .map((b) => {
      const url = absoluteUrl(`/blog/${b.slugAsParams}`);
      return `    <item>
      <title>${escapeXml(b.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(b.description)}</description>
      <pubDate>${new Date(b.date).toUTCString()}</pubDate>
      <category>${escapeXml(b.tag)}</category>
      <dc:creator>${escapeXml(AUTHOR.name)}</dc:creator>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Artículos sobre desarrollo web, React, Next.js, arquitectura de software e inteligencia artificial aplicada al desarrollo.</description>
    <language>es</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date(posts[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
