"use client";

import ElFrontendLogo from "@/components/icons/logo";
import SocialList from "@/components/social/social-list";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";

const Navbar = () => {
  return (
    <nav className="container text-primary h-26 lg:h-22 flex flex-col lg:flex-row justify-between items-center relative z-10 px-2 lg:px-0  py-4 lg:py-0">
      <Link
        className="text-primary flex gap-2 justify-center items-center"
        href="/"
      >
        <ElFrontendLogo className="h-6 w-auto" />
        <span className="text-purple-700 dark:text-purple-600 text-xl font-medium dark:hover:text-white transition-colors duration-500">
          ElFrontend
        </span>
      </Link>
      <div className="flex justify-center items-center gap-5">
        <SocialList />
        <Separator className="!h-6" orientation="vertical" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
