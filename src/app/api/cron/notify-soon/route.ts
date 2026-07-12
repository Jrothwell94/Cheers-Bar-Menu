import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { events } from "@/data/whats-on";
import { getEventsStartingSoon, formatEventDate } from "@/lib/events";
import { requireAuthorized, sendPushToAll } from "@/lib/send-push";

const REMINDER_LEAD_HOURS = 2;

// Polled frequently (every 15-30 min via an external scheduler, since Vercel's
// free plan only allows daily cron) to catch events starting soon — a second,
// more urgent nudge on top of the once-daily "coming up" notice.
// Handles both GET (manual/Vercel-style) and POST (QStash's default).
async function handle(req: NextRequest) {
  if (!requireAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const { sent } = await sendPushToAll({ title, body, url: "/whats-on" });

  await Promise.all(due.map(({ reminderKey }) => redis.set(reminderKey, "1", { ex: 60 * 60 * 26 })));

  return NextResponse.json({ ok: true, sent, events: due.map(({ event }) => event.title) });
}

export const GET = handle;
export const POST = handle;
