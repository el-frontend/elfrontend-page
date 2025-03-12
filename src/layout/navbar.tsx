import ElFrontendLogo from "@/components/icons/logo";
import SocialList from "@/components/social/social-list";

const Navbar = () => {
  return (
    <nav className="container text-primary h-22 flex justify-between items-center">
      <a
        className="text-primary flex gap-2 justify-center items-center"
        href="/"
      >
        <ElFrontendLogo className="h-6 w-auto" />
        <span className="text-[#9641FA] text-xl font-medium hover:text-white transition-colors duration-500">
          ElFrontend
        </span>
      </a>
      <SocialList />
    </nav>
  );
};

export default Navbar;
