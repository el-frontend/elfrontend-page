"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
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
      <DialogTitle>ElFrontend Chat</DialogTitle>
      <DialogDescription>Know more about</DialogDescription>
      <DialogContent className="w-screen max-w-screen sm:max-w-screen h-screen lg:w-[90%] lg:h-[90%]">
        <Chat initialChat={chat} isReadonly={false}/>
      </DialogContent>
    </Dialog>
  );
};

export default ChatContainer;
