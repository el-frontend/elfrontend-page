"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { V4Shell } from "../components/shell";
import { formatDate } from "../content/copy";
import { useLang } from "../context/lang-context";
import type { BlogCard } from "../types";
import { PostCard } from "./blog-index";
import { V4Mdx } from "./v4-mdx";

type Props = {
  post: BlogCard;
  body: string;
  prev: BlogCard | null;
  next: BlogCard | null;
  related: BlogCard[];
};

export function Article(props: Props) {
  return (
    <V4Shell>
      <ReadingProgress />
      <ArticleInner {...props} />
    </V4Shell>
  );
}

function ArticleInner({ post, body, prev, next, related }: Props) {
  const { t, lang } = useLang();
  return (
    <main className="flex flex-col gap-3 sm:gap-4">
      <article lang={post.lang} className="flex flex-col">
        <header className="mx-auto flex w-full max-w-[860px] flex-col gap-5 pb-8 pt-4 sm:pt-10">
          <Link
            href="/blog"
            lang={lang}
            className="inline-flex min-h-10 items-center gap-2 self-start text-sm font-medium text-(--v4-muted) transition-colors hover:text-(--v4-fg)"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t.articleBack}
          </Link>
          <span
            lang={lang}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-(--v4-muted)"
          >
            <span aria-hidden className="size-2 rounded-full bg-(--v4-acc)" />
            {t.tags[post.tag] ?? post.tag}
          </span>
          <h1 className="v4-display m-0 text-[34px] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-[52px]">
            {post.title}
          </h1>
          <p className="m-0 text-lg leading-relaxed text-(--v4-muted) sm:text-xl">
            {post.description}
          </p>
          <div lang={lang} className="flex items-center gap-3 border-t border-(--v4-line) pt-5">
            <Image
              src="/images/avatar.webp"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-xl object-cover"
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                {t.articleBy} Carlos Chao
              </span>
              <span className="text-(--v4-muted)">
                <time dateTime={post.iso}>{formatDate(post.iso, lang)}</time> ·{" "}
                {t.readMinutes(post.minutes)}
              </span>
            </div>
          </div>
        </header>

        <div className="relative mx-auto aspect-video w-full max-w-[1080px] overflow-hidden rounded-3xl border border-(--v4-line) bg-(--v4-s2)">
          <Image
            src={post.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1140px) 1080px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="v4-prose mx-auto w-full max-w-[720px] pt-10 sm:pt-14">
          <V4Mdx code={body} />
        </div>
      </article>

      {(prev || next) && (
        <nav
          aria-label={`${t.articlePrev} / ${t.articleNext}`}
          className="mx-auto mt-10 grid w-full max-w-[860px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        >
          {prev ? <PrevNextLink post={prev} dir="prev" /> : <span className="hidden sm:block" />}
          {next && <PrevNextLink post={next} dir="next" />}
        </nav>
      )}

      {related.length > 0 && (
        <section aria-labelledby="v4-related" className="mt-10 flex flex-col gap-4 sm:mt-14">
          <h2
            id="v4-related"
            className="v4-display m-0 text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]"
          >
            {t.articleRelated}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function PrevNextLink({ post, dir }: { post: BlogCard; dir: "prev" | "next" }) {
  const { t } = useLang();
  const isNext = dir === "next";
  return (
    <Link
      href={`/blog/${post.slug}`}
      rel={dir}
      className={`group flex flex-col gap-2 rounded-[20px] border border-(--v4-line) bg-(--v4-s1) p-5 transition-colors hover:border-(--v4-acc) ${
        isNext ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.06em] text-(--v4-muted)">
        {!isNext && <ArrowLeft aria-hidden className="size-3.5" />}
        {isNext ? t.articleNext : t.articlePrev}
        {isNext && <ArrowRight aria-hidden className="size-3.5" />}
      </span>
      <span lang={post.lang} className="text-base font-semibold leading-snug">
        {post.title}
      </span>
    </Link>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div
        className="h-full origin-left bg-(--v4-acc)"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
