import { Metadata } from "next";

const title = "ElFrontend";
const description = "Welcome to ElFrontend - Official Website.";
const thumbnail = "/og.webp";

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://elfrontend.com"
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    authors: ['Carlos Chao Cortes'],
    images: [
      {
        url: thumbnail,
        secureUrl: thumbnail,
        alt: description,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.webp"],
  },
});
