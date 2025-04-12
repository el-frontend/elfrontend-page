import { elFrontendPrompt } from "@/server/ai/prompts";
import { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, UserContent } from "ai";

export const askQuestion = async (question: string) => {
  const model = createOpenRouter({ apiKey: process.env.OPENAI_API_KEY });

  const content: UserContent = [];      

  content.push({
    type: "file",
    data: `${process.env.NEXT_PUBLIC_APP_URL}/resume.md`,
    mimeType: "text/markdown",
  });

  content.push({ type: "text", text: question });

  const { text } = await generateText({
    model: model("gpt-4o"),
    providerOptions: {
      google: {
        responseModalities: ["TEXT"],
      } satisfies GoogleGenerativeAIProviderOptions,
    },
    system: elFrontendPrompt,
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });

  return text;
};
