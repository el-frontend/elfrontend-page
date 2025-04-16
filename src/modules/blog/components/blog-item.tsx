import { type BlogItem } from "@/server/types/blog";
import { formatDateShort } from "@/server/utils/date";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: BlogItem;
};

const Article: React.FC<Props> = ({ article }) => {
  return (
    <article className="group relative flex flex-col space-y-2 cursor-pointer justify-between">
      <div className="relative w-full aspect-square">
        <Image
          alt={article.title}
          src={article.image}
          className="object-cover transition-all rounded-md group-hover:scale-[1.02] duration-400"
          fill
        />
      </div>
      <div className="flex flex-col gap-4 h-full justify-between">
        <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 text-primary">
          <Link href={article.slug}>
            <span className="bg-gradient-to-r from-purple-300 to-purple-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
              {article.title}
            </span>
          </Link>
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="truncate text-sm">{article.author}</span>
          <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
          <p className="text-sm text-muted-foreground">
            {formatDateShort(article.date)}
          </p>
        </div>
      </div>
      <Link className="absolute inset-0" href={article.slug}>
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
};

export default Article;
