import { Redis } from "@upstash/redis";

// Reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, set automatically
// once a Redis store is connected to the project in the Vercel dashboard.
export const redis = Redis.fromEnv();

export const PUSH_SUBSCRIPTIONS_KEY = "push:subscriptions";
