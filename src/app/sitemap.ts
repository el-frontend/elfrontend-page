import { blogs } from "#site/content";
import { absoluteUrl, SITE_URL } from "@/lib/metadata";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = blogs
    .filter((b) => b.published)
    .sort((a, b) => b.date.localeCompare(a.date));

  const posted = posts.map((b) => ({
    url: absoluteUrl(`/blog/${b.slugAsParams}`),
    lastModified: new Date(b.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
    images: [absoluteUrl(b.image)],
  }));

  const latest = posts[0] ? new Date(posts[0].date) : undefined;

  return [
    {
      url: SITE_URL,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/og.png")],
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posted,
  ];
}
