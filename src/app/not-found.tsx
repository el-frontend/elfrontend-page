import NotFoundContainer from "@/modules/static/not-found/not-found-container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ElFrontend 404 - You are lost",
    description: "ElFrontend - Official Website",
  };

export default function NotFound() {
  return <NotFoundContainer />;
}
