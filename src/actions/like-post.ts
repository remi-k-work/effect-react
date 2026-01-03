"use server";

import { Effect } from "effect";
import { RuntimeServer } from "../services/RuntimeServer";

export const likePost = async (id: number) => {
  await RuntimeServer.runPromise(Effect.sleep("2 seconds"));
  throw new Error(`Failed to like post ${id}`);
};
