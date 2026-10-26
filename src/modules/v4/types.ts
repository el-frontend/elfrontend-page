import type { Lang } from "../v2/content/copy";

export type { Lang };
export type Localized = Record<Lang, string>;

export type HomeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  href: string;
};

export type HomePost = {
  slug: string;
  title: string;
  image: string;
  iso: string;
  minutes: number;
  tag: string;
};

export type HomeTalk = {
  title: Localized;
  date: Localized;
  meta: Localized;
  href: string;
  thumbnail: string | null;
};

export type HomeProject = {
  name: string;
  tag: Localized;
  desc: Localized;
  href: string;
};

export type HomeStats = {
  posts: number;
  words: number;
  minutes: number;
  /** null when the YouTube API is unavailable */
  videos: number | null;
};

export type HomeData = {
  video: HomeVideo | null;
  posts: HomePost[];
  stats: HomeStats;
  talk: HomeTalk | null;
  projects: HomeProject[];
  socials: Array<{ label: string; href: string }>;
};

export type BlogCard = {
  slug: string;
  title: string;
  description: string;
  image: string;
  iso: string;
  minutes: number;
  tag: string;
  lang: Lang;
};

export type BlogStats = {
  posts: number;
  words: number;
  minutes: number;
  topics: number;
};
