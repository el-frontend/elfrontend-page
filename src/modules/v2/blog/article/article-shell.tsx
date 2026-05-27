"use client";

import { ArcadeProvider } from "../../context/arcade-context";
import { CrtOverlay } from "../../components/crt-overlay";
import { KonamiBanner } from "../../components/konami-banner";
import { Nav } from "../../components/sections/nav";
import { StatusBar } from "../../components/sections/status-bar";
import { ArcadeFooter } from "../../components/sections/footer";
import { WalkingSprite } from "../../components/walking-sprite";
import { Newsletter } from "../sections/newsletter";
import type { BlogPost } from "../types";
import { ReadingProgress } from "./reading-progress";
import { ArticleBody } from "./sections/article-body";
import { ArticleHeader } from "./sections/article-header";
import { ArticleHero } from "./sections/article-hero";
import { ArticleReactions } from "./sections/article-reactions";
import { PrevNext } from "./sections/prev-next";
import { Related } from "./sections/related";

type Props = {
  post: BlogPost;
  body: string;
  prev: BlogPost | null;
  next: BlogPost | null;
  related: BlogPost[];
};

export function ArticleShell({ post, body, prev, next, related }: Props) {
  return (
    <ArcadeProvider>
      <CrtOverlay />
      <KonamiBanner />
      <ReadingProgress />
      <StatusBar />
      <Nav />
      <ArticleHeader post={post} />
      <ArticleHero post={post} />
      <ArticleBody code={body} />
      <ArticleReactions />
      <PrevNext prev={prev} next={next} />
      <Related posts={related} />
      <Newsletter />
      <ArcadeFooter />
      <WalkingSprite />
    </ArcadeProvider>
  );
}
