"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChatTile } from "../components/chat-tile";
import { V4Shell } from "../components/shell";
import { useLang } from "../context/lang-context";

export function V4NotFound() {
  return (
    <V4Shell>
      <NotFoundInner />
    </V4Shell>
  );
}

function NotFoundInner() {
  const { t } = useLang();
  return (
    <main className="grid grid-cols-12 gap-3 sm:gap-4">
      <section className="col-span-12 flex flex-col justify-between gap-8 rounded-3xl border border-(--v4-line) bg-(--v4-s1) p-6 sm:p-9 lg:col-span-7 lg:min-h-[480px]">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-(--v4-muted)">
          <span aria-hidden className="size-2 rounded-full bg-(--v4-acc)" />
          {t.nfKicker}
        </span>
        <div className="flex flex-col gap-[18px]">
          <span
            aria-hidden
            className="v4-display text-[96px] font-extrabold leading-[0.85] tracking-[-0.06em] text-(--v4-acc) sm:text-[160px]"
          >
            404
          </span>
          <h1 className="v4-display m-0 text-[36px] font-extrabold leading-[1] tracking-[-0.045em] sm:text-[52px]">
            {t.nfTitle}
          </h1>
          <p className="m-0 max-w-[520px] text-base leading-relaxed text-(--v4-muted) sm:text-lg">
            {t.nfSub}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-(--v4-fg) px-4 text-[15px] font-semibold text-(--v4-bg) sm:flex-none sm:px-[22px]"
          >
            {t.nfHome}
            <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-[14px] border border-(--v4-line) px-4 text-[15px] font-semibold text-(--v4-fg) sm:flex-none sm:px-[22px]"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </section>
      <ChatTile className="col-span-12 lg:col-span-5" />
    </main>
  );
}
