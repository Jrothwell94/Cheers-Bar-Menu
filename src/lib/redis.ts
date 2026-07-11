import { Redis } from "@upstash/redis";

// Vercel's "Connect to Project" flow for the Upstash integration names these
// KV_REST_API_URL / KV_REST_API_TOKEN (legacy Vercel KV naming), not the
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN that Redis.fromEnv() expects.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
});

export const PUSH_SUBSCRIPTIONS_KEY = "push:subscriptions";
