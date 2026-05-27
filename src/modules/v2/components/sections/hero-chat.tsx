"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { useArcade } from "../../context/arcade-context";
import { PxArrow, PxAvatar, PxHeart } from "../sprites/pixel";

export function HeroChat() {
  const { copy, accentColor } = useArcade();
  const { messages, input, setInput, handleSubmit, append, status } = useChat({
    api: "/api/chat",
    experimental_throttle: 80,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const focus = () => inputRef.current?.focus();
  const askChip = (q: string) => append({ role: "user", content: q });

  return (
    <div
      style={{
        maxWidth: 880,
        margin: "0 auto",
        background: "#000",
        border: "4px solid var(--ink)",
        boxShadow: "8px 8px 0 var(--brand-deep)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 18px 12px",
          borderBottom: "2px dashed var(--dim-2)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            background: "var(--hot-green)",
            boxShadow: "0 0 8px var(--hot-green)",
          }}
        />
        <span
          className="pixel-text"
          style={{ fontSize: 9, color: "var(--ink)", letterSpacing: "0.18em" }}
        >
          AI · ONLINE · CARLOS-AI
        </span>
        <span
          className="pixel-text"
          style={{
            marginLeft: "auto",
            fontSize: 9,
            color: "var(--dim)",
            letterSpacing: "0.15em",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <PxHeart scale={2} color="var(--hot-pink)" /> 3 / 3
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollerRef}
        style={{
          padding: "20px 22px",
          minHeight: 200,
          maxHeight: 340,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          background: "#000",
        }}
      >
        {messages.length === 0 && !isLoading ? (
          <div
            className="pixel-text"
            style={{
              fontSize: 12,
              color: accentColor,
              letterSpacing: "0.12em",
              textAlign: "center",
              padding: "8px 0",
            }}
          >
            ► {copy.pressStart}
          </div>
        ) : (
          messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <MessageRow
                key={m.id}
                isUser={isUser}
                accentColor={accentColor}
                content={m.content}
              />
            );
          })
        )}
        {isLoading && <LoadingRow accentColor={accentColor} />}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#000",
          borderTop: "4px solid var(--ink)",
          padding: "4px 4px 4px 16px",
        }}
      >
        <span
          style={{
            color: accentColor,
            fontFamily: "var(--font-mono)",
            fontSize: 18,
            fontWeight: 700,
            marginRight: 8,
          }}
        >
          ›
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={focus}
          placeholder={copy.askPlaceholder}
          aria-label="Ask Carlos"
          disabled={isLoading}
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            outline: "none",
            color: "var(--ink)",
            fontFamily: "var(--font-pixel-body)",
            fontSize: 22,
            padding: "12px 0",
            caretColor: accentColor,
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          style={{
            background: accentColor,
            color: "#000",
            border: "3px solid var(--ink)",
            padding: "12px 22px",
            fontFamily: "var(--font-pixel)",
            fontSize: 11,
            letterSpacing: "0.15em",
            cursor: !input.trim() || isLoading ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            opacity: !input.trim() || isLoading ? 0.5 : 1,
          }}
        >
          <PxArrow scale={2} color="#000" /> {copy.startBtn}
        </button>
      </form>

      {/* Chips */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          padding: "14px 18px",
          borderTop: "2px dashed var(--dim-2)",
          justifyContent: "center",
        }}
      >
        {copy.chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => askChip(c)}
            disabled={isLoading}
            style={{
              background: "transparent",
              color: "var(--dim)",
              border: "3px solid var(--dim-2)",
              padding: "10px 14px",
              fontFamily: "var(--font-pixel-body)",
              fontSize: 18,
              cursor: isLoading ? "not-allowed" : "pointer",
              letterSpacing: "0.02em",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageRow({
  isUser,
  accentColor,
  content,
}: {
  isUser: boolean;
  accentColor: string;
  content: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: isUser ? "flex-end" : "flex-start",
        alignItems: "flex-start",
      }}
    >
      {!isUser && (
        <div
          style={{
            flexShrink: 0,
            padding: 4,
            border: `2px solid ${accentColor}`,
            background: "var(--paper-2)",
            display: "inline-flex",
          }}
        >
          <PxAvatar scale={2} bg="#000" shirt={accentColor} />
        </div>
      )}
      <div
        style={{
          maxWidth: "78%",
          padding: "10px 14px",
          background: isUser ? accentColor : "transparent",
          border: isUser ? "none" : "2px solid var(--dim-2)",
          color: isUser ? "#000" : "var(--ink)",
          fontFamily: "var(--font-pixel-body)",
          fontSize: 19,
          lineHeight: 1.35,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {content}
      </div>
      {isUser && (
        <div
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            background: accentColor,
            color: "#000",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-pixel)",
            fontSize: 11,
            fontWeight: 700,
            border: "2px solid var(--ink)",
          }}
        >
          P1
        </div>
      )}
    </div>
  );
}

function LoadingRow({ accentColor }: { accentColor: string }) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-start", alignItems: "flex-start" }}>
      <div
        style={{
          flexShrink: 0,
          padding: 4,
          border: `2px solid ${accentColor}`,
          background: "var(--paper-2)",
          display: "inline-flex",
        }}
      >
        <PxAvatar scale={2} bg="#000" shirt={accentColor} />
      </div>
      <div
        style={{
          padding: "10px 14px",
          border: "2px solid var(--dim-2)",
          fontFamily: "var(--font-pixel)",
          fontSize: 11,
          color: "var(--hot-yellow)",
          letterSpacing: "0.15em",
          display: "inline-flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        LOADING
        <span style={{ display: "inline-flex", gap: 3 }}>
          <Dot delay="0s" />
          <Dot delay="0.15s" />
          <Dot delay="0.3s" />
        </span>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="arcade-blink"
      style={{
        width: 6,
        height: 6,
        background: "var(--hot-yellow)",
        animationDelay: delay,
      }}
    />
  );
}
