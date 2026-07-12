import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { events } from "@/data/whats-on";
import { todayISO, getEventsToNotify, formatEventDate } from "@/lib/events";
import { requireAuthorized, sendPushToAll } from "@/lib/send-push";

export async function GET(req: NextRequest) {
  // Vercel Cron sends the secret as a Bearer header; a `?secret=` query param
  // is also accepted so this can be triggered manually from a phone browser.
  if (!requireAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = todayISO();
  const toNotify = getEventsToNotify(events, today);
  if (toNotify.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: "nothing to notify today" });
  }

  const notifiedKey = `push:notified:${today}`;
  const alreadySent = await redis.get(notifiedKey);
  if (alreadySent) {
    return NextResponse.json({ ok: true, sent: 0, reason: "already sent today" });
  }

  const title = toNotify.length === 1 ? `Coming up at Cheers: ${toNotify[0].title}` : "Coming up at Cheers";
  const body = toNotify
    .map((event) =>
      [`${formatEventDate(event.date)}${event.time ? ` · ${event.time}` : ""}`, event.title]
        .filter(Boolean)
        .join(" — "),
    )
    .join("\n");

  const { sent } = await sendPushToAll({ title, body, url: "/whats-on" });

  await redis.set(notifiedKey, "1", { ex: 60 * 60 * 20 });
  return NextResponse.json({ ok: true, sent });
}
