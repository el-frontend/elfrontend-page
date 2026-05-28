"use client";

import ElFrontendLogo from "@/components/icons/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useArcade } from "../../context/arcade-context";
import { PxArrow } from "../sprites/pixel";

type NavKey = "home" | "about" | "skills" | "projects" | "videos" | "blog" | "contact";

// Sections that exist on the home page as anchors. Anything else gets its own URL.
const HOME_ANCHORS: Record<NavKey, string> = {
  home: "/#home",
  about: "/#about",
  skills: "/#skills",
  projects: "/#projects",
  videos: "/#videos",
  blog: "/blog",
  contact: "/#contact",
};

export function Nav() {
  const { copy } = useArcade();
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const items = Object.entries(copy.nav) as Array<[NavKey, string]>;

  const hrefFor = (key: NavKey) => {
    const target = HOME_ANCHORS[key];
    // On the home page, prefer in-page anchors so the URL stays clean.
    if (isHome && target.startsWith("/#")) return target.slice(1);
    return target;
  };

  const activeKey: NavKey = pathname.startsWith("/blog") ? "blog" : "home";

  return (
    <nav
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 32px",
        gap: 24,
        borderBottom: "4px dashed var(--dim-2)",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        aria-label="ElFrontend home"
        style={{ display: "flex", alignItems: "center", gap: 16 }}
      >
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            padding: 6,
            border: "3px solid var(--ink)",
            background: "var(--paper-2)",
            boxShadow: "3px 3px 0 var(--brand-deep)",
          }}
        >
          <ElFrontendLogo width={42} height={32} />
          <span
            className="arcade-blink"
            style={{
              position: "absolute",
              right: -8,
              bottom: -8,
              width: 12,
              height: 12,
              background: "var(--hot-yellow)",
              border: "2px solid #000",
            }}
          />
        </span>
        <span>
          <span
            className="pixel-text"
            style={{ display: "block", fontSize: 15, color: "var(--ink)", letterSpacing: "0.05em" }}
          >
            ElFrontend
          </span>
          <span
            className="pixel-text"
            style={{
              display: "block",
              fontSize: 8,
              color: "var(--hot-yellow)",
              letterSpacing: "0.2em",
              marginTop: 6,
            }}
          >
            {copy.appTag}
          </span>
        </span>
      </Link>

      <div
        className="pixel-text"
        style={{
          display: "flex",
          gap: 24,
          color: "var(--dim)",
          fontSize: 11,
          letterSpacing: "0.1em",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {items.map(([k, label]) => {
          const active = k === activeKey;
          const href = hrefFor(k);
          const isInternal = href.startsWith("/");
          const sharedStyle = {
            color: active ? "var(--hot-yellow)" : "var(--dim)",
            position: "relative" as const,
            padding: "4px 0",
          };
          const content = (
            <>
              {active && (
                <span
                  style={{
                    position: "absolute",
                    left: -16,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <PxArrow scale={2} color="var(--hot-yellow)" />
                </span>
              )}
              {label}
            </>
          );
          return isInternal ? (
            <Link key={k} href={href} style={sharedStyle}>
              {content}
            </Link>
          ) : (
            <a key={k} href={href} style={sharedStyle}>
              {content}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
