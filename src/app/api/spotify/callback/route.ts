import { NextRequest, NextResponse } from "next/server";
import { saveSpotifyRefreshToken } from "@/lib/spotify";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  if (error) {
    return new NextResponse(`Spotify authorization failed: ${error}`, { status: 400 });
  }
  if (!code) {
    return new NextResponse("Missing code", { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Spotify client credentials are not configured", { status: 500 });
  }

  const redirectUri = `${req.nextUrl.origin}/api/spotify/callback`;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return new NextResponse(`Failed to exchange code: ${text}`, { status: 500 });
  }

  const data = await res.json();
  if (!data.refresh_token) {
    return new NextResponse("No refresh token returned by Spotify", { status: 500 });
  }

  await saveSpotifyRefreshToken(data.refresh_token);

  return new NextResponse(
    "Spotify connected! You can close this tab — Now Playing will start working on the site shortly.",
    { status: 200, headers: { "Content-Type": "text/plain" } },
  );
}
