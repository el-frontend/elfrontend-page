import { blogs } from "#site/content";
import {
  lastYoutubeVideos,
  youtubeChannelStats,
} from "@/server/services/youtube";
import { PROJECTS, SOCIALS, TALKS } from "../../v2/content/data";
import type { HomeData, HomePost, HomeTalk, HomeVideo } from "../types";

export async function getHomeData(): Promise<HomeData> {
  const [videos, channel] = await Promise.all([
    lastYoutubeVideos(),
    youtubeChannelStats(),
  ]);

  const published = blogs
    .filter((b) => b.published)
    .sort((a, b) => b.date.localeCompare(a.date));

  const posts: HomePost[] = published.slice(0, 4).map((b) => ({
    slug: b.slugAsParams,
    title: b.title,
    image: b.image,
    iso: b.date,
    minutes: Math.max(1, Math.round(b.metadata.readingTime)),
    tag: b.tag,
  }));

  const latest = videos[0];
  const video: HomeVideo | null = latest
    ? {
        id: latest.id.videoId,
        title: stripHashtags(decodeHtml(latest.snippet.title)),
        thumbnail:
          latest.snippet.thumbnails.high?.url ??
          latest.snippet.thumbnails.default.url,
        href: `https://www.youtube.com/watch?v=${latest.id.videoId}`,
      }
    : null;

  return {
    video,
    posts,
    stats: {
      posts: published.length,
      words: published.reduce((sum, b) => sum + b.metadata.wordCount, 0),
      minutes: Math.round(
        published.reduce((sum, b) => sum + b.metadata.readingTime, 0)
      ),
      videos: channel?.videoCount || null,
    },
    talk: toHomeTalk(TALKS.find((t) => t.kind === "TALK")),
    projects: PROJECTS.slice(0, 3).map(({ name, tag, desc, href }) => ({
      name,
      tag: { en: sentenceCase(tag.en), es: sentenceCase(tag.es) },
      desc,
      href,
    })),
    socials: SOCIALS.map(({ label, href }) => ({ label, href })),
  };
}

function toHomeTalk(talk: (typeof TALKS)[number] | undefined): HomeTalk | null {
  if (!talk) return null;
  const videoId = new URL(talk.href).searchParams.get("v");
  return {
    title: talk.title,
    date: talk.date,
    meta: talk.meta,
    href: talk.href,
    thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null,
  };
}

function decodeHtml(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** "AI VIDEO TRIMMING" -> "AI video trimming" (the shared data is uppercase for the arcade UI). */
function sentenceCase(s: string) {
  const lower = s
    .split(" ")
    .map((w) => (/^(AI|IA)$/.test(w) ? w : w.toLowerCase()))
    .join(" ");
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** Shorts titles end in hashtags; they read as noise on a card. */
function stripHashtags(s: string) {
  return s.replace(/(\s+#[\p{L}\p{N}_]+)+\s*$/u, "").trim() || s;
}
