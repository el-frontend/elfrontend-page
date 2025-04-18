"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import SnakeGame from "./snake";

const GameModal = () => {
  const query = useSearchParams();
  const { push } = useRouter();

  const game = query.get("game") || "";

  const closeGame = () => {
    push("/");
  };

  const getGame = () => {
    switch (game) {
      case "snake":
        return <SnakeGame onExit={closeGame} />;
    }
  };

  return (
    <Dialog open={!!game} onOpenChange={closeGame}>
      <DialogContent className="w-screen max-w-screen sm:max-w-screen h-screen lg:w-[90%] lg:h-[90%]">
        <DialogHeader hidden>
          <DialogTitle>Game</DialogTitle>
          <DialogDescription>
            {game === "snake" && "Play Snake"}
          </DialogDescription>
        </DialogHeader>
        {getGame()}
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
