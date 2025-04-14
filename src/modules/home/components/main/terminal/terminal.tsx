"use client";

import clsx from "clsx";
import { Maximize2, Minus, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ReactTerminal } from "react-terminal";
import { useCommands } from "./use-commands";
import WelcomeMessage from "./welcome-msg";

const Terminal = () => {
  const commands = useCommands();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { theme } = useTheme();
  const onToggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const closeIfFullScreen = () => {
    if (isFullScreen) {
      setIsFullScreen(false);
    }
  };

  return (
    <div
      className={clsx(
        "bg-background border dark:border-muted shadow rounded-lg overflow-hidden md:row-span-2 h-160 lg:h-[calc(100vh-250px)] w-full pb-4",
        isFullScreen ? "fixed top-0 left-0 h-screen w-screen z-50" : "z-10"
      )}
    >
      <div className="bg-secondary dark:bg-muted p-2 flex items-center">
        <div className="flex gap-2 mr-auto">
          <div
            className="w-3 h-3 bg-red-500 rounded-full flex justify-center items-center group cursor-pointer"
            onClick={closeIfFullScreen}
          >
            <X className="text-foreground size-2 hidden group-hover:block" />
          </div>
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full flex justify-center items-center group cursor-pointer"
            onClick={closeIfFullScreen}
          >
            <Minus className="text-foreground size-2 hidden group-hover:block" />
          </div>
          <div
            className="w-3 h-3 bg-green-500 rounded-full flex justify-center items-center group cursor-pointer"
            onClick={onToggleFullScreen}
          >
            <Maximize2 className="text-foreground size-2 hidden group-hover:block" />
          </div>
        </div>
        <span className="text-xs text-primary">@elfrontend - 80 × 24</span>
      </div>
      <div className="p-4 font-mono text-sm h-full">
        <ReactTerminal
          commands={commands}
          welcomeMessage={<WelcomeMessage />}
          showControlBar={false}
          showControlButtons={false}
          themes={{
            dark: {
              themeBGColor: "transparent",
              themeColor: "#FFFEFC",
              themePromptColor: "#a917a8",
            },
            light: {
              themeBGColor: "#fffffa",
              themeColor: "#000000",
              themePromptColor: "#a917a8",
            },
          }}
          theme={theme}
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
