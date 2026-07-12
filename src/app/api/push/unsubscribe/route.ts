import { NextRequest, NextResponse } from "next/server";
import { redis, PUSH_SUBSCRIPTIONS_KEY, type StoredPushSubscription } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const subscription = await req.json();
  if (subscription?.endpoint) {
    const all = await redis.smembers<StoredPushSubscription[]>(PUSH_SUBSCRIPTIONS_KEY);
    const match = all.find((sub) => sub.endpoint === subscription.endpoint);
    if (match) await redis.srem(PUSH_SUBSCRIPTIONS_KEY, match);
  }
  return NextResponse.json({ ok: true });
}
