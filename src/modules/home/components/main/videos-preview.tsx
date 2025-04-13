import SpotlightCard from "@/components/animations/spotlight-card/spotlight-card";
import { YoutubeIcon } from "@/components/icons";
import { lastYoutubeVideos } from "@/server/services/youtube";
import Image from "next/image";
import Link from "next/link";
import { VideoPreviewSkeleton } from "./skeleton/video-preview-skeleton";

const VideosPreview = async () => {
  const lastVideos = await lastYoutubeVideos();

  return (
    <div className="bg-background border border-muted rounded-md overflow-hidden w-full  flex flex-col justify-between">
      <div className="md:col-span-1">
        {lastVideos.length === 0 ? (
          <VideoPreviewSkeleton />
        ) : (
          <div className="grid grid-cols-2 gap-6 p-2">
            {lastVideos.slice(0, 2).map((video) => {
              return (
                <SpotlightCard
                  key={video.id.videoId}
                  className="bg-main-gradient rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      width={400}
                      height={250}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <Link
                      className="font-bold text-sm text-primary hover:underline"
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                    >
                      {video.snippet.title}
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        )}
        <div className="w-full p-[1px]">
          <div className="bg-main-gradient border border-muted rounded-md p-3 mt-8 flex flex-col gap-2 justify-center items-center">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border border-[#27272a] rounded flex items-center justify-center">
                <YoutubeIcon className="size-5" />
              </div>
              <span className="text-md">Videos</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              See my latest videos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosPreview;
