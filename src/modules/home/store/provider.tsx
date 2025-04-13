'use client';

import React, { FC, useReducer } from "react";

import MainContext from "./context";
import initialState from "./initialState";
import reducer from "./reducer";

const MainProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <MainContext value={{ state, dispatch }}>{children}</MainContext>
  
};
export default MainProvider;