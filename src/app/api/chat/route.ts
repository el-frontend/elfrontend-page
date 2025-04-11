import { elFrontendPrompt } from "@/lib/ai/prompts";
import { generateUUID } from "@/lib/utils";
import { google } from "@ai-sdk/google";

import {
  createDataStreamResponse,
  smoothStream,
  streamText,
  UIMessage,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const {
      messages,
    }: {
      messages: Array<UIMessage>;
    } = await request.json();

    return createDataStreamResponse({
      execute: (dataStream) => {
        const googleModel = google("gemini-2.0-flash");

        const result = streamText({
          model: googleModel,
          system: elFrontendPrompt,
          messages,
          maxSteps: 5,
          experimental_transform: smoothStream({ chunking: "word" }),
          experimental_generateMessageId: generateUUID,
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: (e) => {
        console.log(e);
        return "Oops, an error occurred!";
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while processing your request!", {
      status: 404,
    });
  }
}
