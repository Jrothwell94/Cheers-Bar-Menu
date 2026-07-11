export type EventItem = {
  id: string;
  title: string;
  type: "live-music" | "football" | "special";
  date: string;
  time?: string;
  description?: string;
  image?: string;
  // Set to "weekly" for a standing gig that repeats every week — `date`
  // just needs to be any one occurrence, the page works out the next one.
  recurring?: "weekly";
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
    recurring: "weekly",
  },
  {
    id: "norway-england",
    title: "Norway vs England — World Cup 2026",
    type: "football",
    date: "2026-07-12",
    time: "00:00",
    description:
      "2 nations, 1 battle — live on our two massive 135\" screens. Cold drinks, great atmosphere, all the action.",
    image: "/norway-england.png",
  },
  {
    id: "ufc-329",
    title: "UFC 329: McGregor vs Holloway",
    type: "special",
    date: "2026-07-12",
    time: "04:00",
    description:
      "Two legends, one moment — live on the big screen. Fight fans welcome.",
    image: "/ufc-329.png",
  },
];
