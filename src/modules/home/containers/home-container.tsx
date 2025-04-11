import { Suspense } from "react";
import AskAboutMe from "../components/ask-about-me";
import CanIDo from "../components/can-i-do";
import ChatContainer from "../components/chat/chat-container";
import MainContainer from "../components/main/main-container";
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
      <MainContainer />
      <Suspense fallback={null}>
        <ChatContainer />
      </Suspense>
    </div>
  );
};

export default HomeContainer;
