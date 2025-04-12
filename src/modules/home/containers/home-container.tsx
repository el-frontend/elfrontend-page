import { Suspense } from "react";
import AskAboutMe from "../components/ask-about-me";
import CanIDo from "../components/can-i-do";
import ChatContainer from "../components/chat/chat-container";
import MainContainer from "../components/main/main-container";
import { VideoPreviewSkeleton } from "../components/main/skeleton/video-preview-skeleton";
import VideosPreview from "../components/main/videos-preview";
import NavigationTabs from "../components/navigation-tabs";
import Profile from "../components/profile";

const HomeContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 mt-8 w-full h-full ">
      <div className="flex flex-col gap-5 w-full h-full max-w-2xl items-center justify-center">
        <Profile />
        <CanIDo />
        <AskAboutMe />
        <NavigationTabs />
      </div>
      <MainContainer
        videoPreviewComponent={
          <Suspense fallback={<VideoPreviewSkeleton />}>
            <VideosPreview />
          </Suspense>
        }
      />
      <Suspense fallback={null}>
        <ChatContainer />
      </Suspense>
    </div>
  );
};

export default HomeContainer;
