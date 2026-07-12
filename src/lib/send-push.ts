import webpush from "web-push";
import { redis, PUSH_SUBSCRIPTIONS_KEY } from "@/lib/redis";
import { VAPID_PUBLIC_KEY, VAPID_SUBJECT } from "@/lib/push-config";

export type PushPayload = {
  title: string;
  body: string;
  url: string;
};

// Sends `payload` to every stored subscription, pruning any that have
// expired or been revoked. Throws if VAPID_PRIVATE_KEY isn't configured.
export async function sendPushToAll(payload: PushPayload): Promise<{ sent: number }> {
  if (!process.env.VAPID_PRIVATE_KEY) {
    throw new Error("VAPID_PRIVATE_KEY is not configured");
  }
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

  const subscriptions = await redis.smembers(PUSH_SUBSCRIPTIONS_KEY);
  let sent = 0;

  await Promise.all(
    subscriptions.map(async (raw) => {
      try {
        const subscription = JSON.parse(raw);
        await webpush.sendNotification(subscription, JSON.stringify(payload));
        sent += 1;
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await redis.srem(PUSH_SUBSCRIPTIONS_KEY, raw);
        }
      }
    }),
  );

  return { sent };
}

export function requireAuthorized(req: Request): boolean {
  const url = new URL(req.url);
  const auth = req.headers.get("authorization");
  const querySecret = url.searchParams.get("secret");
  return (
    auth === `Bearer ${process.env.CRON_SECRET}` ||
    (!!querySecret && querySecret === process.env.CRON_SECRET)
  );
}
