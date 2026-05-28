"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { setSoundEnabled } from "../audio";
import { ACCENT_OPTIONS, COPY, type AccentKey, type CopyByLang, type Difficulty, type Lang } from "../content/copy";

type ArcadeState = {
  lang: Lang;
  accent: AccentKey;
  difficulty: Difficulty;
  sound: boolean;
  crt: boolean;
};

type ArcadeContextValue = ArcadeState & {
  setLang: (lang: Lang) => void;
  setAccent: (accent: AccentKey) => void;
  cycleAccent: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setSound: (sound: boolean) => void;
  setCrt: (crt: boolean) => void;
  accentColor: string;
  accentDeep: string;
  copy: CopyByLang;
};

const ArcadeContext = createContext<ArcadeContextValue | null>(null);

const DEFAULT_STATE: ArcadeState = {
  lang: "en",
  accent: "purple",
  difficulty: "medium",
  sound: true,
  crt: true,
};

const STORAGE_KEY = "arcade:tweaks";

// Module-scope cache so getSnapshot returns a stable reference between
// reads (useSyncExternalStore requires referential stability).
let snapshot: ArcadeState = DEFAULT_STATE;

function readStorage(): ArcadeState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<ArcadeState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      snapshot = readStorage();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ArcadeState {
  // Refresh on first read on the client so we pick up persisted state.
  if (snapshot === DEFAULT_STATE) snapshot = readStorage();
  return snapshot;
}

function getServerSnapshot(): ArcadeState {
  return DEFAULT_STATE;
}

function commit(next: ArcadeState) {
  snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota errors
  }
  listeners.forEach((l) => l());
}

export function ArcadeProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const accentDef = useMemo(
    () => ACCENT_OPTIONS.find((a) => a.key === state.accent) ?? ACCENT_OPTIONS[0],
    [state.accent],
  );

  // Apply accent + CRT class to the arcade root (not body — to scope styling).
  useEffect(() => {
    const root = document.querySelector(".arcade-root") as HTMLElement | null;
    if (!root) return;
    root.style.setProperty("--brand", accentDef.color);
    root.style.setProperty("--brand-deep", accentDef.deep);
  }, [accentDef]);

  useEffect(() => {
    const root = document.querySelector(".arcade-root") as HTMLElement | null;
    if (!root) return;
    root.classList.toggle("crt-on", state.crt);
    root.classList.toggle("crt-off", !state.crt);
  }, [state.crt]);

  // Mirror the sound toggle into the audio module so blips respect it.
  useEffect(() => {
    setSoundEnabled(state.sound);
  }, [state.sound]);

  const setLang = useCallback((lang: Lang) => commit({ ...snapshot, lang }), []);
  const setAccent = useCallback((accent: AccentKey) => commit({ ...snapshot, accent }), []);
  const cycleAccent = useCallback(() => {
    const idx = ACCENT_OPTIONS.findIndex((a) => a.key === snapshot.accent);
    const next = ACCENT_OPTIONS[(idx + 1) % ACCENT_OPTIONS.length];
    commit({ ...snapshot, accent: next.key });
  }, []);
  const setDifficulty = useCallback(
    (difficulty: Difficulty) => commit({ ...snapshot, difficulty }),
    [],
  );
  const setSound = useCallback((sound: boolean) => commit({ ...snapshot, sound }), []);
  const setCrt = useCallback((crt: boolean) => commit({ ...snapshot, crt }), []);

  const value = useMemo<ArcadeContextValue>(
    () => ({
      ...state,
      setLang,
      setAccent,
      cycleAccent,
      setDifficulty,
      setSound,
      setCrt,
      accentColor: accentDef.color,
      accentDeep: accentDef.deep,
      copy: COPY[state.lang],
    }),
    [state, accentDef, setLang, setAccent, cycleAccent, setDifficulty, setSound, setCrt],
  );

  return <ArcadeContext.Provider value={value}>{children}</ArcadeContext.Provider>;
}

export function useArcade() {
  const ctx = useContext(ArcadeContext);
  if (!ctx) throw new Error("useArcade must be used inside <ArcadeProvider>");
  return ctx;
}
