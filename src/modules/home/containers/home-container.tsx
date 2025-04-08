import AskAboutMe from "../components/ask-about-me";
import CanIDo from "../components/can-i-do";
import Profile from "../components/profile";

const HomeContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-8">
      <Profile />
      <CanIDo />
      <AskAboutMe />
    </div>
  );
};

export default HomeContainer;
