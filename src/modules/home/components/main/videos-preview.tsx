import { lastYoutubeVideos } from "@/server/services/youtube";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VideosPreview = async () => {
  const lastVideos = await lastYoutubeVideos();
  if (lastVideos.length === 0) return null;

  return (
    <div className="bg-background border border-muted rounded-md overflow-hidden w-full  flex flex-col justify-between">
      <div className="md:col-span-1">
        <div className="grid grid-cols-2 gap-6">
          {lastVideos.slice(0, 2).map((video) => {
            return (
              <div
                key={video.id.videoId}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    width={400}
                    height={200}
                    className="w-full"
                  />
                </div>
                <div className="p-4">
                  <Link
                    className="font-bold text-lg text-primary hover:underline"
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                  >
                    {video.snippet.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            <span className="font-medium">Videos</span>
          </div>
          <p className="text-sm text-[#b3b3b3]">See my latest videos</p>
        </div>
      </div>
    </div>
  );
};

export default VideosPreview;
