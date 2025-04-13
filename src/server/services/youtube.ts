"use server";

import { YoutubeSearchResponse } from "../types/youtube";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY ?? "";
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "";

export const mostPopularYoutubeVideos = async (): Promise<
  YoutubeSearchResponse[]
> => {
  try {
    const url = `https://content-youtube.googleapis.com/youtube/v3/search?maxResults=4&part=snippet&type=video&channelId=${YOUTUBE_CHANNEL_ID}&order=viewCount&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url, {
      next: {
        revalidate: 3600 * 24,
      },
    });
    const data = await response.json();

    const videos = data.items.filter(
      (item: YoutubeSearchResponse) => item.id.kind === "youtube#video"
    );

    return videos;
  } catch (e) {
    console.log("Error getting most popular youtube videos", e);
    return [];
  }
};

export const lastYoutubeVideos = async (): Promise<YoutubeSearchResponse[]> => {
  try {
    const url = `https://content-youtube.googleapis.com/youtube/v3/search?maxResults=4&part=snippet&type=video&channelId=${YOUTUBE_CHANNEL_ID}&order=date&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url, {
      next: {
        revalidate: 3600 * 24,
      },
    });
    const data = await response.json();
    const videos = data.items.filter(
      (item: YoutubeSearchResponse) => item.id.kind === "youtube#video"
    );

    return videos;
  } catch (e) {
    console.log("Error getting last youtube videos", e);
    return [];
  }
};

export const searchYoutube = async (
  q: string
): Promise<YoutubeSearchResponse[]> => {
  try {
    const url = `https://content-youtube.googleapis.com/youtube/v3/search?maxResults=4&part=snippet&type=video&channelId=${YOUTUBE_CHANNEL_ID}&order=date&key=${YOUTUBE_API_KEY}&q=${q}`;
    const response = await fetch(url, {
      next: {
        revalidate: 3600 * 24,
      },
    });
    const data = await response.json();

    const videos = data.items.filter(
      (item: YoutubeSearchResponse) => item.id.kind === "youtube#video"
    );

    return videos;
  } catch {
    return [];
  }
};
