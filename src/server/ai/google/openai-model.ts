import { elFrontendPrompt } from "@/lib/ai/prompts";
import { getDataBase64FromUrl } from "@/server/utils/file";
import { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, UserContent } from "ai";

export const askQuestion = async (question: string) => {
  const model = createOpenRouter({ apiKey: process.env.OPENAI_API_KEY });

  const contextFile = await getDataBase64FromUrl(
    `${process.env.NEXT_PUBLIC_APP_URL}/resume.md`
  );

  const content: UserContent = [];

  if (contextFile) {
    content.push({
      type: "file",
      data: contextFile,
      mimeType: "text/markdown",
    });
  }

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
