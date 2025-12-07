import Chat from "@/modules/home/components/chat/chat";
import { ChatRateLimitProvider } from "@/modules/home/components/chat/store/chat-context";
import Link from "next/link";

const NotFoundContainer = () => {
  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">
        I think you are lost.
        <br />
        In a mean while, you can chat with my assistant or{" "}
        <Link href="/" className="text-primary underline">Return Home</Link>
      </h2>

      <ChatRateLimitProvider>
        <Chat initialChat={""} isReadonly={false} className="w-full h-full" />
      </ChatRateLimitProvider>
    </div>
  );
};

export default NotFoundContainer;
