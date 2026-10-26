"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import { LangProvider, useLang } from "../context/lang-context";
import { Header } from "./header";

/** Page frame shared by every v4 page: tokens, header, footer. */
export function V4Shell({ children }: PropsWithChildren) {
  return (
    <LangProvider>
      <div className="v4 min-h-screen font-sans">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 pb-12 pt-4 sm:px-8 sm:pt-6">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </LangProvider>
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
