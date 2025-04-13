import ElFrontendLogo from "@/components/icons/logo";
import SocialList from "@/components/social/social-list";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="container text-primary h-26 lg:h-22 flex flex-col lg:flex-row justify-between items-center relative z-10 px-2 lg:px-0  py-4 lg:py-0">
      <Link
        className="text-primary flex gap-2 justify-center items-center"
        href="/"
      >
        <ElFrontendLogo className="h-6 w-auto" />
        <span className="text-[#9641FA] text-xl font-medium hover:text-white transition-colors duration-500">
          ElFrontend
        </span>
      </Link>
      <SocialList />
    </nav>
  );
};

export default Navbar;
