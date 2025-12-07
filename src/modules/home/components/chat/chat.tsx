"use client";

import { generateUUID } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Attachment } from "ai";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";
import { useChatRateLimit } from "./store/chat-context";

type Props = {
  initialChat: string;
  isReadonly: boolean;
  className?: string;
};

const Chat: React.FC<Props> = ({
  initialChat,
  isReadonly = false,
  className,
}) => {
  const { incrementMessage, remainingMessages, resetIn } = useChatRateLimit();

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
      if (!incrementMessage()) {
        toast.error(`Message limit reached. Resets in ${resetIn}`);
        return;
      }
      append({
        id: crypto.randomUUID(),
        role: "user",
        content: initialChat,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialChat]);

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleSubmitWithLimit: typeof handleSubmit = (event, chatRequestOptions) => {
    event?.preventDefault?.();
    if (!incrementMessage()) {
      toast.error(`Message limit reached (${remainingMessages}/10). Resets in ${resetIn}`);
      return;
    }
    handleSubmit(event, chatRequestOptions);
  };

  return (
    <div className={clsx("flex flex-col min-w-0 overflow-y-auto", className)}>
      {/* Rate limit indicator */}
      <div className="text-xs text-muted-foreground text-center py-1">
        {remainingMessages}/10 messages remaining • Resets in {resetIn}
      </div>
      
      <Messages
        chatId={id}
        status={status}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        isReadonly={isReadonly}
        isArtifactVisible={false}
      />
      <form 
        onSubmit={handleSubmitWithLimit}
        className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl"
      >
        {!isReadonly && (
          <MultimodalInput
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmitWithLimit}
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
