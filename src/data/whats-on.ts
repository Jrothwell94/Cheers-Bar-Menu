export type EventItem = {
  id: string;
  title: string;
  type: "live-music" | "football" | "special";
  date: string;
  time?: string;
  description?: string;
  image?: string;
};

// This week's line-up. Send Claude your updates each week (text + photos)
// and this list gets refreshed — newest/soonest first.
export const events: EventItem[] = [
  {
    id: "example-live-music",
    title: "Live Acoustic Night — Nikos & Friends",
    type: "live-music",
    date: "2026-07-11",
    time: "21:00",
    description:
      "Live acoustic covers and Greek favourites on the terrace. Grab a table early, it fills up fast!",
  },
  {
    id: "example-football-1",
    title: "Premier League: Arsenal vs Chelsea",
    type: "football",
    date: "2026-07-12",
    time: "17:30",
    description: "Shown live on the big screen. Come early for a good seat.",
  },
  {
    id: "example-football-2",
    title: "Champions League Final Replay Night",
    type: "football",
    date: "2026-07-13",
    time: "20:00",
    description: "Big match, big screen, cold beer.",
  },
];
