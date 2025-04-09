import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

const SendMessage = () => {
  return (
    <div className="bg-background border border-muted rounded-md overflow-hidden w-full  flex flex-col">
      <div className="flex-grow p-4">
        <Textarea name="email_body" className="w-full min-h-12 h-full bg-muted"/>
      </div>
      <div className="p-4 flex justify-center">
        <Button variant="outline" className="rounded-full py-3 !px-4 font-bold">
          <Mail className="w-4 h-4" /> Send a message
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
