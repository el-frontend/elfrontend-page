import { YoutubeIcon } from "@/components/icons";
import { BriefcaseBusiness, Sparkles } from "lucide-react";

const SlashCommands = () => {
  return (
    <div className="bg-background border border-muted rounded-md overflow-hidden w-full flex flex-col justify-between">
      <div className="flex flex-col justify-end items-end pl-6 pt-6 w-full gap-3">
        <div className="pl-3 py-2 flex flex-col items-start justify-center  bg-main-gradient border border-muted rounded-l-md gap-3 w-full">
          <div className="flex items-center gap-3 ">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-muted-foreground border">
              <BriefcaseBusiness className="size-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Projects</h3>
              <p className="text-xs text-muted-foreground">
                Show all my projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-muted-foreground border">
              <YoutubeIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Videos</h3>
              <p className="text-xs text-muted-foreground">Show my last videos</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-main-gradient rounded-l-md w-full ">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">projects</span>
        </div>
      </div>
      <div className="w-full p-[1px]">
        <div className="bg-main-gradient border border-muted rounded-md p-3 mt-12 flex flex-col gap-2 justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border border-[#27272a] rounded flex items-center justify-center">
                <span className="text-xs">&gt;&gt;&gt;</span>
            </div>
            <span className="text-md">Terminal Commands</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Review Projects, Skills and much more with commands
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlashCommands;
