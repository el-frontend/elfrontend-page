import { blogs as allBlogs } from "#site/content";
import BlogContainer from "@/modules/blog/container/blog-container";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "El Frontend Blog",
  description:
    "Read my latest thoughts on software development and web development.",
  alternates: {
    canonical: "https://elfrontend.com/blog",
  },
  openGraph: {
    title: "El Frontend Blog",
    description:
      "Read my latest thoughts on software development and web development.",
    url: "https://elfrontend.com/blog",
    type: "website",
  },
};

export default async function Page() {
  const blogs = allBlogs
    .filter((blog) => blog.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <BlogContainer articles={blogs} />;
}
