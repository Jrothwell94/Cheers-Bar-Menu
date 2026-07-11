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
