import { absoluteUrl, AUTHOR, jsonLd, SITE_NAME, SITE_URL } from "@/lib/metadata";
import { V4Home } from "@/modules/v4/components/v4-home";
import { getHomeData } from "@/modules/v4/server/data";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "es",
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR.name,
      url: AUTHOR.url,
      image: absoluteUrl("/images/avatar.webp"),
      jobTitle: "Software Architect",
      sameAs: AUTHOR.sameAs,
    },
  ],
};

export default async function Home() {
  const data = await getHomeData();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <V4Home data={data} />
    </>
  );
}
