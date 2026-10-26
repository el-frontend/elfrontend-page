import { generateUUID } from "@/lib/utils";
import { elFrontendPrompt } from "@/server/ai/prompts";
import {
  getYoutubeLastVideos,
  getYoutubePopularVideos,
  searchYoutube,
} from "@/server/ai/tools/youtube";
import { getDataBase64FromUrl } from "@/server/utils/file";

import { google } from "@ai-sdk/google";

import {
  createDataStreamResponse,
  smoothStream,
  streamText,
  UIMessage,
  UserContent,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const {
      messages,
      lang,
    }: {
      messages: Array<UIMessage>;
      /** UI language of the page the chat runs on */
      lang?: "es" | "en";
    } = await request.json();

    const system =
      lang === "en"
        ? `${elFrontendPrompt}\n\nThe visitor is browsing the site in English: answer in English unless they write in another language.`
        : elFrontendPrompt;


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

    return createDataStreamResponse({
      execute: (dataStream) => {
        const googleModel = google("gemini-2.5-flash");

        const result = streamText({
          model: googleModel,
          system,
          messages: [
            {
              role: "user",
              content: contextFile,
            },
            ...messages,
          ],
          maxSteps: 5,
          experimental_transform: smoothStream({ chunking: "word" }),
          experimental_generateMessageId: generateUUID,
          experimental_activeTools: [
            "popularYoutubeVideo",
            "youtubeLastVideos",
            "searchYoutube",
          ],
          tools: {
            searchYoutube,
            popularYoutubeVideo: getYoutubePopularVideos,
            youtubeLastVideos: getYoutubeLastVideos,
          },
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
