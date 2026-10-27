"use client";

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitchIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { ExternalLink, Globe, Share } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ComponentType, SVGProps, useCallback, useEffect, useSyncExternalStore } from "react";
import { toast } from "sonner";

import type { WalletCard, WalletCardId } from "../server/cards";

const BRAND: Record<
  WalletCardId,
  { bg: string; icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  linkedin: { bg: "linear-gradient(160deg,#1a7fe0 0%,#0a66c2 45%,#00427f 100%)", icon: LinkedinIcon },
  instagram: {
    bg: "linear-gradient(150deg,#fdc468 0%,#f77737 25%,#e1306c 55%,#c13584 75%,#5851db 100%)",
    icon: InstagramIcon,
  },
  youtube: { bg: "linear-gradient(160deg,#ff3355 0%,#e00022 50%,#99001a 100%)", icon: YoutubeIcon },
  x: { bg: "linear-gradient(160deg,#2a2a2e 0%,#121214 60%,#000 100%)", icon: XIcon },
  github: { bg: "linear-gradient(160deg,#3b434b 0%,#24292f 50%,#0d1117 100%)", icon: GithubIcon },
  twitch: { bg: "linear-gradient(160deg,#a970ff 0%,#9146ff 45%,#5c16c5 100%)", icon: TwitchIcon },
  web: { bg: "linear-gradient(160deg,#ff8a5c 0%,#ff6a3d 45%,#c2410c 100%)", icon: Globe },
};

/** Visible strip of each card while stacked. */
const PEEK = 64;
/** Card height while stacked (credit-card face). */
const FACE = 212;
/** Card height when opened as a pass. */
const PASS = 500;
/** Gap between the open pass and the pile of the other cards. */
const PILE_GAP = 28;
/** Offset between cards in the pile. */
const PILE_STEP = 9;

const spring = { type: "spring", stiffness: 380, damping: 36, mass: 0.9 } as const;

// The open card lives in the URL hash, so /wallet#linkedin deep-links to it.
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

export function Wallet({ cards, name }: { cards: WalletCard[]; name: string }) {
  const hash = useSyncExternalStore(
    subscribeHash,
    () => window.location.hash.slice(1),
    () => "",
  );
  const openId = cards.find((c) => c.id === hash)?.id ?? null;

  const open = useCallback((id: WalletCardId | null) => {
    window.history.replaceState(null, "", id ? `#${id}` : window.location.pathname);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && open(null);
    window.addEventListener("keydown", onKey);

    // Keep the screen awake while someone scans the code.
    let lock: WakeLockSentinel | undefined;
    navigator.wakeLock
      ?.request("screen")
      .then((l) => (lock = l))
      .catch(() => {});

    return () => {
      window.removeEventListener("keydown", onKey);
      lock?.release().catch(() => {});
    };
  }, [openId, open]);

  const openIndex = cards.findIndex((c) => c.id === openId);
  const others = cards.filter((c) => c.id !== openId);

  const height = openId
    ? PASS + PILE_GAP + (others.length - 1) * PILE_STEP + PEEK
    : (cards.length - 1) * PEEK + FACE;

  return (
    <MotionConfig reducedMotion="user">
      <main
        className={cn(
          "min-h-dvh bg-[#f2f2f7] text-black dark:bg-black dark:text-white",
          "[font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display',system-ui,sans-serif]",
          "px-4 pt-[max(env(safe-area-inset-top),20px)] pb-[max(env(safe-area-inset-bottom),24px)]",
        )}
      >
        <div className="mx-auto w-full max-w-[420px]">
          <header className="flex items-end justify-between pt-6 pb-5">
            <div>
              <p className="text-[13px] font-semibold tracking-wide text-black/45 uppercase dark:text-white/45">
                {name}
              </p>
              <h1 className="text-[34px] leading-tight font-bold tracking-tight">Wallet</h1>
            </div>
            <AnimatePresence>
              {openId && (
                <motion.button
                  type="button"
                  onClick={() => open(null)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-1.5 rounded-full bg-black/[0.07] px-4 py-1.5 text-[15px] font-semibold text-[#007aff] dark:bg-white/[0.12] dark:text-[#0a84ff]"
                >
                  Listo
                </motion.button>
              )}
            </AnimatePresence>
          </header>

          <motion.ul
            className="relative"
            initial={false}
            animate={{ height }}
            transition={spring}
          >
            {cards.map((card, i) => {
              const isOpen = card.id === openId;
              const pileIndex = others.findIndex((c) => c.id === card.id);
              const y = !openId
                ? i * PEEK
                : isOpen
                  ? 0
                  : PASS + PILE_GAP + pileIndex * PILE_STEP;
              const scale = openId && !isOpen ? 1 - (others.length - pileIndex) * 0.012 : 1;

              return (
                <motion.li
                  key={card.id}
                  className="absolute inset-x-0 top-0"
                  style={{ zIndex: isOpen ? 50 : i }}
                  initial={false}
                  animate={{ y, scale }}
                  transition={{ ...spring, delay: openId && !isOpen ? 0.02 * pileIndex : 0 }}
                >
                  <Card
                    card={card}
                    name={name}
                    isOpen={isOpen}
                    isLast={!openId && i === cards.length - 1}
                    dimmed={openIndex !== -1 && !isOpen}
                    onToggle={() => open(isOpen ? null : openId ? null : card.id)}
                    onClose={() => open(null)}
                  />
                </motion.li>
              );
            })}
          </motion.ul>

          <AnimatePresence>
            {!openId && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 text-center text-[13px] text-black/40 dark:text-white/40"
              >
                Toca una tarjeta para mostrar su código QR
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </main>
    </MotionConfig>
  );
}

function Card({
  card,
  name,
  isOpen,
  isLast,
  dimmed,
  onToggle,
  onClose,
}: {
  card: WalletCard;
  name: string;
  isOpen: boolean;
  isLast: boolean;
  dimmed: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const { bg, icon: Icon } = BRAND[card.id];

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${name} · ${card.label}`, url: card.href });
      } else {
        await navigator.clipboard.writeText(card.href);
        toast.success("Enlace copiado");
      }
    } catch {
      // Share sheet dismissed.
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-[18px] text-white shadow-[0_-1px_0_rgba(255,255,255,0.18)_inset,0_8px_24px_-8px_rgba(0,0,0,0.45)]"
      style={{ background: bg }}
      initial={false}
      animate={{ height: isOpen ? PASS : dimmed ? PEEK : FACE, opacity: dimmed ? 0.92 : 1 }}
      transition={spring}
      drag={isOpen ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.05, bottom: 0.5 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 90 || info.velocity.y > 600) onClose();
      }}
    >
      {/* Sheen */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_0%,rgba(255,255,255,0.22),transparent_60%)]" />
      {/* Watermark */}
      <Icon
        aria-hidden
        strokeWidth={1.2}
        className="pointer-events-none absolute -right-8 -bottom-10 size-48 text-white/[0.09]"
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? `Cerrar ${card.label}` : `Mostrar QR de ${card.label}`}
        className="relative flex h-16 w-full items-center gap-3 px-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-inset"
      >
        <span className="grid size-9 place-items-center rounded-[10px] bg-white/20 backdrop-blur-sm">
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <span className="flex-1 truncate text-[17px] font-semibold tracking-tight">
          {card.label}
        </span>
        <span className="truncate text-[13px] font-medium text-white/80">{card.handle}</span>
      </button>

      {/* Credit-card face: only visible on the front card of the stack */}
      <AnimatePresence initial={false}>
        {isLast && !isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-x-4 bottom-4"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
              Titular
            </p>
            <p className="text-[19px] font-semibold tracking-tight">{name}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.25 } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="relative flex flex-col items-center px-5 pb-5"
          >
            <div className="flex w-full justify-between border-t border-white/20 pt-3 text-left">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
                  Nombre
                </p>
                <p className="text-[17px] font-semibold">{name}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
                  Usuario
                </p>
                <p className="text-[17px] font-semibold">{card.handle}</p>
              </div>
            </div>

            <div
              role="img"
              aria-label={`Código QR para ${card.href}`}
              className="mt-5 rounded-[16px] bg-white p-4 shadow-lg [&_svg]:block [&_svg]:size-[208px]"
              dangerouslySetInnerHTML={{ __html: card.qr }}
            />
            <p className="mt-2.5 text-[13px] text-white/80">Escanea para seguirme</p>

            <div className="mt-auto flex w-full gap-2 pt-5">
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white/20 text-[15px] font-semibold backdrop-blur-sm active:bg-white/30"
              >
                <ExternalLink className="size-4" /> Abrir
              </a>
              <button
                type="button"
                onClick={share}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[15px] font-semibold text-black active:bg-white/85"
              >
                <Share className="size-4" /> Compartir
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
