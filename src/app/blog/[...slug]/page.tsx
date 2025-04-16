import { blogs as allBlogs } from "#site/content";
import "@/styles/mdx.css";
import { Metadata } from "next";

import ArticleContainer from "@/modules/blog/container/article-container";

interface BlogParams {
  slug: string[];
}
interface BlogPageItemProps {
  params: Promise<BlogParams>;
}

async function getBlogFromParams(params: BlogParams) {
  const slug = params?.slug.join("/");
  const blog = allBlogs.find((blog) => blog.slugAsParams === slug);

  if (!blog) {
    return null;
  }

  return blog;
}

export async function generateMetadata({
  params,
}: BlogPageItemProps): Promise<Metadata> {
  const blog = await getBlogFromParams(await params);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.description,
    authors: {
      name: blog.author,
    },
  };
}

export async function generateStaticParams(): Promise<
  BlogParams[]
> {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }));
}

export default async function BlogPageItem({ params }: BlogPageItemProps) {
  const blog = await getBlogFromParams(await params);

  if (!blog) {
    return {};
  }

  return <ArticleContainer blog={blog} />;
}
