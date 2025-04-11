"use server";

import { YoutubeSearchResponse } from "../types/youtube";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY ?? "";
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "";

export const mostPopularYoutubeVideos = async (): Promise<YoutubeSearchResponse[]> => {
  const url = `https://content-youtube.googleapis.com/youtube/v3/search?maxResults=4&part=snippet&type=video&channelId=${YOUTUBE_CHANNEL_ID}&order=viewCount&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  const videos = data.items.filter(
    (item: YoutubeSearchResponse) => item.id.kind === "youtube#video"
  );

  return videos;
};


export const lastYoutubeVideos = async (): Promise<YoutubeSearchResponse[]> => {
    const url = `https://content-youtube.googleapis.com/youtube/v3/search?maxResults=4&part=snippet&type=video&channelId=${YOUTUBE_CHANNEL_ID}&order=date&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
  
    const videos = data.items.filter(
      (item: YoutubeSearchResponse) => item.id.kind === "youtube#video"
    );
  
    return videos;
  };