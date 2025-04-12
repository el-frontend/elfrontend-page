"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import Chat from "./chat";

const ChatContainer = () => {
  const query = useSearchParams();
  const { push } = useRouter();

  const chat = query.get("chat") || "";

  const closeChat = () => {
    push("/");
  };

  return (
    <Dialog open={!!chat} onOpenChange={closeChat}>
      <DialogContent className="w-screen max-w-screen sm:max-w-screen h-screen lg:w-[90%] lg:h-[90%]">
        <DialogHeader>
          <DialogTitle>ElFrontend Chat</DialogTitle>
          <DialogDescription>Ask me anything, I&apos;ll try my best to answer</DialogDescription>
        </DialogHeader>
        <Chat initialChat={chat} isReadonly={false} />
      </DialogContent>
    </Dialog>
  );
};

export default ChatContainer;
