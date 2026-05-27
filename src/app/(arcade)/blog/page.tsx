import { BlogShell } from "@/modules/v2/blog/blog-shell";
import { getAllArcadeBlogPosts } from "@/modules/v2/blog/server/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Frontend Blog",
  description:
    "Read my latest thoughts on software development and web development.",
  alternates: { canonical: "https://elfrontend.com/blog" },
  openGraph: {
    title: "El Frontend Blog",
    description:
      "Read my latest thoughts on software development and web development.",
    url: "https://elfrontend.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllArcadeBlogPosts();
  return <BlogShell posts={posts} />;
}
