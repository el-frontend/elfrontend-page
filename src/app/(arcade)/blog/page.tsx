import { absoluteUrl, RSS_ALTERNATE, SITE_NAME } from "@/lib/metadata";
import { BlogShell } from "@/modules/v2/blog/blog-shell";
import { getAllArcadeBlogPosts, getBlogStats } from "@/modules/v2/blog/server/data";
import type { Metadata } from "next";

const description =
  "Artículos sobre desarrollo web, React, Next.js, arquitectura de software e inteligencia artificial aplicada al desarrollo.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: absoluteUrl("/blog"), types: RSS_ALTERNATE },
  openGraph: {
    title: "ElFrontend Blog",
    description,
    url: absoluteUrl("/blog"),
    siteName: SITE_NAME,
    type: "website",
    locale: "es_ES",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  const posts = getAllArcadeBlogPosts();
  return <BlogShell posts={posts} stats={getBlogStats()} />;
}
