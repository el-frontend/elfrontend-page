"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const MESSAGE_LIMIT = 6;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY = "chat_rate_limit";

interface ChatRateLimitState {
  messageCount: number;
  resetTime: number;
  isLimitReached: boolean;
}

type ChatRateLimitAction =
  | { type: "INCREMENT_MESSAGE" }
  | { type: "RESET" }
  | { type: "LOAD_STATE"; payload: ChatRateLimitState };

interface ChatRateLimitContextType {
  state: ChatRateLimitState;
  incrementMessage: () => boolean;
  remainingMessages: number;
  resetIn: string;
}

const initialState: ChatRateLimitState = {
  messageCount: 0,
  resetTime: Date.now() + RESET_INTERVAL_MS,
  isLimitReached: false,
};

function chatRateLimitReducer(
  state: ChatRateLimitState,
  action: ChatRateLimitAction
): ChatRateLimitState {
  switch (action.type) {
    case "INCREMENT_MESSAGE": {
      const newCount = state.messageCount + 1;
      return {
        ...state,
        messageCount: newCount,
        isLimitReached: newCount >= MESSAGE_LIMIT,
      };
    }
    case "RESET": {
      return {
        messageCount: 0,
        resetTime: Date.now() + RESET_INTERVAL_MS,
        isLimitReached: false,
      };
    }
    case "LOAD_STATE": {
      return action.payload;
    }
    default:
      return state;
  }
}

const ChatRateLimitContext = createContext<ChatRateLimitContextType | null>(null);

export function ChatRateLimitProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatRateLimitReducer, initialState);
  const [resetIn, setResetIn] = useState<string>("24h 0m");

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: ChatRateLimitState = JSON.parse(stored);
        
        // Check if reset time has passed
        if (Date.now() >= parsed.resetTime) {
          dispatch({ type: "RESET" });
        } else {
          dispatch({ type: "LOAD_STATE", payload: parsed });
        }
      } catch {
        dispatch({ type: "RESET" });
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Check for reset periodically and update resetIn
  useEffect(() => {
    const updateResetIn = () => {
      const diff = state.resetTime - Date.now();
      if (diff <= 0) {
        setResetIn("now");
        dispatch({ type: "RESET" });
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setResetIn(`${hours}h ${minutes}m`);
      } else {
        setResetIn(`${minutes}m`);
      }
    };

    updateResetIn();
    const interval = setInterval(updateResetIn, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [state.resetTime]);

  const incrementMessage = (): boolean => {
    if (state.isLimitReached) {
      return false;
    }
    dispatch({ type: "INCREMENT_MESSAGE" });
    return true;
  };

  const remainingMessages = Math.max(0, MESSAGE_LIMIT - state.messageCount);

  return (
    <ChatRateLimitContext.Provider
      value={{
        state,
        incrementMessage,
        remainingMessages,
        resetIn,
      }}
    >
      {children}
    </ChatRateLimitContext.Provider>
  );
}

export function useChatRateLimit() {
  const context = useContext(ChatRateLimitContext);
  if (!context) {
    throw new Error("useChatRateLimit must be used within ChatRateLimitProvider");
  }
  return context;
}
