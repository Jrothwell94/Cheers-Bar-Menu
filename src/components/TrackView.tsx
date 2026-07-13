"use client";

import { useEffect } from "react";

export default function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    const body = JSON.stringify({ slug });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/views", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }, [slug]);

  return null;
}
