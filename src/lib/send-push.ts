import webpush from "web-push";
import { redis, PUSH_SUBSCRIPTIONS_KEY } from "@/lib/redis";
import { VAPID_PUBLIC_KEY, VAPID_SUBJECT } from "@/lib/push-config";

export type PushPayload = {
  title: string;
  body: string;
  url: string;
};

export type PushFailure = {
  statusCode?: number;
  message: string;
};

// Sends `payload` to every stored subscription, pruning any that have
// expired or been revoked. Throws if VAPID_PRIVATE_KEY isn't configured.
export async function sendPushToAll(
  payload: PushPayload,
): Promise<{ sent: number; subscriptionCount: number; failures: PushFailure[] }> {
  if (!process.env.VAPID_PRIVATE_KEY) {
    throw new Error("VAPID_PRIVATE_KEY is not configured");
  }
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

  const subscriptions = await redis.smembers(PUSH_SUBSCRIPTIONS_KEY);
  let sent = 0;
  const failures: PushFailure[] = [];

  await Promise.all(
    subscriptions.map(async (raw) => {
      try {
        const subscription = JSON.parse(raw);
        await webpush.sendNotification(subscription, JSON.stringify(payload));
        sent += 1;
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode;
        const body = (err as { body?: string }).body;
        const message = (err as { message?: string }).message ?? "Unknown error";
        failures.push({ statusCode, message: body || message });
        if (statusCode === 404 || statusCode === 410) {
          await redis.srem(PUSH_SUBSCRIPTIONS_KEY, raw);
        }
      }
    }),
  );

  return { sent, subscriptionCount: subscriptions.length, failures };
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
