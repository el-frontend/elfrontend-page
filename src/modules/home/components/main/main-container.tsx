"use client";

import SendMessage from "./send-message";
import SlashCommands from "./slash-commands";

import dynamic from "next/dynamic";
import { TerminalContextProvider } from "react-terminal";

const Terminal = dynamic(() => import("./terminal/terminal"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-main-gradient animate-pulse rounded-md" />
  ),
});

type Props = {
  videoPreviewComponent: React.ReactNode;
};

const MainContainer = ({ videoPreviewComponent }: Props) => {
  return (
    <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-6 w-full h-full justify-start items-start z-10">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 max-h-full h-full">
        <SendMessage />
        <SlashCommands />
      </div>
      <div className="row-span-1 lg:row-span-2 h-fit">
        <TerminalContextProvider>
          <Terminal />
        </TerminalContextProvider>
      </div>
      <div className="flex flex-col max-h-fit">{videoPreviewComponent}</div>
    </div>
  );
};

export default MainContainer;
