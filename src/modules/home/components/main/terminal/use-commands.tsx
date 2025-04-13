import { useMainContext } from "@/modules/home/store";
import { BackgroundType } from "@/modules/home/store/types";
import { askQuestion } from "@/server/ai/google/google-model";
import React from "react";
import Markdown from "react-markdown";
import { TerminalContext } from "react-terminal";
import remarkGfm from "remark-gfm";
import { fileData, fileSystem } from "./files-data";

export const useCommands = () => {
  const { dispatch } = useMainContext();
  const { setBufferedContent, setTemporaryContent } =
    React.useContext(TerminalContext);
  if (!setBufferedContent || !setTemporaryContent) {
    throw new Error("TerminalContext is not available");
  }

  const [currentPath, setCurrentPath] = React.useState("/");

  // Helper to get current directory content
  const getCurrentDirContent = () => {
    return fileSystem[currentPath] || ["Empty directory"];
  };

  function LinkRenderer(
    props:
      | React.JSX.IntrinsicElements["link"]
      | React.JSX.IntrinsicElements["a"]
  ) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  }

  const askQuestionWithAI = async (message: string) => {
    setTemporaryContent("Asking to the AI....");
    try {
      const text = await askQuestion(message);

      return (
        <div className="p-4 bg-main-gradient mt-2 rounded-md">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{ link: LinkRenderer, a: LinkRenderer }}
          >
            {text}
          </Markdown>
        </div>
      );
    } catch (err) {
      console.error("Error asking AI: ", err);
      return "The AI is busy try later";
    }
  };

  // Format display based on item type (folder or file)
  const formatLsOutput = (items: string[]) => {
    return (
      <span>
        {items.map((item, index) => (
          <div
            key={index}
            className={item.endsWith("/") ? "text-green-400" : "text-blue-300"}
          >
            {item}
          </div>
        ))}
      </span>
    );
  };

  const toggleBeautifulCursor = (isEnable: boolean) => {
    dispatch({ type: "TOGGLE_BEAUTIFUL_CURSOR", payload: isEnable });
    return isEnable ? "Beautiful cursor enabled" : "Beautiful cursor disabled";
  };

  const setBackground = (background: BackgroundType | string) => {
    if (!["none", "grid", "beams", "aurora"].includes(background)) {
      return "Invalid background type";
    }
    dispatch({
      type: "UPDATE_BACKGROUND",
      payload: background as BackgroundType,
    });
    return `Background set to ${background}`;
  };

  return {
    whoami: "Carlos Chao - @elfrontend",

    cd: (directory: string) => {
      if (!directory) {
        setCurrentPath("/");
        return "Changed to root directory";
      }

      let newPath;

      // Handle absolute paths
      if (directory.startsWith("/")) {
        newPath = directory;
      }
      // Handle parent directory
      else if (directory === ".." || directory.startsWith("../")) {
        // Count how many levels to go up
        const upCount =
          (directory.match(/\.\.\//g) || []).length +
          (directory.endsWith("..") ? 1 : 0);

        const pathParts = currentPath.split("/").filter(Boolean);

        // Go up as many levels as specified, but not beyond root
        for (let i = 0; i < upCount && pathParts.length > 0; i++) {
          pathParts.pop();
        }

        // Handle the remainder of the path if there's anything after the ../
        const remainingPath = directory.replace(/(\.\.\/?)+/, "");
        newPath = "/" + pathParts.join("/");

        // If there's remaining path after the ../, append it
        if (remainingPath) {
          newPath =
            newPath === "/"
              ? `/${remainingPath}`
              : `${newPath}/${remainingPath}`;
        }
      }
      // Handle relative paths
      else {
        newPath =
          currentPath === "/" ? `/${directory}` : `${currentPath}/${directory}`;
      }

      // Check if path exists in our file system
      if (fileSystem[newPath]) {
        setCurrentPath(newPath);
        return `Changed directory to ${newPath}`;
      } else {
        // If path doesn't exist with exact match, try adding a slash for directory
        const dirWithoutSlash = newPath.endsWith("/")
          ? newPath.slice(0, -1)
          : newPath;

        if (fileSystem[dirWithoutSlash]) {
          setCurrentPath(dirWithoutSlash);
          return `Changed directory to ${dirWithoutSlash}`;
        }

        // Check if it might be a file
        const parentPath = currentPath;
        const parentContent = fileSystem[parentPath] || [];

        if (parentContent.includes(directory)) {
          return `Cannot change directory to ${directory}: Not a directory`;
        }

        return `Directory not found: ${directory}`;
      }
    },

    ls: () => formatLsOutput(getCurrentDirContent()),

    pwd: () => currentPath,

    help: (
      <span>
        <strong className="text-purple-500">clear</strong> - makes all your
        problems disappear (from the screen at least) <br />
        <strong className="text-purple-500">whoami</strong> - reveals the genius
        behind this terminal (spoiler: it&apos;s not Siri) <br />
        <strong className="text-purple-500">cd</strong> - navigate directories
        (use cd .. to go up) <br />
        <strong className="text-purple-500">pwd</strong> - print current
        directory <br />
        <strong className="text-purple-500">ls</strong> - list current directory
        contents <br />
        <strong className="text-purple-500">help</strong> - you&apos;re looking
        at it! 🎉 <br />
        <strong className="text-purple-500">ai</strong> - ask to the ai about me{" "}
        <br />
        <strong className="text-purple-500">projects</strong> - show me the
        Carlos Chao projects <br />
        <strong className="text-purple-500">videos</strong> - show me the best
        youtube videos of Carlos Chao (ElFrontend) <br />
        <strong className="text-purple-500">skills</strong> - show me the Carlos
        Chao skills <br />
        <strong className="text-purple-500">ecursor</strong> - enable beautiful
        cursor <br />
        <strong className="text-purple-500">dcursor</strong> - disable beautiful
        cursor <br />
        <strong className="text-purple-500">background</strong> - set background
        can be none, grid, beams, aurora <br />
      </span>
    ),
    vim: (filename: string) => {
      if (!filename) {
        return "Usage: vim [filename]";
      }
      const file = `${currentPath}/${filename}`;
      debugger;
      if (!fileData[file]) {
        return `File '${filename}' not found`;
      }

      // Don't allow opening directories
      if (filename.endsWith("/")) {
        return `Cannot edit directory '${filename}'`;
      }

      // Simulate vim editor opening
      setBufferedContent(
        <div className="text-green-300">
          <div>Opening {filename} in vim...</div>
          <div className="mt-2">~ VIM - {filename} ~</div>
          <div className="mt-1 text-yellow-300 italic">
            (This is just a simulation, not a real vim editor)
          </div>
          <div className="mt-4 text-blue-200">{fileData[file]}</div>
          <br />
          <div className="text-blue-500 mt-1 text-xs">
            <span className="font-semibold">Vim tip:</span> You&apos;ll never
            figure out how to exit. Try random combinations of :q!, :wq, Esc,
            Ctrl+C, or just restart your computer.
          </div>
          <br />
        </div>
      );

      return null;
    },
    ai: askQuestionWithAI,
    projects: () => {
      return askQuestionWithAI("What are the Carlos Chao projects?");
    },
    videos: () => {
      // return askQuestionWithAI(
      //   "What are the best youtube videos of Carlos Chao (ElFrontend)?"
      // );
      return "Not implemented yet";
    },
    skills: () => {
      return askQuestionWithAI("What are the Carlos Chao skills?");
    },
    ecursor: () => toggleBeautifulCursor(true),
    dcursor: () => toggleBeautifulCursor(false),
    background: setBackground,
  };
};
