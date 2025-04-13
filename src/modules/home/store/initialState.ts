"use client";

import { UIMessage } from "ai";
import { BackgroundType } from "./types";
export interface IMainStore {
  messages: UIMessage[];
  isEnableBeautifulCursor: boolean;
  background: BackgroundType;
}

const initialState: IMainStore = {
  messages: [],
  // isEnableBeautifulCursor: localStorage.getItem("beautiful-cursor") === "true",
  // background: (localStorage.getItem("background") ?? "none") as BackgroundType,
  isEnableBeautifulCursor: false,
  background: "none",
};

export default initialState;
