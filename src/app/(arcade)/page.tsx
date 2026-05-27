import { ArcadeShell } from "@/modules/v2/components/arcade-shell";
import { getArcadeBlogPosts, getArcadeVideos } from "@/modules/v2/server/data";

export default async function ArcadeHome() {
  const [videos, posts] = await Promise.all([
    getArcadeVideos(),
    Promise.resolve(getArcadeBlogPosts()),
  ]);

  return <ArcadeShell videos={videos} posts={posts} />;
}
