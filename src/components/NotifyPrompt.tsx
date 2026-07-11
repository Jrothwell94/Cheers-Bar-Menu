"use client";

import { useEffect, useState } from "react";
import { VAPID_PUBLIC_KEY } from "@/lib/push-config";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}

type Status = "checking" | "ios-install" | "unsupported" | "denied" | "subscribed" | "ready";

export default function NotifyPrompt() {
  const [status, setStatus] = useState<Status>("checking");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isIos() && !isStandalone()) {
      setStatus("ios-install");
      return;
    }

    const hasPush = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    if (!hasPush) {
      setStatus("unsupported");
      return;
    }

    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }

    navigator.serviceWorker.ready.then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      setStatus(sub ? "subscribed" : "ready");
    });
  }, []);

  async function handleEnable() {
    setBusy(true);
    setError("");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "denied" : "ready");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });
      if (!res.ok) {
        await subscription.unsubscribe();
        throw new Error("save failed");
      }
      setStatus("subscribed");
    } catch {
      setError("Something went wrong enabling notifications — please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDisable() {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subscription),
        });
        await subscription.unsubscribe();
      }
      setStatus("ready");
    } finally {
      setBusy(false);
    }
  }

  if (status === "checking" || status === "unsupported") return null;

  if (status === "ios-install") {
    return (
      <div className="rounded-xl border border-line bg-surface p-4 text-sm text-muted-strong">
        <p className="mb-1 font-medium text-gold-soft">
          Install Cheers to get notified what&apos;s on
        </p>
        <p>
          Tap the Share icon, choose <strong>Add to Home Screen</strong>, then open Cheers from
          your home screen to turn on notifications.
        </p>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="rounded-xl border border-line bg-surface p-4 text-sm text-muted-strong">
        Notifications are blocked — enable them in your browser settings to get notified what&apos;s
        on today.
      </div>
    );
  }

  if (status === "subscribed") {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4 text-sm">
        <span className="text-foreground">
          🔔 You&apos;ll be notified when something&apos;s on today.
        </span>
        <button
          onClick={handleDisable}
          disabled={busy}
          className="shrink-0 text-xs text-muted underline"
        >
          Turn off
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleEnable}
        disabled={busy}
        className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface p-4 text-sm font-medium text-gold-soft disabled:opacity-60"
      >
        🔔 Install Cheers — get notified what&apos;s on
      </button>
      {error && <p className="text-xs text-muted">{error}</p>}
    </div>
  );
}
