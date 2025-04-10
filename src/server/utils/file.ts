"use server";

import fs from "fs";
import path from "path";

export async function getDataBase64Media(fileName: string) {
  const filePath = path.join(process.cwd(), "data", fileName);
  const fileBuffer = fs.readFileSync(filePath);
  const base64 = fileBuffer.toString("base64");

  const mimeType = await getMimeType(fileName); // helper function
  return `data:${mimeType};base64,${base64}`;
}

export async function getMimeType(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".pdf":
      return "application/pdf";
    case ".mp4":
      return "video/mp4";
    case ".md":
      return "text/markdown";
    default:
      return "application/octet-stream";
  }
}
