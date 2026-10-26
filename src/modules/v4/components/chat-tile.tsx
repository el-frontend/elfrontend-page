"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUp, RotateCcw, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLang } from "../context/lang-context";

export function ChatTile({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const { messages, setMessages, input, setInput, handleSubmit, append, status, error, stop } =
    useChat({ api: "/api/chat", experimental_throttle: 80 });
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const busy = status === "submitted" || status === "streaming";
  const hasMessages = messages.length > 0;
  const waitingForReply = busy && messages[messages.length - 1]?.role === "user";

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const reset = () => {
    stop();
    setMessages([]);
    setInput("");
  };

  return (
    <section
      aria-labelledby="v4-ask"
      // During a chat, lg:h-0 + min-h-full lets the intro tile set the row height and the
      // transcript scrolls inside. Before that the card sizes to its content so nothing overflows.
      className={`flex flex-col gap-4 rounded-3xl border border-(--v4-line) bg-(--v4-s2) p-6 sm:p-7 ${
        hasMessages ? "lg:h-0 lg:min-h-full" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-(--v4-muted)">
          <span aria-hidden className="size-2 rounded-full bg-(--v4-acc)" />
          {t.askKicker}
        </span>
        {hasMessages ? (
          <button
            type="button"
            onClick={reset}
            className="-mr-2 inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-(--v4-muted) transition-colors hover:bg-(--v4-s1) hover:text-(--v4-fg)"
          >
            <RotateCcw aria-hidden className="size-3.5" />
            {t.askReset}
          </button>
        ) : (
          <Sparkles aria-hidden className="size-[22px] text-(--v4-acc)" strokeWidth={1.8} />
        )}
      </div>

      <h2
        id="v4-ask"
        className={`v4-display m-0 font-bold leading-[1.05] tracking-[-0.03em] transition-[font-size] ${
          hasMessages ? "text-2xl" : "text-[28px] sm:text-[34px]"
        }`}
      >
        {t.askTitle}
      </h2>

      {hasMessages ? (
        <div
          ref={scrollerRef}
          aria-live="polite"
          className="v4-noscrollbar v4-fade-top -mx-2 flex max-h-[380px] min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-2 pt-3 lg:max-h-none"
        >
          {messages.map((m) =>
            m.role === "user" ? (
              <p
                key={m.id}
                className="m-0 max-w-[85%] self-end rounded-[18px] rounded-br-md bg-(--v4-acc) px-4 py-2.5 text-[15px] leading-snug text-(--v4-acc-ink) [overflow-wrap:anywhere]"
              >
                <span className="sr-only">{t.askYou}: </span>
                {m.content}
              </p>
            ) : (
              <AssistantRow key={m.id} label={t.askBot}>
                <div className="text-[15px] leading-relaxed [overflow-wrap:anywhere] [&_a]:font-medium [&_a]:text-(--v4-acc-text) [&_a]:underline [&_a]:underline-offset-2 [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                </div>
              </AssistantRow>
            )
          )}
          {waitingForReply && (
            <AssistantRow label={t.askBot}>
              <span className="v4-typing inline-flex h-5 items-center gap-1 text-(--v4-muted)" role="status">
                <span />
                <span />
                <span />
                <span className="sr-only">{t.askThinking}</span>
              </span>
            </AssistantRow>
          )}
          {error && (
            <p role="alert" className="m-0 self-start text-sm text-(--v4-acc-text)">
              {t.askError}
            </p>
          )}
        </div>
      ) : (
        <p className="m-0 text-[15px] leading-normal text-(--v4-muted)">{t.askSub}</p>
      )}

      <div className="flex shrink-0 flex-wrap gap-2">
        {t.chips.map((chip) => (
          <button
            key={chip}
            type="button"
            disabled={busy}
            onClick={() => append({ role: "user", content: chip })}
            className={`rounded-full border border-(--v4-line) bg-(--v4-s1) text-(--v4-fg) transition-colors hover:border-(--v4-acc) disabled:opacity-50 ${
              hasMessages ? "min-h-9 px-3 py-1.5 text-[13px]" : "min-h-10 px-3.5 py-2 text-sm"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={`flex shrink-0 items-stretch gap-2 ${hasMessages ? "" : "mt-auto"}`}>
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
          className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-(--v4-acc) text-(--v4-acc-ink) transition-opacity disabled:opacity-50"
        >
          <ArrowUp aria-hidden className="size-5" strokeWidth={2.2} />
        </button>
      </form>
    </section>
  );
}

function AssistantRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex max-w-[94%] items-start gap-2.5 self-start">
      <Image
        src="/images/avatar.webp"
        alt=""
        width={28}
        height={28}
        className="mt-0.5 size-7 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 rounded-[18px] rounded-tl-md bg-(--v4-s1) px-4 py-3">
        <span className="sr-only">{label}: </span>
        {children}
      </div>
    </div>
  );
}
