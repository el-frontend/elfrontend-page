"use client";

import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const AskAboutMe = () => {
  const [search, setSearch] = useState("");
  const { push } = useRouter();
  const pathname = usePathname();

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const queryParams = new URLSearchParams();
      queryParams.set("chat", search);
      push(`${pathname}?${queryParams.toString()}`);
      setSearch("");
    }
  };

  return (
    <div className="grid w-full  lg:min-w-xl items-center gap-2">
      <div className="relative">
        <div className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground opacity-40">
          <Sparkles className="h-4 w-4 animate-pulse text-purple-600 dark:text-purple-400" />
        </div>
        <Input
          onKeyDown={onEnter}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          id="search"
          type="search"
          placeholder="Ask a question about me"
          className="w-full rounded-md pl-8  border-primary dark:border-gray-500 h-[46px] text-primary dark:text-muted-foreground focus-visible:ring-purple-500 focus-visible:ring-[1px]"
        />
      </div>
    </div>
  );
};

export default AskAboutMe;
