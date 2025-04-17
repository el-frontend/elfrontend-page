import { YoutubeIcon } from "@/components/icons";
import { lastYoutubeVideos } from "@/server/services/youtube";
import Image from "next/image";
import Link from "next/link";
import { VideoPreviewSkeleton } from "./skeleton/video-preview-skeleton";

const VideosPreview = async () => {
  const lastVideos = await lastYoutubeVideos();

  return (
    <div className="bg-card dark:bg-background shadow border dark:border-muted rounded-md overflow-hidden w-full  flex flex-col justify-between">
      <div className="md:col-span-1">
        {lastVideos.length === 0 ? (
          <VideoPreviewSkeleton />
        ) : (
          <div className="flex flex-col gap-4 p-2">
            {lastVideos.slice(0, 3).map((video) => {
              return (
                <div
                  key={video.id.videoId}
                  className="w-full rounded-lg overflow-hidden flex gap-4 relative h-24 justify-between items-center border p-2"
                >
                  <div className="w-22 h-22 relative aspect-square">
                    <Image
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Link
                    className="font-bold text-xs text-primary hover:underline line-clamp-4"
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                  >
                    {video.snippet.title}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <div className="w-full p-[1px]">
          <div className="bg-main-gradient border border-muted rounded-md p-3 mt-8 flex flex-col gap-2 justify-center items-center">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center">
                <YoutubeIcon className="size-5" />
              </div>
              <span className="text-md">Videos</span>
            </div>
            <Link
              href="https://youtube.com/@ElFrontend"
              target="_blank"
              className="text-xs dark:text-muted-foreground text-center hover:underline cursor-pointer"
            >
              See all my videos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosPreview;
