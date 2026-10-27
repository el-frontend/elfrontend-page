import QRCode from "qrcode";

import { SITE_URL } from "@/lib/metadata";
import { SOCIALS } from "@/modules/v2/content/data";

export type WalletCardId = (typeof SOCIALS)[number]["id"] | "web";

export type WalletCard = {
  id: WalletCardId;
  label: string;
  handle: string;
  href: string;
  /** Inline SVG markup of the QR code for `href`. */
  qr: string;
};

// Wallet order: the networks shared most in person first.
const ORDER: WalletCardId[] = [
  "linkedin",
  "instagram",
  "youtube",
  "x",
  "github",
  "twitch",
  "web",
];

const handleFrom = (href: string) => {
  const { hostname, pathname } = new URL(href);
  const path = pathname.replace(/\/$/, "").split("/").pop() ?? "";
  if (!path) return hostname.replace(/^www\./, "");
  return path.startsWith("@") ? path : `@${path}`;
};

const toQr = (href: string) =>
  QRCode.toString(href, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark: "#000000", light: "#00000000" },
  });

export async function getWalletCards(): Promise<WalletCard[]> {
  const entries = [
    ...SOCIALS.map((s) => ({ id: s.id as WalletCardId, label: s.label, href: s.href })),
    { id: "web" as const, label: "ElFrontend", href: SITE_URL },
  ].sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

  return Promise.all(
    entries.map(async (e) => ({
      ...e,
      handle: e.id === "web" ? new URL(e.href).hostname : handleFrom(e.href),
      qr: await toQr(e.href),
    })),
  );
}
