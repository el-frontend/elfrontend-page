import { Suspense } from "react";
import AskAboutMe from "../components/ask-about-me";
import CanIDo from "../components/can-i-do";
import ChatContainer from "../components/chat/chat-container";
import BackgroundSwitcher from "../components/main/background";
import BeautifulCursor from "../components/main/cursor";
import LastBlogArticles from "../components/main/last-blog-articles";
import MainContainer from "../components/main/main-container";
import { VideoPreviewSkeleton } from "../components/main/skeleton/video-preview-skeleton";
import VideosPreview from "../components/main/videos-preview";
import NavigationTabs from "../components/navigation-tabs";
import Profile from "../components/profile";

const HomeContainer = () => {
  return (
    <div className=" container mx-auto px-4 sm:px-0 py-8 flex flex-col items-center justify-center gap-12z w-full h-full ">
      <div className="flex flex-col gap-5 w-full h-full max-w-2xl items-center justify-center z-10">
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
        lastBlogArticles={
          <Suspense fallback={null}>
            <LastBlogArticles />
          </Suspense>
        }
      />
      <Suspense fallback={null}>
        <ChatContainer />
      </Suspense>
      <BeautifulCursor />
      <BackgroundSwitcher />
    </div>
  );
};

export default HomeContainer;
