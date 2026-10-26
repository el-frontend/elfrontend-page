"use client";

import Link from "next/link";
import { formatDate } from "../content/copy";
import { LangProvider, useLang } from "../context/lang-context";
import type { HomeData, HomePost } from "../types";
import { ChatTile } from "./chat-tile";
import { Header } from "./header";
import {
  CommunityTile,
  IntroTile,
  PostTile,
  ProjectsTile,
  StatsTile,
  TalkTile,
  VideoTile,
} from "./tiles";

export function V4Home({ data }: { data: HomeData }) {
  return (
    <LangProvider>
      <div className="v4 min-h-screen font-sans">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 pb-12 pt-4 sm:px-8 sm:pt-6">
          <Header />
          <main className="grid grid-cols-12 gap-3 sm:gap-4">
            <IntroTile className="col-span-12 lg:col-span-7 lg:row-span-2" />
            <ChatTile className="col-span-12 lg:col-span-5 lg:row-span-2" />
            <VideoTile video={data.video} className="col-span-12 md:col-span-6 lg:col-span-5" />
            {data.posts[0] && (
              <PostTile post={data.posts[0]} className="col-span-12 md:col-span-6 lg:col-span-4" />
            )}
            <StatsTile stats={data.stats} className="col-span-12 md:col-span-6 lg:col-span-3" />
            {data.talk && (
              <TalkTile talk={data.talk} className="col-span-12 md:col-span-6 lg:col-span-4" />
            )}
            <ProjectsTile projects={data.projects} className="col-span-12 md:col-span-6 lg:col-span-5" />
            <CommunityTile socials={data.socials} className="col-span-12 md:col-span-6 lg:col-span-3" />
          </main>
          <MorePosts posts={data.posts.slice(1)} />
          <Footer />
        </div>
      </div>
    </LangProvider>
  );
}

function MorePosts({ posts }: { posts: HomePost[] }) {
  const { t, lang } = useLang();
  if (!posts.length) return null;
  return (
    <section aria-labelledby="v4-more" className="mt-6 flex flex-col gap-4 sm:mt-10">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="v4-more" className="v4-display m-0 text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">
          {t.moreTitle}
        </h2>
        <Link href="/blog" className="py-2.5 text-[15px] font-semibold text-(--v4-acc-text)">
          {t.moreLink} →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="flex min-h-[180px] flex-col gap-3 rounded-[20px] border border-(--v4-line) bg-(--v4-s1) p-[22px] transition-colors hover:border-(--v4-acc)"
          >
            <span className="self-start rounded-full border border-(--v4-line) px-2.5 py-1 font-mono text-xs text-(--v4-muted)">
              {t.tags[p.tag] ?? p.tag}
            </span>
            <span lang="es" className="text-lg font-semibold leading-snug">
              {p.title}
            </span>
            <span className="mt-auto text-[13px] text-(--v4-muted)">
              {formatDate(p.iso, lang)} · {p.minutes} min
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-6 flex flex-wrap justify-between gap-4 border-t border-(--v4-line) pt-6 text-sm text-(--v4-muted) sm:mt-10">
      <span>{t.footer}</span>
      <span className="flex gap-[18px]">
        <a href="/rss.xml" className="hover:text-(--v4-fg)">RSS</a>
        <a href="https://github.com/el-frontend" className="hover:text-(--v4-fg)">GitHub</a>
        <a href="https://linkedin.com/in/carlos-chao" className="hover:text-(--v4-fg)">LinkedIn</a>
        <Link href="/v3" className="hover:text-(--v4-fg)">v3</Link>
      </span>
    </footer>
  );
}
