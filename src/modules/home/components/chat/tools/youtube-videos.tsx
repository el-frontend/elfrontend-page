import { YoutubeSearchResponse } from "@/server/types/youtube";
import Image from "next/image";
import Link from "next/link";

type Props = {
  videos: YoutubeSearchResponse[];
};

const YoutubeVideos: React.FC<Props> = ({ videos }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {videos.map((video) => (
        <div key={video.id.videoId} className="flex flex-col gap-2 max-w-[320px]">
          <Image
            width={320}
            height={320}
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <Link
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-sm max-w-[320px] text-blue-200 hover:underline "
          >
            {video.snippet.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default YoutubeVideos;
