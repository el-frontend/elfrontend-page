import "@/modules/v2/styles/arcade.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "ElFrontend · Arcade Edition",
  description:
    "Carlos Chao — software architect, React/Next.js educator, ElFrontend community. Press start to talk to me.",
  alternates: { canonical: "https://elfrontend.com" },
};

export default function ArcadeLayout({ children }: PropsWithChildren) {
  return <div className="arcade-root">{children}</div>;
}
