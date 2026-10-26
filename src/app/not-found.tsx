import "@/modules/v4/styles/v4.css";
import { V4NotFound } from "@/modules/v4/not-found/not-found";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Página no encontrada · ElFrontend" },
  robots: { index: false },
};

export default function NotFound() {
  return <V4NotFound />;
}
