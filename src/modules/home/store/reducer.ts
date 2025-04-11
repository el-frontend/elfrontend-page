import { TAction } from "./actions";
import { IChatState } from "./initialState";

const reducer = (state: IChatState, action: TAction): IChatState => {
  const { type } = action;
  switch (type) {
    case "UPDATE_MESSAGES":
      return { ...state, messages: action.payload.messages };
    default:
      return state;
  }
};
export default reducer;