"use client";

import { ReactTerminal } from "react-terminal";
import { useCommands } from "./use-commands";
import WelcomeMessage from "./welcome-msg";

const Terminal = () => {
  const commands = useCommands();

  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden md:row-span-2 max-h-svh h-full w-full">
      <div className="bg-[#232323] p-2 flex items-center">
        <div className="flex gap-2 mr-auto">
          <div className="w-3 h-3 bg-[#d83b3b] rounded-full"></div>
          <div className="w-3 h-3 bg-[#e2c423] rounded-full"></div>
          <div className="w-3 h-3 bg-[#03ca0b] rounded-full"></div>
        </div>
        <span className="text-xs text-[#b3b3b3]">@elfrontend - 80 × 24</span>
      </div>
      <div className="p-4 font-mono text-sm h-full">
        <ReactTerminal
          className=" max-h-[calc(100vh-8rem)]"
          commands={commands}
          welcomeMessage={<WelcomeMessage />}
          showControlBar={false}
          showControlButtons={false}
          themes={{
            "my-custom-theme": {
              themeBGColor: "transparent",
              themeColor: "#FFFEFC",
              themePromptColor: "#a917a8",
            },
          }}
          theme="my-custom-theme"
        />
        <style jsx global>{`
          #terminalEditor {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          #terminalEditor::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Terminal;
