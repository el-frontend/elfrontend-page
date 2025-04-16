import { BlogItem } from "@/server/types/blog";
import Article from "../components/blog-item";

type Props = {
  articles: BlogItem[];
};
      
const BlogContainer: React.FC<Props> = ({ articles }) => {
  return (
    <div className="container px-8 mx-auto xl:px-5  max-w-screen-lg relative">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            My Blog
          </h1>
          <p className="text-xl text-muted-foreground text-center">
            Read my latest thoughts on software development and web development.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {articles.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

export default BlogContainer;
