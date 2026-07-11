import { NextRequest, NextResponse } from "next/server";
import { redis, PUSH_SUBSCRIPTIONS_KEY } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const subscription = await req.json();
  if (subscription?.endpoint) {
    const all = await redis.smembers(PUSH_SUBSCRIPTIONS_KEY);
    const match = all.find((raw) => {
      try {
        return JSON.parse(raw).endpoint === subscription.endpoint;
      } catch {
        return false;
      }
    });
    if (match) await redis.srem(PUSH_SUBSCRIPTIONS_KEY, match);
  }
  return NextResponse.json({ ok: true });
}
