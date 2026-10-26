import { RSS_ALTERNATE, SITE_URL } from "@/lib/metadata";
import "@/modules/v4/styles/v4.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: { default: "Carlos Chao · ElFrontend", template: "%s · ElFrontend" },
  description:
    "Arquitecto de software, educador de React y Next.js y creador de la comunidad ElFrontend. Videos, artículos y charlas en español.",
  alternates: { canonical: SITE_URL, types: RSS_ALTERNATE },
};

export default function V4Layout({ children }: PropsWithChildren) {
  return children;
}
