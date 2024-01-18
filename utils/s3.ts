import { S3Client } from "https://deno.land/x/s3_lite_client@0.6.1/mod.ts";
import config from "@/utils/config.ts";

const bucketName = "free-sheets";
const region = "EEUR";

const s3Client = new S3Client({
  endPoint: config.s3Endpoint as string,
  pathStyle: false,
  region,
  accessKey: config.s3AccessKey,
  secretKey: config.s3SecretKey,
});

export const uploadObject = (key: string, file: ReadableStream) => {
  const chunks = key.split("/");
  const filename = chunks[chunks.length - 1];

  return s3Client.putObject(key, file, {
    bucketName,
    partSize: 6 * 1024 * 1024,
    metadata: {
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
};

export const getFileUrl = (key: string) => {
  return s3Client.getPresignedUrl("GET", key, {
    bucketName,
    expirySeconds: 60 * 5,
  });
};
