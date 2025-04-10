"use client";

import SendMessage from "./send-message";
import SlashCommands from "./slash-commands";

import dynamic from "next/dynamic";
import { TerminalContextProvider } from "react-terminal";
import VideosPreview from "./videos-preview";

const Terminal = dynamic(() => import("./terminal/terminal"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-main-gradient animate-pulse rounded-md" />
  ),
});

const MainContainer = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-full">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SlashCommands />
        <SendMessage />
      </div>
      <div className="row-span-2">
        <TerminalContextProvider>
          <Terminal />
        </TerminalContextProvider>
      </div>
      <div>
        <VideosPreview />
      </div>
    </div>
  );
};

export default MainContainer;
