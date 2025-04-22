"use client";

import ElFrontendLogo from "@/components/icons/logo";
import SocialList from "@/components/social/social-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { links } from "./links";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[240px] sm:w-[300px] px-6 py-8 flex flex-col gap-4 justify-start items-start"
      >
        <SheetHeader hidden>
          <SheetTitle>ElFrontend</SheetTitle>
          <SheetDescription>Responsive menu of ElFrontend</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 w-full justify-start items-start">
          <Link
            className="text-primary flex gap-2 justify-center items-center flex-1"
            href="/"
          >
            <ElFrontendLogo className="h-6 w-auto" />
            <span className="text-purple-700 dark:text-purple-600 text-xl font-medium dark:hover:text-white transition-colors duration-500">
              ElFrontend
            </span>
          </Link>

          <nav className="flex flex-col gap-3 mt-4">
            {links.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-muted-foreground transition-colors hover:text-purple-700 dark:hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          <Separator className="w-full" orientation="horizontal" />
          <SocialList
            className="flex flex-col gap-3 justify-between items-start"
            showLabel
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
