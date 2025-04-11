"use server";

import { elFrontendPrompt } from "@/lib/ai/prompts";
import { getDataBase64FromUrl } from "@/server/utils/file";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { CoreMessage, generateText, streamText, UserContent } from "ai";
import { createStreamableValue, StreamableValue } from "ai/rsc";

export const askQuestion = async (question: string) => {
  const googleModel = google("gemini-2.0-flash");

  const contextFile = await getDataBase64FromUrl(
    `${process.env.NEXT_PUBLIC_APP_URL}/resume.md`
  );

  const content: UserContent = [];

  if (contextFile) {
    content.push({
      type: "file",
      data: `${process.env.NEXT_PUBLIC_APP_URL}/resume.md`,
      mimeType: "text/markdown",
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

export const askQuestionStream = async (
  question: string
): Promise<StreamableValue<string, unknown>> => {
  const googleModel = google("gemini-2.0-flash");

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

  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: googleModel,
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

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return stream.value;
};

export const askStreaming = async (
  messages: CoreMessage[]
): Promise<Response> => {
  const googleModel = google("gemini-2.0-flash");

  const result = streamText({
    model: googleModel,
    providerOptions: {
      google: {
        responseModalities: ["TEXT"],
      } satisfies GoogleGenerativeAIProviderOptions,
    },
    system: elFrontendPrompt,
    messages: messages,
  });

  return result.toDataStreamResponse();
};
