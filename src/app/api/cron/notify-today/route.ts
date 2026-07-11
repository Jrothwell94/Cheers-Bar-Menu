import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { redis, PUSH_SUBSCRIPTIONS_KEY } from "@/lib/redis";
import { events } from "@/data/whats-on";
import { todayISO, getTodaysEvents } from "@/lib/events";
import { VAPID_PUBLIC_KEY, VAPID_SUBJECT } from "@/lib/push-config";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.VAPID_PRIVATE_KEY) {
    return NextResponse.json({ error: "VAPID_PRIVATE_KEY is not configured" }, { status: 500 });
  }
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

  const today = todayISO();
  const todaysEvents = getTodaysEvents(events, today);
  if (todaysEvents.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: "no events today" });
  }

  const notifiedKey = `push:notified:${today}`;
  const alreadySent = await redis.get(notifiedKey);
  if (alreadySent) {
    return NextResponse.json({ ok: true, sent: 0, reason: "already sent today" });
  }

  const title =
    todaysEvents.length === 1 ? `Tonight at Cheers: ${todaysEvents[0].title}` : "What's on today at Cheers";
  const body =
    todaysEvents.length === 1
      ? [todaysEvents[0].time, todaysEvents[0].description].filter(Boolean).join(" — ")
      : todaysEvents.map((event) => event.title).join(" · ");
  const payload = JSON.stringify({ title, body, url: "/whats-on" });

  const subscriptions = await redis.smembers(PUSH_SUBSCRIPTIONS_KEY);
  let sent = 0;

  await Promise.all(
    subscriptions.map(async (raw) => {
      try {
        const subscription = JSON.parse(raw);
        await webpush.sendNotification(subscription, payload);
        sent += 1;
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await redis.srem(PUSH_SUBSCRIPTIONS_KEY, raw);
        }
      }
    }),
  );

  await redis.set(notifiedKey, "1", { ex: 60 * 60 * 20 });
  return NextResponse.json({ ok: true, sent });
}
