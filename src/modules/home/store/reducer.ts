"use client";

import { TAction } from "./actions";
import { IMainStore } from "./initialState";
import { BackgroundType } from "./types";

const reducer = (state: IMainStore, action: TAction): IMainStore => {
  const { type } = action;
  switch (type) {
    case "UPDATE_MESSAGES":
      return { ...state, messages: action.payload };
    case "TOGGLE_BEAUTIFUL_CURSOR":
      localStorage.setItem(
        "beautiful-cursor",
        action.payload ? "true" : "false"
      );
      return { ...state, isEnableBeautifulCursor: action.payload };
    case "UPDATE_BACKGROUND":
      if (
        !(["none", "grid", "beams", "aurora"] as BackgroundType[]).includes(
          action.payload
        )
      ) {
        return state;
      }
      localStorage.setItem("background", action.payload);
      return { ...state, background: action.payload };
    default:
      return state;
  }
};
export default reducer;
