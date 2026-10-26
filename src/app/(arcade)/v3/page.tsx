import { absoluteUrl, RSS_ALTERNATE } from "@/lib/metadata";
import { ArcadeShell } from "@/modules/v2/components/arcade-shell";
import { getArcadeBlogPosts, getArcadeVideos } from "@/modules/v2/server/data";
import type { Metadata } from "next";

// Previous home (arcade edition), kept at /v3 after the v4 redesign.
export const metadata: Metadata = {
  title: { absolute: "ElFrontend · v3 Arcade Edition" },
  alternates: { canonical: absoluteUrl("/v3"), types: RSS_ALTERNATE },
};

export default async function ArcadeHome() {
  const [videos, posts] = await Promise.all([
    getArcadeVideos(),
    Promise.resolve(getArcadeBlogPosts()),
  ]);

  return <ArcadeShell videos={videos} posts={posts} />;
}
