import { RSS_ALTERNATE, SITE_URL } from "@/lib/metadata";
import "@/modules/v4/styles/v4.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { PropsWithChildren } from "react";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "Carlos Chao · ElFrontend" },
  description:
    "Arquitecto de software, educador de React y Next.js y creador de la comunidad ElFrontend. Videos, artículos y charlas en español.",
  alternates: { canonical: SITE_URL, types: RSS_ALTERNATE },
};

export default function V4Layout({ children }: PropsWithChildren) {
  return <div className={bricolage.variable}>{children}</div>;
}
