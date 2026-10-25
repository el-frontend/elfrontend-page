import { absoluteUrl, AUTHOR, jsonLd, SITE_NAME, SITE_URL } from "@/lib/metadata";
import { ArcadeShell } from "@/modules/v2/components/arcade-shell";
import { getArcadeBlogPosts, getArcadeVideos } from "@/modules/v2/server/data";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
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

export default async function ArcadeHome() {
  const [videos, posts] = await Promise.all([
    getArcadeVideos(),
    Promise.resolve(getArcadeBlogPosts()),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <ArcadeShell videos={videos} posts={posts} />
    </>
  );
}
