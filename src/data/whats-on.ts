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
    id: "just-ray-live",
    title: "Just Ray — Live Ska, Funk & Rock",
    type: "live-music",
    date: "2026-07-15",
    time: "21:00",
    description:
      "Just Ray live every Wednesday from 9PM, singing Ska, Funk & Rock. Good music, cold drinks, great company.",
    image: "/just-ray.png",
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
