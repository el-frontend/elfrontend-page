"use client";

import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCount, formatDate } from "../content/copy";
import { useLang } from "../context/lang-context";
import type { HomePost, HomeProject, HomeStats, HomeTalk, HomeVideo } from "../types";

const tile =
  "rounded-3xl border border-(--v4-line) bg-(--v4-s1) transition-colors hover:border-(--v4-acc)";
const label = "font-mono text-xs uppercase tracking-[0.06em] text-(--v4-muted)";

type TileProps = { className?: string };

export function IntroTile({ className = "" }: TileProps) {
  const { t } = useLang();
  return (
    <section
      className={`${tile} flex flex-col justify-between gap-7 p-6 sm:p-9 lg:min-h-[420px] ${className}`}
    >
      <div className="flex items-center gap-3.5">
        <Image
          src="/images/avatar.webp"
          alt="Carlos Chao"
          width={56}
          height={56}
          priority
          className="size-12 rounded-2xl object-cover sm:size-14"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold">Carlos Chao Cortes</span>
          <span className="font-mono text-[13px] text-(--v4-muted)">
            @ElFrontend · {t.location}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[18px]">
        <h1 className="v4-display m-0 text-[42px] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-[56px] xl:text-[68px]">
          {t.h1a} <span className="text-(--v4-acc)">{t.h1b}</span>
        </h1>
        <p className="m-0 max-w-[560px] text-base leading-relaxed text-(--v4-muted) sm:text-lg">
          {t.sub}
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <a
          href="#videos"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-(--v4-fg) px-4 text-[15px] font-semibold text-(--v4-bg) sm:flex-none sm:px-[22px]"
        >
          {t.ctaPrimary}
          <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
        </a>
        <Link
          href="/blog"
          className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-[14px] border border-(--v4-line) px-4 text-[15px] font-semibold text-(--v4-fg) sm:flex-none sm:px-[22px]"
        >
          {t.ctaSecondary}
        </Link>
      </div>
    </section>
  );
}

export function VideoTile({ video, className = "" }: TileProps & { video: HomeVideo | null }) {
  const { t } = useLang();
  if (!video) {
    return (
      <a
        id="videos"
        href="https://youtube.com/@ElFrontend"
        className={`${tile} flex flex-col justify-end gap-2 p-6 ${className}`}
      >
        <span className={label}>{t.videoLabel}</span>
        <span className="text-lg font-semibold">{t.videoFallback}</span>
      </a>
    );
  }
  return (
    <a id="videos" href={video.href} className={`${tile} flex flex-col gap-3.5 p-3.5 ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-[14px] bg-black">
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 520px, 100vw"
          className="object-cover"
        />
        <span className="absolute bottom-3.5 left-3.5 inline-flex size-12 items-center justify-center rounded-full bg-(--v4-acc) text-(--v4-acc-ink)">
          <Play aria-hidden className="size-[18px] fill-current" />
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 pb-2">
        <span className={label}>{t.videoLabel}</span>
        <span className="text-lg font-semibold leading-snug">{video.title}</span>
      </div>
    </a>
  );
}

export function PostTile({ post, className = "" }: TileProps & { post: HomePost }) {
  const { t, lang } = useLang();
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${tile} flex flex-col gap-3.5 p-3.5 ${className}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-[14px]">
        <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 pb-2">
        <span className={label}>{t.postLabel}</span>
        <span lang="es" className="text-lg font-semibold leading-snug">
          {post.title}
        </span>
        <span className="text-[13px] text-(--v4-muted)">
          {formatDate(post.iso, lang)} · {t.readMinutes(post.minutes)}
        </span>
      </div>
    </Link>
  );
}

export function StatsTile({ stats, className = "" }: TileProps & { stats: HomeStats }) {
  const { t } = useLang();
  const items = [
    { v: formatCount(stats.posts), l: t.statPosts },
    { v: formatCount(stats.words), l: t.statWords },
    stats.videos
      ? { v: formatCount(stats.videos), l: t.statVideos }
      : { v: formatCount(stats.minutes), l: t.statMinutes },
    { v: "10+", l: t.statYears },
  ];
  return (
    <section aria-label={t.statsAria} className={`grid grid-cols-2 gap-2.5 ${className}`}>
      {items.map((s) => (
        <div
          key={s.l}
          className="flex min-h-[120px] flex-col justify-end gap-1 rounded-[18px] border border-(--v4-line) bg-(--v4-s1) px-4 py-[18px]"
        >
          <span className="v4-display text-[30px] font-extrabold leading-none tracking-[-0.04em] sm:text-[34px]">
            {s.v}
          </span>
          <span className="text-[13px] leading-tight text-(--v4-muted)">{s.l}</span>
        </div>
      ))}
    </section>
  );
}

export function TalkTile({ talk, className = "" }: TileProps & { talk: HomeTalk }) {
  const { t, lang } = useLang();
  return (
    <a id="talks" href={talk.href} className={`${tile} flex flex-col gap-4 p-6 ${className}`}>
      <span className={label}>{t.talkLabel}</span>
      <div className="flex items-center gap-3.5">
        {talk.thumbnail && (
          <div className="relative h-[76px] w-28 shrink-0 overflow-hidden rounded-xl bg-black">
            <Image src={talk.thumbnail} alt="" fill sizes="112px" className="object-cover" />
          </div>
        )}
        <span className="text-[17px] font-semibold leading-snug">{talk.title[lang]}</span>
      </div>
      <span className="mt-auto text-[13px] text-(--v4-muted)">
        {talk.date[lang]} · {talk.meta[lang]}
      </span>
    </a>
  );
}

export function ProjectsTile({
  projects,
  className = "",
}: TileProps & { projects: HomeProject[] }) {
  const { t, lang } = useLang();
  return (
    <section
      id="projects"
      className={`flex flex-col gap-1.5 rounded-3xl border border-(--v4-line) bg-(--v4-s1) p-6 ${className}`}
    >
      <h2 className={`${label} m-0 mb-2 font-normal`}>{t.projLabel}</h2>
      {projects.map((p) => (
        <a
          key={p.name}
          href={p.href}
          className="group flex min-h-11 items-center justify-between gap-3 border-t border-(--v4-line) py-3"
        >
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-base font-semibold">
              {p.name} <span className="text-sm font-normal text-(--v4-muted)">· {p.tag[lang]}</span>
            </span>
            <span className="truncate text-[13px] text-(--v4-muted)">{p.desc[lang]}</span>
          </span>
          <ArrowUpRight
            aria-hidden
            className="size-[18px] shrink-0 text-(--v4-acc) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      ))}
    </section>
  );
}

export function CommunityTile({
  socials,
  className = "",
}: TileProps & { socials: Array<{ label: string; href: string }> }) {
  const { t } = useLang();
  return (
    <section
      className={`flex flex-col gap-3.5 rounded-3xl bg-(--v4-acc) p-6 text-(--v4-acc-ink) ${className}`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.06em]">{t.commLabel}</span>
      <span className="v4-display text-2xl font-bold leading-[1.1] tracking-[-0.03em]">
        {t.commTitle}
      </span>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {socials.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="inline-flex min-h-10 items-center rounded-full border-[1.5px] border-current px-3 text-[13px] font-semibold transition-colors hover:bg-(--v4-acc-ink) hover:text-(--v4-acc)"
          >
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
