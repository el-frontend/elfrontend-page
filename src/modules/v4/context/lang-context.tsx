"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { V4_COPY, type V4Copy } from "../content/copy";
import type { Lang } from "../types";

const STORAGE_KEY = "ef-v4-lang";

type LangContextValue = { lang: Lang; t: V4Copy; toggleLang: () => void };

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: PropsWithChildren) {
  // Spanish first: it's the audience's language. A saved choice wins after mount.
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from storage once after hydration
      if (saved === "en" || saved === "es") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next = current === "es" ? "en" : "es";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: V4_COPY[lang] as V4Copy, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
