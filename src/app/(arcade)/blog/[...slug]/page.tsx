import { blogs as allBlogs } from "#site/content";
import { ArticleShell } from "@/modules/v2/blog/article/article-shell";
import { getAllArcadeBlogPosts } from "@/modules/v2/blog/server/data";
import "@/styles/mdx.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogParams {
  slug: string[];
}
interface BlogPageItemProps {
  params: Promise<BlogParams>;
}

export async function generateMetadata({ params }: BlogPageItemProps): Promise<Metadata> {
  const { slug } = await params;
  const joined = slug.join("/");
  const blog = allBlogs.find((b) => b.slugAsParams === joined);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.description,
    authors: { name: blog.author },
    alternates: { canonical: `https://elfrontend.com/blog/${blog.slugAsParams}` },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://elfrontend.com/blog/${blog.slugAsParams}`,
      type: "article",
    },
  };
}

export async function generateStaticParams(): Promise<BlogParams[]> {
  return allBlogs.map((b) => ({ slug: b.slugAsParams.split("/") }));
}

export default async function BlogPageItem({ params }: BlogPageItemProps) {
  const { slug } = await params;
  const joined = slug.join("/");
  const blog = allBlogs.find((b) => b.slugAsParams === joined);
  if (!blog) notFound();

  const all = getAllArcadeBlogPosts();
  const idx = all.findIndex((p) => p.slug === joined);
  const post = all[idx];
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  // Related: same tag (excluding current), then pad with most recent.
  const sameTag = all.filter((p) => p.slug !== joined && p.tag === post.tag);
  const fallback = all.filter((p) => p.slug !== joined && p.tag !== post.tag);
  const related = [...sameTag, ...fallback].slice(0, 3);

  return (
    <ArticleShell post={post} body={blog.body} prev={prev} next={next} related={related} />
  );
}
