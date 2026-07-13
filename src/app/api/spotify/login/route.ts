import { NextRequest, NextResponse } from "next/server";
import { requireAuthorized } from "@/lib/send-push";

// Kicks off the one-time Spotify authorization. Gated behind the admin
// secret so a stranger can't stumble onto this URL and connect their own
// Spotify account in place of the bar's.
export async function GET(req: NextRequest) {
  if (!requireAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "SPOTIFY_CLIENT_ID is not configured" }, { status: 500 });
  }

  const redirectUri = `${req.nextUrl.origin}/api/spotify/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "user-read-currently-playing",
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params}`);
}
