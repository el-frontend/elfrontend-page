"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUp, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLang } from "../context/lang-context";

export function ChatTile({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const { messages, input, setInput, handleSubmit, append, status, error } = useChat({
    api: "/api/chat",
    experimental_throttle: 80,
  });
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const busy = status === "submitted" || status === "streaming";
  const hasMessages = messages.length > 0;

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  return (
    <section
      aria-labelledby="v4-ask"
      className={`flex flex-col gap-[18px] rounded-3xl border border-(--v4-line) bg-(--v4-s2) p-6 sm:p-7 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-(--v4-muted)">
          <span aria-hidden className="size-2 rounded-full bg-(--v4-acc)" />
          {t.askKicker}
        </span>
        <Sparkles aria-hidden className="size-[22px] text-(--v4-acc)" strokeWidth={1.8} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 id="v4-ask" className="v4-display m-0 text-[28px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[34px]">
          {t.askTitle}
        </h2>
        {!hasMessages && <p className="m-0 text-[15px] leading-normal text-(--v4-muted)">{t.askSub}</p>}
      </div>

      {hasMessages && (
        <div
          ref={scrollerRef}
          aria-live="polite"
          className="-mx-1 flex max-h-72 min-h-32 flex-col gap-3 overflow-y-auto px-1"
        >
          {messages.map((m) =>
            m.role === "user" ? (
              <p
                key={m.id}
                className="m-0 max-w-[85%] self-end rounded-2xl rounded-br-md bg-(--v4-acc) px-3.5 py-2.5 text-[15px] text-(--v4-acc-ink)"
              >
                <span className="sr-only">{t.askYou}: </span>
                {m.content}
              </p>
            ) : (
              <div
                key={m.id}
                className="max-w-[92%] self-start rounded-2xl rounded-bl-md border border-(--v4-line) bg-(--v4-s1) px-3.5 py-2.5 text-[15px] leading-relaxed [&_a]:text-(--v4-acc-text) [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
              </div>
            )
          )}
          {status === "submitted" && (
            <p className="m-0 self-start font-mono text-xs text-(--v4-muted)">{t.askThinking}</p>
          )}
          {error && <p className="m-0 self-start text-sm text-(--v4-acc-text)">{t.askError}</p>}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {t.chips.map((chip) => (
          <button
            key={chip}
            type="button"
            disabled={busy}
            onClick={() => append({ role: "user", content: chip })}
            className="min-h-10 rounded-full border border-(--v4-line) bg-(--v4-s1) px-3.5 py-2 text-sm text-(--v4-fg) transition-colors hover:border-(--v4-acc) disabled:opacity-60"
          >
            {chip}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto flex items-stretch gap-2">
        <label htmlFor="v4-q" className="sr-only">
          {t.askTitle}
        </label>
        <input
          id="v4-q"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.askPlaceholder}
          autoComplete="off"
          className="h-[52px] min-w-0 flex-1 rounded-[14px] border border-(--v4-line) bg-(--v4-bg) px-4 text-base text-(--v4-fg) placeholder:text-(--v4-muted) focus-visible:outline-2 focus-visible:outline-(--v4-acc)"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label={t.askSend}
          className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-(--v4-acc) text-(--v4-acc-ink) disabled:opacity-60"
        >
          <ArrowUp aria-hidden className="size-5" strokeWidth={2.2} />
        </button>
      </form>
    </section>
  );
}
