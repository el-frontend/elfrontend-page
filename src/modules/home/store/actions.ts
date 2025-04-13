import { BackgroundType } from "./types";

export type MainTypes =
  | "UPDATE_MESSAGES"
  | "TOGGLE_BEAUTIFUL_CURSOR"
  | "UPDATE_BACKGROUND";

type Action<T> = {
  type: MainTypes;
  payload: T;
};

interface IUpdateMessages extends Action<[]> {
  type: "UPDATE_MESSAGES";
}

interface IToggleBeautifulCursor extends Action<boolean> {
  type: "TOGGLE_BEAUTIFUL_CURSOR";
}

interface IUpdateBackground extends Action<BackgroundType> {
  type: "UPDATE_BACKGROUND";
}

export type TAction =
  | IUpdateMessages
  | IToggleBeautifulCursor
  | IUpdateBackground;
