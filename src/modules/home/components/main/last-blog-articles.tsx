import { blogs as allBlogs } from "#site/content";
import { Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LastBlogArticles = async () => {
  const blogs = allBlogs
    .filter((blog) => blog.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="bg-card dark:bg-background shadow border dark:border-muted rounded-md overflow-hidden w-full flex flex-col justify-between max-h-full">
      <div className="flex flex-col justify-end items-end w-full gap-3 p-2">
        {
          // show the last 3 blogs articles
          blogs.slice(0, 3).map((blog) => (
            <div
              key={blog.slug}
              className="w-full rounded-lg overflow-hidden flex gap-4 relative h-24 justify-between items-center border  border-muted p-2"
            >
              <div className="w-22 h-22 relative aspect-square">
                <Image
                  fill
                  className="object-cover"
                  src={blog.image}
                  alt={blog.title}
                />
              </div>
              <Link
                className="font-bold text-xs text-primary hover:underline line-clamp-4 text-left grow"
                href={blog.slug}
              >
                {blog.title}
              </Link>
            </div>
          ))
        }
      </div>
      <div className="w-full p-[1px]">
        <div className="bg-main-gradient border border-muted rounded-md p-3 mt-8 flex flex-col gap-2 justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5  rounded flex items-center justify-center">
              <Rss className="size-4 text-muted-foreground" />
            </div>
            <span className="text-md">Last Blog Articles</span>
          </div>
          <Link
            href="/blog"
            className="text-xs dark:text-muted-foreground text-center hover:underline cursor-pointer"
          >
            Review my last blog articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LastBlogArticles;
