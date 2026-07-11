import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import { events } from "@/data/whats-on";

// Recurring events resolve to "today or later" — re-check daily so the
// page doesn't go stale between deploys.
export const revalidate = 86400;

// For a recurring event, `date` is just one occurrence — roll it forward
// to the next date that falls on the same day of the week.
function nextOccurrence(anchorIso: string): string {
  const anchor = new Date(`${anchorIso}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntil = (anchor.getDay() - today.getDay() + 7) % 7;
  const next = new Date(today);
  next.setDate(today.getDate() + daysUntil);
  const year = next.getFullYear();
  const month = String(next.getMonth() + 1).padStart(2, "0");
  const day = String(next.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function WhatsOnPage() {
  const upcoming = events.map((event) =>
    event.recurring === "weekly"
      ? { ...event, date: nextOccurrence(event.date) }
      : event,
  );
  const sorted = upcoming.sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <PageHeader
        eyebrow="This Week"
        title="What's On"
        subtitle="Live music, football and specials at Cheers"
      />
      <div className="flex flex-col gap-4 px-5 pb-8">
        {sorted.length === 0 && (
          <p className="text-sm text-muted">
            Nothing on the calendar right now — check back soon.
          </p>
        )}
        {sorted.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
