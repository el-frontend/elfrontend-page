import HomeContainer from "@/modules/home/containers/home-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ElFrontend · v1",
  description: "The original ElFrontend personal page.",
  alternates: { canonical: "https://elfrontend.com/v1" },
};

export default function V1Page() {
  return <HomeContainer />;
}
