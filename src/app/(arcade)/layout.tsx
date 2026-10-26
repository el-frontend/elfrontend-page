import "@/modules/v2/styles/arcade.css";
import { RSS_ALTERNATE, SITE_URL } from "@/lib/metadata";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: { absolute: "ElFrontend · Arcade Edition", template: "%s · ElFrontend" },
  description:
    "Carlos Chao — software architect, React/Next.js educator, ElFrontend community. Press start to talk to me.",
  alternates: { canonical: SITE_URL, types: RSS_ALTERNATE },
};

export default function ArcadeLayout({ children }: PropsWithChildren) {
  return <div className="arcade-root">{children}</div>;
}
