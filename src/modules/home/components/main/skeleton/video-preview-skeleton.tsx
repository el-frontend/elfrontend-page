const VideoSkeleton = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
      <div className="relative">
        <div className="w-full h-50 bg-gray-700 animate-pulse" />
      </div>
      <div className="p-4">
        <div className="w-full h-4 bg-gray-700 animate-pulse"></div>
      </div>
    </div>
  );
};

export const VideoPreviewSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-2">
      <VideoSkeleton />
      <VideoSkeleton />
    </div>
  );
};
