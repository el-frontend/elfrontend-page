"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "../context/lang-context";

const iconButton =
  "inline-flex size-11 items-center justify-center rounded-full border border-(--v4-line) bg-(--v4-s1) text-(--v4-fg) transition-colors hover:border-(--v4-acc) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--v4-acc)";

export function Header() {
  const { t, toggleLang } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#videos", label: t.navVideos },
    { href: "/blog", label: t.navBlog },
    { href: "#talks", label: t.navTalks },
    { href: "#projects", label: t.navProjects },
  ];

  return (
    <header className="relative flex items-center justify-between gap-4 pb-3 pt-1">
      <Link
        href="/"
        aria-label={t.homeAria}
        className="v4-display inline-flex items-baseline text-[26px] font-extrabold tracking-[-0.04em] text-(--v4-fg)"
      >
        elfrontend
        <span aria-hidden className="ml-0.5 inline-block size-[9px] rounded-[2px] bg-(--v4-acc)" />
      </Link>

      <nav aria-label={t.navAria} className="hidden gap-1.5 text-sm font-medium md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full px-3.5 py-2.5 text-(--v4-muted) transition-colors hover:text-(--v4-fg)"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleLang}
          aria-label={t.switchLangAria}
          className={`${iconButton} w-auto min-w-11 px-3.5 font-mono text-[13px] font-medium`}
        >
          {t.switchLang}
        </button>
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label={t.themeAria}
          className={iconButton}
        >
          <Sun aria-hidden className="hidden size-[18px] dark:block" />
          <Moon aria-hidden className="size-[18px] dark:hidden" />
        </button>
        <a
          href="https://youtube.com/@ElFrontend"
          className="hidden h-11 items-center rounded-full bg-(--v4-acc) px-[18px] text-sm font-semibold text-(--v4-acc-ink) sm:inline-flex"
        >
          {t.subscribe}
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t.menuClose : t.menuOpen}
          aria-expanded={menuOpen}
          aria-controls="v4-mobile-menu"
          className="inline-flex size-11 items-center justify-center rounded-full bg-(--v4-acc) text-(--v4-acc-ink) md:hidden"
        >
          {menuOpen ? <X aria-hidden className="size-[18px]" /> : <Menu aria-hidden className="size-[18px]" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="v4-mobile-menu"
          aria-label={t.navAria}
          className="absolute inset-x-0 top-full z-20 mt-1 flex flex-col rounded-3xl border border-(--v4-line) bg-(--v4-s1) p-2 shadow-xl md:hidden"
        >
          {[...links, { href: "https://youtube.com/@ElFrontend", label: t.subscribe }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3.5 text-base font-medium text-(--v4-fg) hover:bg-(--v4-s2)"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
