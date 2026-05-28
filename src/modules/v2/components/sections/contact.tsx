"use client";

import { useState } from "react";
import { playClick, playPowerUp, playType } from "../../audio";
import { useArcade } from "../../context/arcade-context";
import { PxArrow, PxHeart, PxMushroom, PxStar, PxTrophy } from "../sprites/pixel";

const fieldStyle = (accent: string): React.CSSProperties => ({
  background: "#000",
  color: "var(--ink)",
  border: "3px solid var(--dim-2)",
  padding: "12px 14px",
  fontFamily: "var(--font-pixel-body)",
  fontSize: 22,
  outline: "none",
  caretColor: accent,
});

export function ContactSection() {
  const { copy, accentColor } = useArcade();
  const [form, setForm] = useState({
    name: "",
    email: "",
    kind: copy.contactKinds[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    playPowerUp();
    setSent(true);
  };

  const onTypeKey: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (e.key.length === 1) playType();
  };

  const reset = () => {
    setSent(false);
    setForm({ name: "", email: "", kind: copy.contactKinds[0], message: "" });
  };

  return (
    <section
      id="contact"
      style={{
        padding: "72px 32px",
        background: "var(--paper-2)",
        borderTop: "4px solid var(--dim-2)",
      }}
    >
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage">
              <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.contact}
            </div>
            <h2 className="sec-title">
              {copy.contactTitle} <em style={{ color: accentColor }}>{copy.contactTitleEm}</em>
            </h2>
            <p className="sec-sub">{copy.contactSub}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <PxMushroom scale={3} />
            <PxTrophy scale={3} color="var(--hot-yellow)" />
          </div>
        </div>

        {sent ? (
          <div
            style={{
              padding: "52px 32px",
              textAlign: "center",
              background: "var(--paper)",
              border: "4px solid var(--hot-green)",
              boxShadow: "6px 6px 0 var(--brand)",
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            <div style={{ display: "inline-flex", gap: 8, marginBottom: 18 }}>
              <PxStar scale={4} />
              <PxStar scale={4} />
              <PxStar scale={4} />
            </div>
            <div
              className="pixel-text"
              style={{
                fontSize: 18,
                color: "var(--hot-green)",
                letterSpacing: "0.1em",
                marginBottom: 14,
              }}
            >
              {copy.contactSent}
            </div>
            <p
              style={{
                margin: "0 0 24px",
                fontFamily: "var(--font-pixel-body)",
                fontSize: 21,
                color: "var(--ink)",
              }}
            >
              {copy.contactReply}
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "3px solid var(--ink)",
                padding: "12px 20px",
                fontFamily: "var(--font-pixel)",
                fontSize: 10,
                letterSpacing: "0.15em",
                cursor: "pointer",
              }}
            >
              {copy.contactPlayAgain}
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            style={{
              maxWidth: 720,
              margin: "0 auto",
              background: "var(--paper)",
              border: "4px solid var(--ink)",
              boxShadow: "8px 8px 0 var(--brand-deep)",
              padding: 36,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <div
              className="grid-2"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}
            >
              <FormField label={copy.contactName} required>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onKeyDown={onTypeKey}
                  placeholder="P1"
                  style={fieldStyle(accentColor)}
                />
              </FormField>
              <FormField label={copy.contactEmail} required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onKeyDown={onTypeKey}
                  placeholder="hi@your.email"
                  style={fieldStyle(accentColor)}
                />
              </FormField>
            </div>

            <FormField label={copy.contactKind}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {copy.contactKinds.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => {
                      playClick();
                      setForm({ ...form, kind: k });
                    }}
                    style={{
                      background: form.kind === k ? accentColor : "transparent",
                      color: form.kind === k ? "#000" : "var(--ink)",
                      border: `3px solid ${form.kind === k ? accentColor : "var(--dim-2)"}`,
                      padding: "10px 14px",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      cursor: "pointer",
                    }}
                  >
                    {k.toUpperCase()}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label={copy.contactMessage} required>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onKeyDown={onTypeKey}
                placeholder={copy.contactPlaceholder}
                rows={5}
                style={{
                  ...fieldStyle(accentColor),
                  resize: "vertical",
                  minHeight: 120,
                  lineHeight: 1.4,
                }}
              />
            </FormField>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 18,
                flexWrap: "wrap",
              }}
            >
              <div
                className="pixel-text"
                style={{
                  fontSize: 9,
                  color: "var(--dim)",
                  letterSpacing: "0.15em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <PxHeart scale={2} /> {copy.contactNoSpam}
              </div>
              <button
                type="submit"
                style={{
                  background: accentColor,
                  color: "#000",
                  border: "4px solid var(--ink)",
                  padding: "14px 26px",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  boxShadow: "4px 4px 0 var(--brand-deep)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <PxArrow scale={2} color="#000" /> {copy.contactSend}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span
        className="pixel-text"
        style={{ fontSize: 9, color: "var(--hot-yellow)", letterSpacing: "0.2em" }}
      >
        {label} {required && <span style={{ color: "var(--hot-red)" }}>*</span>}
      </span>
      {children}
    </label>
  );
}
