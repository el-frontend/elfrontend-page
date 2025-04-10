"use server";

import { getDataBase64Media } from "@/server/utils/file";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { generateText, UserContent } from "ai";

export const askQuestion = async (question: string) => {
  const googleModel = google("gemini-2.0-flash");

  const contextFile = await getDataBase64Media("cv.pdf");

  const content: UserContent = [];

  if (contextFile) {
    content.push({
      type: "file",
      data: contextFile,
      mimeType: "application/pdf",
    });
  }

  content.push({ type: "text", text: question });

  const { text } = await generateText({
    model: googleModel,
    providerOptions: {
      google: {
        responseModalities: ["TEXT"],
      } satisfies GoogleGenerativeAIProviderOptions,
    },
    system:
      "You are an online assistant helping users learn about Carlos Chao (ElFrontend). Please address all user questions specifically about Carlos Chao and the ElFrontend scope. Format all the response in markdown and include links if is necessary to help in the answer",
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });

  return text;
};
