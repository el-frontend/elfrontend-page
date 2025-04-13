import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/server/services/resend";
import { Turnstile } from "@marsidev/react-turnstile";
import clsx from "clsx";
import { Loader, Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const buttonClass =
  "border hover:border hover:border-purple-500 hover:transition hover:duration-700";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"" | "error" | "expired" | "solved">("");
  const [isPending, startTransition] = useTransition();

  const sendMessage = async () => {
    if (process.env.NEXT_PUBLIC_ENABLE_EMAIL !== "1") {
      toast.error("Email is disabled");
      return;
    }
    if (!message || status !== "solved") {
      toast.error("Please complete the security check or fill in the message");
      return;
    }
    const { error } = await sendContactEmail(message);
    if (error) {
      toast.error("Failed to send message");
    } else {
      toast.success("Message sent successfully");
      setMessage("");
    }
  };
  return (
    <div className="bg-background border border-muted rounded-md overflow-hidden w-full  flex flex-col justify-between max-h-full">
      <div className="flex-grow p-4 flex flex-col gap-2">
        <Textarea
          name="email_body"
          className="w-full min-h-32 h-full bg-muted focus-visible:ring-purple-500 focus-visible:ring-[1px] p-4"
          rows={12}
          value={message}
          placeholder="Contact me, ask me anything"
          onChange={(e) => setMessage(e.target.value)}
          disabled={isPending}
        />
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_KEY ?? ""}
          onError={() => setStatus("error")}
          onExpire={() => setStatus("expired")}
          onSuccess={() => setStatus("solved")}
          options={{
            size: "invisible",
          }}
        />
      </div>
      <div className="p-4 flex  flex-col justify-center gap-2">
        {["error", "expired"].includes(status) && (
          <span className="text-red-500 text-center">
            You need to complete the security check
          </span>
        )}
        <Button
          variant="outline"
          className={clsx(buttonClass, "rounded-full py-3 !px-4 font-bold")}
          onClick={() => startTransition(() => sendMessage())}
          disabled={isPending}
        >
          <Mail className="w-4 h-4" /> Send a message
          {isPending && <Loader className="w-4 h-4 animate-spin opacity-90" />}
        </Button>
      </div>
      <div className="w-full p-[1px]">
        <div className="bg-main-gradient border border-muted rounded-md py-6 mt-4 flex flex-col gap-2 justify-center items-center">
          <p className="text-sm text-foreground text-center">
            Do you want to know more about me?
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
