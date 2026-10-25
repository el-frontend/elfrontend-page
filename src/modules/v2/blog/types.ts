export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  iso: string;
  read: string;
  tag: string;
  image: string;
  description: string;
  lang: "es" | "en";
  likes: number;
};
