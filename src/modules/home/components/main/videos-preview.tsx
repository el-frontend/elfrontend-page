import { Video } from "lucide-react";
import Image from "next/image";

const VideosPreview = () => {
  return (
    <div className="md:col-span-1">
      <div className="grid grid-cols-2 gap-6">
        {/* Video Card 1 */}
        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Conventional Commit"
              width={400}
              height={200}
              className="w-full"
            />
            <div className="absolute top-2 right-2 bg-red-500 p-1 rounded">
              <span className="text-xs">YT</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg">CONVENTIONAL COMMIT</h3>
          </div>
        </div>

        {/* Video Card 2 */}
        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Tailwind CSS v4.0"
              width={400}
              height={200}
              className="w-full"
            />
            <div className="absolute top-0 right-0 p-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg">Tailwind CSS v4.0</h3>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          <span className="font-medium">Videos</span>
        </div>
        <p className="text-sm text-[#b3b3b3]">See my latest videos</p>
      </div>
    </div>
  );
};

export default VideosPreview;
