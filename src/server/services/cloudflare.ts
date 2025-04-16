"use server";

import { generateUUID } from "@/lib/utils";
import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";

const R2Url = `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;

const getClient = () => {
  return new S3Client({
    region: "auto",
    endpoint: R2Url,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY ?? "",
      secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY ?? "",
    },
  });
};

export const uploadFile = async (
  file: File
): Promise<{ fileId: string; url: string }> => {
  const client = getClient();
  const fileId = generateUUID();
  const params = {
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
    Key: fileId,
    Body: file,
    ACL: "public-read" as const,
  };
  const command = new PutObjectCommand(params);
  try {
    const response = await client.send(command);
    console.log(response, "response s3");
    return {
      fileId,
      url: `${process.env.CLOUDFLARE_PUBLIC_URL}/${fileId}`,
    };
  } catch (caught) {
    if (
      caught instanceof S3ServiceException &&
      caught.name === "EntityTooLarge"
    ) {
      throw new Error(`Error from uploadFile, the file is too large`);
    } else if (caught instanceof S3ServiceException) {
      throw new Error(
        `Error from uploadFile, ${caught.name}: ${caught.message}`
      );
    } else {
      throw caught;
    }
  }
};
