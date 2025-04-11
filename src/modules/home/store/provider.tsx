'use client';

import React, { FC, useReducer } from "react";

import ChatContext from "./context";
import initialState from "./initialState";
import reducer from "./reducer";

const ChatProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <ChatContext value={{ state, dispatch }}>{children}</ChatContext>
  
};
export default ChatProvider;