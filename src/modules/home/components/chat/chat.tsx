"use client";

import { generateUUID } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Attachment } from "ai";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";

type Props = {
  initialChat: string;
  isReadonly: boolean;
};

const Chat: React.FC<Props> = ({ initialChat, isReadonly = false }) => {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
  } = useChat({
    onError: () => {
      toast.error("An error occurred, please try again!");
    },
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
  });

  const id = generateUUID();

  useEffect(() => {
    if (initialChat) {
      append({
        id: crypto.randomUUID(),
        role: "user",
        content: initialChat,
      });
    }
  }, [initialChat]);

  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      name: "cv.pdf",
      url: `${window.location.origin}/cv.pdf`,
      contentType: "application/pdf",
    },
  ]);

  return (
    <div className="flex flex-col min-w-0 overflow-y-auto">
      <Messages
        chatId={id}
        status={status}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        isReadonly={isReadonly}
        isArtifactVisible={false}
      />
      <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        {!isReadonly && (
          <MultimodalInput
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            status={status}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
          />
        )}
      </form>
    </div>
  );
};

export default Chat;
