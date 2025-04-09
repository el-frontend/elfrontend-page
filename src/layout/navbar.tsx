import ElFrontendLogo from "@/components/icons/logo";
import SocialList from "@/components/social/social-list";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="container text-primary h-22 flex justify-between items-center relative">
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
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-center text-red-600">
        Under Construction
      </span>
    </nav>
  );
};

export default Navbar;
