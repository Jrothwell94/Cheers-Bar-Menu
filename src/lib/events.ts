import type { EventItem } from "@/data/whats-on";

const BAR_TIMEZONE = "Europe/Athens";

// "Today" as the bar's local calendar date, regardless of the server's own timezone.
export function todayISO(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: BAR_TIMEZONE }).format(new Date());
}

function weekdayOf(iso: string): number {
  return new Date(`${iso}T12:00:00Z`).getUTCDay();
}

function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// For a recurring event, `date` is just one occurrence — roll it forward
// to the next date (today or later) that falls on the same day of week.
export function nextOccurrence(anchorIso: string, today = todayISO()): string {
  const daysUntil = (weekdayOf(anchorIso) - weekdayOf(today) + 7) % 7;
  return addDaysISO(today, daysUntil);
}

function resolvedDate(event: EventItem, today: string): string {
  return event.recurring === "weekly" ? nextOccurrence(event.date, today) : event.date;
}

export function getResolvedEvents(events: EventItem[], today = todayISO()) {
  return events.map((event) => ({ ...event, date: resolvedDate(event, today) }));
}

export function getTodaysEvents(events: EventItem[], today = todayISO()) {
  return getResolvedEvents(events, today).filter((event) => event.date === today);
}

// Converts a wall-clock date+time in `timeZone` to the actual UTC instant it
// represents, accounting for that zone's DST offset on that date.
function zonedDateTimeToUtc(dateISO: string, time: string, timeZone: string): Date {
  const [year, month, day] = dateISO.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const target = Date.UTC(year, month - 1, day, hour, minute, 0);
  let guess = target;

  // A couple of correction passes is enough to converge even across a DST edge.
  for (let i = 0; i < 2; i++) {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
        .formatToParts(new Date(guess))
        .map((p) => [p.type, p.value]),
    );
    const observedLocal = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    const offset = observedLocal - guess;
    guess = target - offset;
  }

  return new Date(guess);
}

const NOTIFY_LEAD_HOURS = 12;

// The Athens calendar date on which we should notify for this event, so a
// just-after-midnight kickoff gets flagged the evening before rather than
// being missed by a same-day "morning of" check.
function notifyDateFor(event: EventItem, resolvedDate: string): string {
  const start = zonedDateTimeToUtc(resolvedDate, event.time ?? "00:00", BAR_TIMEZONE);
  const notifyAt = new Date(start.getTime() - NOTIFY_LEAD_HOURS * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: BAR_TIMEZONE }).format(notifyAt);
}

export function getEventsToNotify(events: EventItem[], today = todayISO()) {
  return getResolvedEvents(events, today).filter(
    (event) => notifyDateFor(event, event.date) === today,
  );
}

export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: BAR_TIMEZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${iso}T12:00:00Z`));
}
