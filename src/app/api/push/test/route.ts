import { NextRequest, NextResponse } from "next/server";
import { requireAuthorized, sendPushToAll } from "@/lib/send-push";

// Sends an immediate test notification to everyone currently subscribed,
// bypassing all "is anything due" logic — for verifying the pipeline works.
export async function GET(req: NextRequest) {
  if (!requireAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sent } = await sendPushToAll({
    title: "Test notification from Cheers Bar",
    body: "If you can see this, notifications are working.",
    url: "/whats-on",
  });

  return NextResponse.json({ ok: true, sent });
}
