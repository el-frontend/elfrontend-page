import { blogs as allBlogs } from "#site/content";
import type { BlogPost, BlogStats } from "../types";

export function getAllArcadeBlogPosts(): BlogPost[] {
  return allBlogs
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((b, i) => ({
      id: `b${i + 1}`,
      slug: b.slugAsParams,
      title: b.title,
      iso: b.date,
      date: formatDate(b.date),
      read: `${Math.max(1, Math.round(b.metadata.readingTime))} min`,
      tag: b.tag,
      image: b.image,
      description: b.description,
      lang: b.lang,
    }));
}

export function getBlogStats(): BlogStats {
  const posts = allBlogs.filter((b) => b.published);
  return {
    posts: posts.length,
    words: posts.reduce((sum, b) => sum + b.metadata.wordCount, 0),
    minutes: Math.round(posts.reduce((sum, b) => sum + b.metadata.readingTime, 0)),
    topics: new Set(posts.map((b) => b.tag)).size,
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
