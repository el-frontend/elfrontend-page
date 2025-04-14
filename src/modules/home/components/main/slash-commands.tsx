import { TypingAnimation } from "@/components/animations/text-typing";
import { YoutubeIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { BriefcaseBusiness, ListTodo, Palette, Sparkles } from "lucide-react";

const SlashCommands = () => {
  return (
    <div className="bg-card dark:bg-background shadow border dark:border-muted rounded-md overflow-hidden w-full flex flex-col justify-between max-h-full">
      <div className="flex flex-col justify-end items-end pl-6 pt-6 w-full gap-3">
        <div className="pl-3 py-4 dark:py-2 flex flex-col items-start justify-center bg-main-gradient border dark:border-muted rounded-l-md gap-3 w-full">
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-muted-foreground border">
              <BriefcaseBusiness className="size-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Projects</h3>
              <p className="text-xs text-muted-foreground">
                Show all my projects
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ delay: 1.7 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-muted-foreground border">
              <YoutubeIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Videos</h3>
              <p className="text-xs text-primary/80 dark:text-muted-foreground">
                Show my last videos
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ delay: 1.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-muted-foreground border">
              <ListTodo className="size-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Skills</h3>
              <p className="text-xs text-primary/80 dark:text-muted-foreground">
                Show my skills
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ delay: 1.9 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-muted-foreground border">
              <Palette className="size-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Backgrounds</h3>
              <p className="text-xs text-primary/80 dark:text-muted-foreground">
                View available backgrounds
              </p>
            </div>
          </motion.div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-main-gradient border rounded-l-md w-full min-h-9">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <TypingAnimation
            className="text-primary dark:text-muted-foreground text-sm font-medium"
            delay={5}
            duration={250}
            startOnView={false}
          >
            help
          </TypingAnimation>
        </div>
      </div>
      <div className="w-full p-[1px]">
        <div className="bg-main-gradient border border-muted rounded-md p-3 mt-8 flex flex-col gap-2 justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5  rounded flex items-center justify-center">
              <span className="text-xs">&gt;&gt;&gt;</span>
            </div>
            <span className="text-md">Terminal Commands</span>
          </div>
          <p className="text-xs text-primary dark:text-muted-foreground text-center">
            Review Projects, Skills and much more with commands
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlashCommands;
