"use client";

import { useEffect, useState } from "react";

type NowPlayingState =
  | { isPlaying: false }
  | { isPlaying: true; track: string; artist: string; albumArt?: string; url?: string };

const POLL_MS = 20000;

export default function NowPlaying() {
  const [state, setState] = useState<NowPlayingState | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/spotify/now-playing");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setState(data);
      } catch {
        // Transient network hiccup — just try again next interval.
      }
    }

    poll();
    const interval = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!state?.isPlaying) return null;

  return (
    <a
      href={state.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5"
    >
      {state.albumArt && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={state.albumArt}
          alt=""
          className="h-10 w-10 shrink-0 rounded-md object-cover"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wide text-gold">🎵 Now Playing</p>
        <p className="truncate text-sm text-foreground">{state.track}</p>
        <p className="truncate text-[12px] text-muted">{state.artist}</p>
      </div>
    </a>
  );
}
