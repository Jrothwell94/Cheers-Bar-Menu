import { NextRequest, NextResponse } from "next/server";
import { redis, PUSH_SUBSCRIPTIONS_KEY } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const subscription = await req.json();
  if (!subscription?.endpoint) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }
  try {
    // @upstash/redis serializes objects automatically — don't JSON.stringify here.
    await redis.sadd(PUSH_SUBSCRIPTIONS_KEY, subscription);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save subscription" }, { status: 500 });
  }
}
