import {
  lastYoutubeVideos,
  mostPopularYoutubeVideos,
  searchYoutube as searchYoutubeService,
} from "@/server/services/youtube";
import { YoutubeSearchResponse } from "@/server/types/youtube";
import { tool } from "ai";
import { z } from "zod";

export const getYoutubePopularVideos = tool({
  description: "Get the 4 most popular videos from the channel",
  parameters: z.object({
    channelId: z.string(),
  }),
  execute: async (): Promise<YoutubeSearchResponse[]> => {
    return await mostPopularYoutubeVideos();
  },
});

export const getYoutubeLastVideos = tool({
  description: "Get the 4 last uploaded videos from the channel",
  parameters: z.object({
    channelId: z.string(),
  }),
  execute: async (): Promise<YoutubeSearchResponse[]> => {
    return await lastYoutubeVideos();
  },
});

export const searchYoutube = tool({
  description: "Search for videos on YouTube",
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }): Promise<YoutubeSearchResponse[]> => {
    return await searchYoutubeService(query);
  },
});
