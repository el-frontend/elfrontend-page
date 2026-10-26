import { blogs as allBlogs } from "#site/content";
import { lastYoutubeVideos } from "@/server/services/youtube";
import type { ArcadeBlogPost } from "../components/sections/blog";
import type { ArcadeVideo } from "../components/sections/videos";

export async function getArcadeVideos(): Promise<ArcadeVideo[]> {
  const items = await lastYoutubeVideos();
  return items.slice(0, 4).map((v, i) => ({
    id: v.id.videoId,
    title: decodeHtml(v.snippet.title),
    thumbnail: v.snippet.thumbnails.high.url,
    href: `https://www.youtube.com/watch?v=${v.id.videoId}`,
    meta: relativeDate(v.snippet.publishedAt),
    isNew: i === 0,
  }));
}

export function getArcadeBlogPosts(): ArcadeBlogPost[] {
  return allBlogs
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
    .map((b) => ({
      slug: b.slugAsParams,
      title: b.title,
      date: formatDate(b.date),
      read: `${Math.max(1, Math.round(b.metadata.readingTime))} min`,
      tag: b.tag,
      image: b.image,
    }));
}

function decodeHtml(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function relativeDate(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const day = 1000 * 60 * 60 * 24;
  if (diff < day * 14) return `${Math.max(1, Math.floor(diff / day))}d ago`;
  if (diff < day * 60) return `${Math.floor(diff / (day * 7))}w ago`;
  if (diff < day * 365) return `${Math.floor(diff / (day * 30))}mo ago`;
  return `${Math.floor(diff / (day * 365))}y ago`;
}
