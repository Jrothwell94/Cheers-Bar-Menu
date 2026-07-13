import { redis } from "@/lib/redis";

const REFRESH_TOKEN_KEY = "spotify:refresh_token";

export async function saveSpotifyRefreshToken(token: string) {
  await redis.set(REFRESH_TOKEN_KEY, token);
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = await redis.get<string>(REFRESH_TOKEN_KEY);
  if (!clientId || !clientSecret || !refreshToken) return null;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  });
  if (!res.ok) return null;

  const data = await res.json();
  // Spotify sometimes rotates the refresh token — persist the new one if so.
  if (data.refresh_token) await saveSpotifyRefreshToken(data.refresh_token);
  return data.access_token as string;
}

export type NowPlaying =
  | { isPlaying: false }
  | { isPlaying: true; track: string; artist: string; albumArt?: string; url?: string };

// Falls back to "nothing playing" on any error — a Spotify/Redis hiccup
// should never break the page the widget sits on.
export async function getNowPlaying(): Promise<NowPlaying> {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return { isPlaying: false };

    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    // 204 = nothing playing right now.
    if (!res.ok || res.status === 204) return { isPlaying: false };

    const data = await res.json().catch(() => null);
    if (!data?.is_playing || data.currently_playing_type !== "track" || !data.item) {
      return { isPlaying: false };
    }

    return {
      isPlaying: true,
      track: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
      albumArt: data.item.album?.images?.[0]?.url,
      url: data.item.external_urls?.spotify,
    };
  } catch {
    return { isPlaying: false };
  }
}
