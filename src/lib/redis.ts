import { Redis } from "@upstash/redis";

// Vercel's "Connect to Project" flow for the Upstash integration names these
// KV_REST_API_URL / KV_REST_API_TOKEN (legacy Vercel KV naming), not the
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN that Redis.fromEnv() expects.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
});

export const PUSH_SUBSCRIPTIONS_KEY = "push:subscriptions";

// @upstash/redis automatically JSON-serializes/deserializes set members, so
// sadd/smembers/srem all work with plain objects — never JSON.stringify or
// JSON.parse them yourself, or you'll double-encode/decode.
export type StoredPushSubscription = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  expirationTime?: number | null;
};
