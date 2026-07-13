import { unstable_cache } from "next/cache";
import { redis } from "@/lib/redis";

export const VIEWS_KEY = "menu:views";

// Wrapped in unstable_cache so this reads as an explicit Next.js cache
// operation rather than an uncached external call — otherwise, hitting
// Redis directly inside a page component forces that whole route out of
// static generation and into fully dynamic (per-request) rendering.
const getCachedTop = unstable_cache(
  async (limit: number) => {
    try {
      return await redis.zrange<string[]>(VIEWS_KEY, 0, limit - 1, { rev: true });
    } catch {
      return [];
    }
  },
  ["trending-slugs"],
  { revalidate: 1800 },
);

export async function getTrendingSlugs(limit = 3): Promise<Set<string>> {
  return new Set(await getCachedTop(limit));
}
