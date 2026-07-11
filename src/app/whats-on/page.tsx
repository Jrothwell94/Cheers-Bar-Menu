import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import NotifyPrompt from "@/components/NotifyPrompt";
import { events } from "@/data/whats-on";
import { getResolvedEvents } from "@/lib/events";

// Recurring events resolve to "today or later" — re-check daily so the
// page doesn't go stale between deploys.
export const revalidate = 86400;

export default function WhatsOnPage() {
  const sorted = getResolvedEvents(events).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <PageHeader
        eyebrow="This Week"
        title="What's On"
        subtitle="Live music, football and specials at Cheers"
      />
      <div className="flex flex-col gap-4 px-5 pb-8">
        <NotifyPrompt />
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
