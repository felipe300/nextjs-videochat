import { z } from "zod";

const environmentSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_STREAM_VIDEO_API_KEY: z.string(),
  STREAM_VIDEO_API_SECRET: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
});

const {
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  STREAM_VIDEO_API_SECRET,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
} = process.env;

const parseRessult = environmentSchema.safeParse({
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  STREAM_VIDEO_API_SECRET,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
});

if (!parseRessult.success) {
  console.error(parseRessult.error);
  throw new Error("environment don't match the schema");
}

export const environmentVariables = parseRessult.data;

type EnvVariablesType = z.infer<typeof environmentSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVariablesType {}
  }
}
