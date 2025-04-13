"use client";

import SplashCursor from "@/components/animations/splash-cursor";
import { useMainContext } from "@/modules/home/store";

const BeautifulCursor = () => {
  const { state } = useMainContext();

  return state.isEnableBeautifulCursor ? <SplashCursor  SPLAT_RADIUS={0.02} /> : null;
};

export default BeautifulCursor;
