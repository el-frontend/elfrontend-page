import { blogs as allBlogs } from "#site/content";
import type { BlogPost } from "../types";

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
      read: estimateReadTime(b.body),
      tag: inferTag(b.title),
      image: b.image,
      description: b.description,
      // Stable pseudo-likes so cards have a number without runtime drift.
      likes: 20 + ((i * 37) % 160),
    }));
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function estimateReadTime(body: string) {
  const words = body.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min`;
}

function inferTag(title: string) {
  const t = title.toLowerCase();
  if (t.includes("react")) return "React";
  if (t.includes("tailwind")) return "CSS";
  if (t.includes("estim")) return "Process";
  if (t.includes("cookie")) return "Web";
  if (t.includes("web3")) return "Opinion";
  if (t.includes("ai") || t.includes("video")) return "AI";
  if (t.includes("pattern")) return "Theory";
  if (t.includes("trunk")) return "Workflow";
  return "Notes";
}
