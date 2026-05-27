"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useArcade } from "../../context/arcade-context";
import { PROJECTS, SKILL_GROUPS } from "../../content/data";
import { PxArrow } from "../sprites/pixel";

type Line = { kind: "in" | "out" | "sys"; text: string };

const BANNER_EN = [
  "ElFrontend Terminal — Arcade Edition · type 'help' to see commands.",
];
const BANNER_ES = [
  "Terminal ElFrontend — Edición Arcade · escribe 'help' para ver comandos.",
];

export function TerminalSection() {
  const { copy, accentColor, lang } = useArcade();
  const [lines, setLines] = useState<Line[]>(
    () => (lang === "es" ? BANNER_ES : BANNER_EN).map((t) => ({ kind: "sys", text: t })),
  );
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const focus = useCallback(() => inputRef.current?.focus(), []);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const next: Line[] = [...lines, { kind: "in", text: `> ${cmd}` }];

      const push = (text: string) => next.push({ kind: "out", text });

      const c = cmd.toLowerCase();
      if (!c) {
        // noop
      } else if (c === "help" || c === "?") {
        push(lang === "es" ? "Comandos disponibles:" : "Available commands:");
        push("  help          " + (lang === "es" ? "muestra este mensaje" : "show this message"));
        push("  about         " + (lang === "es" ? "sobre Carlos" : "about Carlos"));
        push("  skills        " + (lang === "es" ? "stack y nivel" : "stack and levels"));
        push("  projects      " + (lang === "es" ? "lista de proyectos" : "list projects"));
        push("  socials       " + (lang === "es" ? "redes sociales" : "social links"));
        push("  whoami        " + (lang === "es" ? "tú" : "you"));
        push("  date          " + (lang === "es" ? "fecha actual" : "current date"));
        push("  clear         " + (lang === "es" ? "limpia la pantalla" : "clear the screen"));
      } else if (c === "about") {
        push(copy.aboutBody.medium);
      } else if (c === "skills") {
        SKILL_GROUPS.forEach((g) => {
          push(`# ${g.name[lang]}`);
          g.skills.forEach((s) => {
            const stars = "★".repeat(s.level) + "·".repeat(3 - s.level);
            push(`  ${stars}  ${s.name}  (${s.years})`);
          });
        });
      } else if (c === "projects") {
        PROJECTS.forEach((p, i) => {
          push(
            `  [${(i + 1).toString().padStart(2, "0")}] ${p.name} — ${p.year}  → ${p.href}`,
          );
        });
      } else if (c === "socials") {
        push("  youtube  https://youtube.com/@ElFrontend");
        push("  github   https://github.com/el-frontend");
        push("  x        https://x.com/elfrontend");
        push("  linkedin https://linkedin.com/in/carlos-chao");
      } else if (c === "whoami") {
        push("guest@elfrontend.arcade");
      } else if (c === "date") {
        push(new Date().toString());
      } else if (c === "clear" || c === "cls") {
        setLines([]);
        setDraft("");
        return;
      } else {
        push(
          lang === "es"
            ? `Comando no encontrado: "${cmd}". Prueba 'help'.`
            : `Command not found: "${cmd}". Try 'help'.`,
        );
      }

      setLines(next);
      setHistory((h) => (cmd ? [...h, cmd] : h));
      setHistIdx(-1);
      setDraft("");
    },
    [copy.aboutBody.medium, lang, lines],
  );

  return (
    <section style={{ padding: "72px 32px" }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage">
              <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.terminal}
            </div>
            <h2 className="sec-title">
              {copy.terminalTitle} <em style={{ color: accentColor }}>{copy.terminalTitleEm}</em>
            </h2>
            <p className="sec-sub">{copy.terminalSub}</p>
          </div>
        </div>

        <div
          onClick={focus}
          style={{
            background: "#000",
            border: "4px solid var(--ink)",
            boxShadow: "6px 6px 0 var(--brand-deep)",
            display: "flex",
            flexDirection: "column",
            minHeight: 360,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px",
              borderBottom: "3px solid var(--ink)",
              background: "var(--paper-2)",
            }}
          >
            <span style={{ display: "inline-flex", gap: 8 }}>
              <Dot color="var(--hot-red)" />
              <Dot color="var(--hot-yellow)" />
              <Dot color="var(--hot-green)" />
            </span>
            <span
              className="pixel-text"
              style={{
                fontSize: 9,
                color: "var(--dim)",
                letterSpacing: "0.2em",
              }}
            >
              /BIN/ARCADE
            </span>
          </div>

          <div
            ref={scrollerRef}
            style={{
              flex: 1,
              padding: "16px 18px",
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--ink)",
              maxHeight: 360,
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {lines.map((l, i) => (
              <div
                key={i}
                style={{
                  color:
                    l.kind === "in"
                      ? accentColor
                      : l.kind === "sys"
                        ? "var(--hot-green)"
                        : "var(--ink)",
                }}
              >
                {l.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(draft);
            }}
            style={{
              display: "flex",
              gap: 8,
              padding: "10px 14px",
              borderTop: "3px solid var(--ink)",
              alignItems: "center",
            }}
          >
            <span style={{ color: accentColor, fontFamily: "var(--font-mono)", fontSize: 14 }}>
              guest@arcade ›
            </span>
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  if (history.length === 0) return;
                  const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
                  setHistIdx(idx);
                  setDraft(history[idx] ?? "");
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  if (histIdx === -1) return;
                  const idx = histIdx + 1;
                  if (idx >= history.length) {
                    setHistIdx(-1);
                    setDraft("");
                  } else {
                    setHistIdx(idx);
                    setDraft(history[idx] ?? "");
                  }
                }
              }}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              style={{
                flex: 1,
                background: "transparent",
                border: 0,
                outline: "none",
                color: "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                caretColor: accentColor,
              }}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 12,
        height: 12,
        background: color,
        border: "2px solid #000",
        display: "inline-block",
      }}
    />
  );
}
