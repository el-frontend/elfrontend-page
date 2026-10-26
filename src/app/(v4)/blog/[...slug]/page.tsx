import { blogs as allBlogs } from "#site/content";
import { absoluteUrl, AUTHOR, jsonLd, RSS_ALTERNATE, SITE_NAME } from "@/lib/metadata";
import { Article } from "@/modules/v4/blog/article";
import { getBlogPosts } from "@/modules/v4/server/blog";
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
  const url = absoluteUrl(`/blog/${blog.slugAsParams}`);
  const image = { url: `/og/blog/${blog.slugAsParams}`, width: 1200, height: 630, alt: blog.title };
  return {
    title: blog.title,
    description: blog.description,
    authors: { name: AUTHOR.name, url: AUTHOR.url },
    alternates: { canonical: url, types: RSS_ALTERNATE },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      locale: blog.lang === "es" ? "es_ES" : "en_US",
      publishedTime: blog.date,
      authors: [AUTHOR.name],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [image],
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

  const all = getBlogPosts();
  const idx = all.findIndex((p) => p.slug === joined);
  const post = all[idx];
  // `all` is newest first: previous = older post, next = newer post.
  const prev = all[idx + 1] ?? null;
  const next = idx > 0 ? all[idx - 1] : null;

  // Related: same tag (excluding current), then pad with most recent.
  const sameTag = all.filter((p) => p.slug !== joined && p.tag === post.tag);
  const fallback = all.filter((p) => p.slug !== joined && p.tag !== post.tag);
  const related = [...sameTag, ...fallback].slice(0, 3);

  const url = absoluteUrl(`/blog/${blog.slugAsParams}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: [absoluteUrl(`/og/blog/${blog.slugAsParams}`), absoluteUrl(blog.image)],
    datePublished: blog.date,
    inLanguage: blog.lang,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url, sameAs: AUTHOR.sameAs },
    publisher: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <Article post={post} body={blog.body} prev={prev} next={next} related={related} />
    </>
  );
}
