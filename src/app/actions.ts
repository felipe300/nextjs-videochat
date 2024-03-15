"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export async function getToken() {
  const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
  const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET;

  if (!streamApiKey || !streamApiSecret) {
    throw new Error("Stream Api key or Secret not set");
  }

  const user = await currentUser();

  if (!user) {
    throw new Error("user not authenticated");
  }

  const streamClient = new StreamClient(streamApiKey, streamApiSecret);

  const time = Math.floor(Date.now() / 1000);
  const expirationTime = time + 60 * 60;
  const issuedAt = time - 60;

  const token = streamClient.createToken(user.id, expirationTime, issuedAt);

  return token;
}

export async function getUserId(emailAddresses: string[]) {
  const response = await clerkClient.users.getUserList({
    emailAddress: emailAddresses,
  });

  return response.map((user) => user.id);
}
