import { blogs } from "#site/content";
import type { BlogCard, BlogStats } from "../types";

const published = () =>
  blogs.filter((b) => b.published).sort((a, b) => b.date.localeCompare(a.date));

export function getBlogPosts(): BlogCard[] {
  return published().map((b) => ({
    slug: b.slugAsParams,
    title: b.title,
    description: b.description,
    image: b.image,
    iso: b.date,
    minutes: Math.max(1, Math.round(b.metadata.readingTime)),
    tag: b.tag,
    lang: b.lang,
  }));
}

export function getBlogStats(): BlogStats {
  const posts = published();
  return {
    posts: posts.length,
    words: posts.reduce((sum, b) => sum + b.metadata.wordCount, 0),
    minutes: Math.round(posts.reduce((sum, b) => sum + b.metadata.readingTime, 0)),
    topics: new Set(posts.map((b) => b.tag)).size,
  };
}
