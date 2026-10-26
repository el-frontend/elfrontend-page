"use client";

import { ArrowUpRight, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { V4Shell } from "../components/shell";
import { formatCount, formatDate } from "../content/copy";
import { useLang } from "../context/lang-context";
import type { BlogCard, BlogStats } from "../types";

type Props = { posts: BlogCard[]; stats: BlogStats };

export function BlogIndex(props: Props) {
  return (
    <V4Shell>
      <BlogIndexInner {...props} />
    </V4Shell>
  );
}

function BlogIndexInner({ posts, stats }: Props) {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => [...new Set(posts.map((p) => p.tag))].sort(), [posts]);
  const filtering = tag !== null || query.trim() !== "";
  const featured = posts[0];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (filtering ? posts : posts.slice(1)).filter(
      (p) =>
        (!tag || p.tag === tag) &&
        (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
  }, [posts, tag, query, filtering]);

  const statItems = [
    { v: formatCount(stats.posts), l: t.statPosts },
    { v: formatCount(stats.words), l: t.statWords },
    { v: formatCount(stats.minutes), l: t.statMinutes },
    { v: String(stats.topics), l: t.statTopics },
  ];

  return (
    <main className="flex flex-col gap-3 sm:gap-4">
      <section className="grid grid-cols-12 gap-3 sm:gap-4">
        <div className="col-span-12 flex flex-col justify-end gap-4 rounded-3xl border border-(--v4-line) bg-(--v4-s1) p-6 sm:p-9 lg:col-span-8">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-(--v4-muted)">
            {t.navBlog}
          </span>
          <h1 className="v4-display m-0 text-[38px] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-[56px]">
            {t.blogTitle}
          </h1>
          <p className="m-0 max-w-[600px] text-base leading-relaxed text-(--v4-muted) sm:text-lg">
            {t.blogSub}
          </p>
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-2.5 lg:col-span-4">
          {statItems.map((s) => (
            <div
              key={s.l}
              className="flex min-h-[110px] flex-col justify-end gap-1 rounded-[18px] border border-(--v4-line) bg-(--v4-s1) px-4 py-[18px]"
            >
              <span className="v4-display text-[30px] font-extrabold leading-none tracking-[-0.04em] sm:text-[34px]">
                {s.v}
              </span>
              <span className="text-[13px] leading-tight text-(--v4-muted)">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {featured && !filtering && <FeaturedPost post={featured} />}

      <section aria-label={t.blogTopics} className="mt-4 flex flex-col gap-3 sm:mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-[360px]">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-(--v4-muted)"
            />
            <label htmlFor="v4-blog-q" className="sr-only">
              {t.blogSearch}
            </label>
            <input
              id="v4-blog-q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.blogSearch}
              autoComplete="off"
              className="h-12 w-full rounded-[14px] border border-(--v4-line) bg-(--v4-s1) pl-11 pr-11 text-base text-(--v4-fg) placeholder:text-(--v4-muted) focus-visible:outline-2 focus-visible:outline-(--v4-acc) [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t.blogClear}
                className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-(--v4-muted) hover:text-(--v4-fg)"
              >
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>
          <span role="status" className="font-mono text-[13px] text-(--v4-muted)">
            {t.blogCount(results.length)}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[null, ...tags].map((tg) => (
            <button
              key={tg ?? "all"}
              type="button"
              aria-pressed={tag === tg}
              onClick={() => setTag(tg)}
              className="min-h-10 rounded-full border border-(--v4-line) bg-(--v4-s1) px-4 text-sm font-medium text-(--v4-fg) transition-colors hover:border-(--v4-acc) aria-pressed:border-(--v4-fg) aria-pressed:bg-(--v4-fg) aria-pressed:text-(--v4-bg)"
            >
              {tg ? (t.tags[tg] ?? tg) : t.blogAll}
            </button>
          ))}
        </div>
      </section>

      {results.length ? (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="m-0 rounded-3xl border border-dashed border-(--v4-line) p-10 text-center text-(--v4-muted)">
          {t.blogEmpty}
        </p>
      )}
    </main>
  );
}

function FeaturedPost({ post }: { post: BlogCard }) {
  const { t, lang } = useLang();
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 gap-5 rounded-3xl border border-(--v4-line) bg-(--v4-s1) p-3.5 transition-colors hover:border-(--v4-acc) md:grid-cols-2 md:gap-8"
    >
      <div className="relative aspect-video overflow-hidden rounded-[18px]">
        <Image
          src={post.image}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 620px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 px-2.5 pb-3 md:py-4 md:pr-6">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-(--v4-muted)">
          <span aria-hidden className="size-2 rounded-full bg-(--v4-acc)" />
          {t.blogLatest} · {t.tags[post.tag] ?? post.tag}
        </span>
        <span
          lang={post.lang}
          className="v4-display text-[26px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[34px]"
        >
          {post.title}
        </span>
        <span lang={post.lang} className="line-clamp-3 text-base leading-relaxed text-(--v4-muted)">
          {post.description}
        </span>
        <span className="mt-1 flex items-center justify-between gap-3 text-[13px] text-(--v4-muted)">
          {formatDate(post.iso, lang)} · {t.readMinutes(post.minutes)}
          <ArrowUpRight
            aria-hidden
            className="size-5 shrink-0 text-(--v4-acc) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: BlogCard }) {
  const { t, lang } = useLang();
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col gap-3.5 rounded-[20px] border border-(--v4-line) bg-(--v4-s1) p-3 transition-colors hover:border-(--v4-acc)"
    >
      <div className="relative aspect-video overflow-hidden rounded-[14px]">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-2 pb-2">
        <span className="self-start rounded-full border border-(--v4-line) px-2.5 py-1 font-mono text-xs text-(--v4-muted)">
          {t.tags[post.tag] ?? post.tag}
        </span>
        <span lang={post.lang} className="text-lg font-semibold leading-snug">
          {post.title}
        </span>
        <span className="mt-auto pt-1 text-[13px] text-(--v4-muted)">
          {formatDate(post.iso, lang)} · {post.minutes} min
        </span>
      </div>
    </Link>
  );
}
