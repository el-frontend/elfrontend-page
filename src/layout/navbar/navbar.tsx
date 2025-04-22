"use client";

import ElFrontendLogo from "@/components/icons/logo";
import SocialList from "@/components/social/social-list";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ThemeSwitcher from "../theme-switcher";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  return (
    <nav className="container text-primary h-26 lg:h-22 flex justify-between items-center relative z-10 px-2 lg:px-0  py-4 lg:py-0">
      <div className="flex items-center justify-start lg:flex-1 grow w-full">
        <MobileMenu />
        <Link
          className="text-primary flex gap-2 justify-center lg:justify-start items-center flex-1"
          href="/"
        >
          <ElFrontendLogo className="h-6 w-auto" />
          <span className="text-purple-700 dark:text-purple-600 text-xl font-medium dark:hover:text-white transition-colors duration-500">
            ElFrontend
          </span>
        </Link>
      </div>
      <div className="hidden lg:flex justify-center items-center gap-5 grow ">
        {/* {links.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="text-primary hover:text-purple-700 dark:hover:text-purple-600"
          >
            {route.label}
          </Link>
        ))} */}
      </div>
      <div className="flex justify-end items-center gap-5 flex-1 ">
        <div className="hidden lg:flex items-center justify-end gap-5 ">
          <SocialList />
          <Separator className="!h-6" orientation="vertical" />
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
