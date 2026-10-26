import { absoluteUrl, RSS_ALTERNATE, SITE_NAME } from "@/lib/metadata";
import { BlogIndex } from "@/modules/v4/blog/blog-index";
import { getBlogPosts, getBlogStats } from "@/modules/v4/server/blog";
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
  return <BlogIndex posts={getBlogPosts()} stats={getBlogStats()} />;
}
