import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import { events } from "@/data/whats-on";

export default function WhatsOnPage() {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

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
