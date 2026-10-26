"use client";

import Link from "next/link";
import { formatDate } from "../content/copy";
import { useLang } from "../context/lang-context";
import type { HomeData, HomePost } from "../types";
import { ChatTile } from "./chat-tile";
import { V4Shell } from "./shell";
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
    <V4Shell>
      <main className="grid grid-cols-12 gap-3 sm:gap-4">
        <IntroTile className="col-span-12 lg:col-span-7 lg:row-span-2" />
        <ChatTile className="col-span-12 lg:col-span-5 lg:row-span-2" />
        <VideoTile
          video={data.video}
          className="col-span-12 md:col-span-6 lg:col-span-5"
        />
        {data.posts[0] && (
          <PostTile
            post={data.posts[0]}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          />
        )}
        <StatsTile
          stats={data.stats}
          className="col-span-12 md:col-span-6 lg:col-span-3"
        />
        {data.talk && (
          <TalkTile
            talk={data.talk}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          />
        )}
        <ProjectsTile
          projects={data.projects}
          className="col-span-12 md:col-span-6 lg:col-span-5"
        />
        <CommunityTile
          socials={data.socials}
          className="col-span-12 md:col-span-6 lg:col-span-3"
        />
      </main>
      <MorePosts posts={data.posts.slice(1)} />
    </V4Shell>
  );
}

function MorePosts({ posts }: { posts: HomePost[] }) {
  const { t, lang } = useLang();
  if (!posts.length) return null;
  return (
    <section
      aria-labelledby="v4-more"
      className="mt-6 flex flex-col gap-4 sm:mt-10"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="v4-more"
          className="v4-display m-0 text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]"
        >
          {t.moreTitle}
        </h2>
        <Link
          href="/blog"
          className="py-2.5 text-[15px] font-semibold text-(--v4-acc-text)"
        >
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
