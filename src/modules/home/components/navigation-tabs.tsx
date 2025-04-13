"use client";

import { Button } from "@/components/ui/button";
import { Code, FolderOpen, User, Video } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const buttonClass =
  "border hover:border hover:border-purple-500 hover:transition hover:duration-700";

const NavigationTabs = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const onNavigate = (prompt: string) => {
    const queryParams = new URLSearchParams();
    queryParams.set("chat", prompt);
    push(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="flex justify-center gap-4 mb-12 z-10 w-full flex-wrap">
      <Button
        className={buttonClass}
        variant="secondary"
        onClick={() => onNavigate("Who is Carlos Chao?")}
      >
        <User className="w-4 h-4" /> About me
      </Button>
      <Button
        className={buttonClass}
        variant="secondary"
        onClick={() => onNavigate("What skills does Carlos Chao have?")}
      >
        <Code className="w-4 h-4" /> My Skills
      </Button>
      <Button
        className={buttonClass}
        variant="secondary"
        onClick={() => onNavigate("What projects has Carlos Chao worked on?")}
      >
        <FolderOpen className="w-4 h-4" /> My Projects
      </Button>
      <Button
        className={buttonClass}
        variant="secondary"
        onClick={() => onNavigate("What videos has Carlos Chao created?")}
      >
        <Video className="w-4 h-4" /> My Videos
      </Button>
    </div>
  );
};

export default NavigationTabs;
