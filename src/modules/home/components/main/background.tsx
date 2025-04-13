'use client'

import { BackgroundAurora } from "@/components/animations/background-aurora";
import { BackgroundBeams } from "@/components/animations/background-beams";
import { GridBackground } from "@/components/animations/background-grid";
import { useMainContext } from "@/modules/home/store";

const BackgroundSwitcher = () => {
  const { state } = useMainContext();

  const getBackground = () => {
    switch (state.background) {
      case "grid":
        return <GridBackground />;
      case "beams":
        return <BackgroundBeams />;
      case "aurora":
        return <BackgroundAurora />;
      default:
        return null;
    }
  };

  return getBackground();
};

export default BackgroundSwitcher;
