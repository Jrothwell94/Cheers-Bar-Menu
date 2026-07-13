import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { VIEWS_KEY } from "@/lib/views";
import { menuItems } from "@/data/menu";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const slug = body?.slug;
  if (typeof slug !== "string" || !menuItems.some((item) => item.slug === slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  try {
    await redis.zincrby(VIEWS_KEY, 1, slug);
  } catch {
    // View tracking is best-effort — a Redis hiccup shouldn't surface as an error.
  }
  return NextResponse.json({ ok: true });
}
