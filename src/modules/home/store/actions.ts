import { IChatState } from "./initialState";

export type ChatTypes = "UPDATE_MESSAGES";

type Action<T> = {
  type: ChatTypes;
  payload: T;
};

interface IUpdateMessages extends Action<IChatState> {
  type: "UPDATE_MESSAGES";
}

export type TAction = IUpdateMessages;
