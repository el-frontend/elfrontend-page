import SendMessage from "./send-message";
import SlashCommands from "./slash-commands";
import Terminal from "./terminal";
import VideosPreview from "./videos-preview";

const MainContainer = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-full">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SlashCommands />
        <SendMessage />
      </div>
      <div className="row-span-2">
        <Terminal />
      </div>
      <div>
        <VideosPreview />
      </div>
    </div>
  );
};

export default MainContainer;
