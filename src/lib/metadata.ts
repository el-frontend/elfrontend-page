import { Metadata } from "next";

import { SOCIALS } from "@/modules/v2/content/data";

export const SITE_URL = "https://elfrontend.com";
export const SITE_NAME = "ElFrontend";

const description = "Welcome to ElFrontend - Official Website.";
const thumbnail = "/og.png";

export const AUTHOR = {
  name: "Carlos Chao",
  url: SITE_URL,
  sameAs: [...SOCIALS.map((s) => s.href), "https://x.com/cortes_chao"],
};

/** RSS discovery link. Next merges `alternates` shallowly, so pages that set a canonical repeat this. */
export const RSS_ALTERNATE = {
  "application/rss+xml": [{ url: "/rss.xml", title: `${SITE_NAME} Blog` }],
};

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description,
  alternates: { types: RSS_ALTERNATE },
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description,
    authors: [AUTHOR.name],
    images: [
      {
        url: thumbnail,
        alt: description,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [thumbnail],
  },
});

/** Serialize JSON-LD for a <script> tag, escaping `<` so content can't close the tag. */
export const jsonLd = (data: object) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
