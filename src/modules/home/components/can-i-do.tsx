import { TypewriterEffect } from "@/components/animations/typewriter-effect";

const CanIDo = () => {
  return (
    <TypewriterEffect
      className="lg:text-3xl"
      cursorClassName="lg:h-6 lg:w-[3px]"
      words={[
        { text: "What" },
        { text: "can" },
        { text: "I" },
        { text: "do" },
        { text: "for" },
        { text: "you?", className: "text-purple-700 dark:text-purple-700" },
      ]}
    />
  );
};
export default CanIDo;
