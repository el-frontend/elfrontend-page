import { Button } from "@/components/ui/button";
import { Code, FolderOpen, User, Video } from "lucide-react";

const NavigationTabs = () => {
  return (
    <div className="flex justify-center gap-4 mb-12 ">
      <Button variant="secondary">
        <User className="w-4 h-4" /> About me
      </Button>
      <Button variant="secondary">
        <Code className="w-4 h-4" /> My Skills
      </Button>
      <Button variant="secondary">
        <FolderOpen className="w-4 h-4" /> My Projects
      </Button>
      <Button variant="secondary">
        <Video className="w-4 h-4" /> My Videos
      </Button>
    </div>
  );
};

export default NavigationTabs;
