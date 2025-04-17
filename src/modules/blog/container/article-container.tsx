import { cn } from "@/lib/utils";
import "@/styles/mdx.css";

import { Mdx } from "@/components/mdx-component";
import { buttonVariants } from "@/components/ui/button";
import { BlogItem } from "@/server/types/blog";
import { formatDateShort } from "@/server/utils/date";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  blog: BlogItem;
};

const ArticleContainer: React.FC<Props> = ({ blog }) => {
  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <div>
        {blog.date && (
          <time
            dateTime={blog.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDateShort(blog.date)}
          </time>
        )}

        <h1 className="mt-2 inline-block text-4xl font-bold capitalize leading-tight text-primary lg:text-5xl">
          {blog.title}
        </h1>

        {blog.author && (
          <div className="mt-4 flex space-x-4">
            <Image
              src={"/images/avatar.webp"}
              alt={blog.author}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{blog.author}</p>
              <p className="text-[12px] text-muted-foreground">
                @{blog.author}
              </p>
            </div>
          </div>
        )}

        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            width={720}
            height={405}
            priority
            className="my-8 border bg-muted transition-colors"
          />
        )}
        <Mdx code={blog.body} />
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ChevronLeft className="mr-2 size-4" />
            See all Blogs
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleContainer;
