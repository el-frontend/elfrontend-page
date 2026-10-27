import { AUTHOR } from "@/lib/metadata";
import { Wallet } from "@/modules/wallet/components/wallet";
import { getWalletCards } from "@/modules/wallet/server/cards";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Mis redes en un toque: escanea el QR de cada tarjeta.",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "Wallet", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function WalletPage() {
  const cards = await getWalletCards();
  return <Wallet cards={cards} name={AUTHOR.name} />;
}
