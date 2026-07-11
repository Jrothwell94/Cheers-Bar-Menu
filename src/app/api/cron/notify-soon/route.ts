import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { redis, PUSH_SUBSCRIPTIONS_KEY } from "@/lib/redis";
import { events } from "@/data/whats-on";
import { getEventsStartingSoon, formatEventDate } from "@/lib/events";
import { VAPID_PUBLIC_KEY, VAPID_SUBJECT } from "@/lib/push-config";

const REMINDER_LEAD_HOURS = 2;

// Polled frequently (every 15-30 min via an external scheduler, since Vercel's
// free plan only allows daily cron) to catch events starting soon — a second,
// more urgent nudge on top of the once-daily "coming up" notice.
// Handles both GET (manual/Vercel-style) and POST (QStash's default).
async function handle(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const querySecret = req.nextUrl.searchParams.get("secret");
  const authorized =
    auth === `Bearer ${process.env.CRON_SECRET}` ||
    (!!querySecret && querySecret === process.env.CRON_SECRET);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.VAPID_PRIVATE_KEY) {
    return NextResponse.json({ error: "VAPID_PRIVATE_KEY is not configured" }, { status: 500 });
  }
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

  const soon = getEventsStartingSoon(events, REMINDER_LEAD_HOURS);
  const due = [];
  for (const event of soon) {
    const reminderKey = `push:reminder:${event.id}:${event.date}`;
    const alreadySent = await redis.get(reminderKey);
    if (!alreadySent) due.push({ event, reminderKey });
  }

  if (due.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: "nothing starting soon" });
  }

  const title =
    due.length === 1 ? `Starting soon at Cheers: ${due[0].event.title}` : "Starting soon at Cheers";
  const body = due
    .map(({ event }) =>
      [`${formatEventDate(event.date)}${event.time ? ` · ${event.time}` : ""}`, event.title]
        .filter(Boolean)
        .join(" — "),
    )
    .join("\n");
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

  await Promise.all(due.map(({ reminderKey }) => redis.set(reminderKey, "1", { ex: 60 * 60 * 26 })));

  return NextResponse.json({ ok: true, sent, events: due.map(({ event }) => event.title) });
}

export const GET = handle;
export const POST = handle;
