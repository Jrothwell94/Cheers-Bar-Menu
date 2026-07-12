import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import NotifyPrompt from "@/components/NotifyPrompt";
import { events } from "@/data/whats-on";
import { getVisibleEvents } from "@/lib/events";

// Events are hidden a few hours after they start, so re-check often enough
// that the page doesn't keep showing things that already happened.
export const revalidate = 1800;

export default function WhatsOnPage() {
  const sorted = getVisibleEvents(events).sort((a, b) => a.date.localeCompare(b.date));

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
