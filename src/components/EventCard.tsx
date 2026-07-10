import Image from "next/image";
import type { EventItem } from "@/data/whats-on";

const typeLabel: Record<EventItem["type"], string> = {
  "live-music": "Live Music",
  football: "Football",
  special: "Special",
};

const typeIcon: Record<EventItem["type"], React.ReactNode> = {
  "live-music": (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        stroke="var(--gold-soft)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  football: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <circle cx="12" cy="12" r="9" stroke="var(--gold-soft)" strokeWidth="1.5" />
      <path
        d="M12 7l3.5 2.5-1.3 4.2H9.8L8.5 9.5 12 7ZM12 3.2V7M4.5 9l5.3.5M4.7 15.3l4-2.6M19.5 9l-5.3.5M19.3 15.3l-4-2.6M9 20.5l1.5-3.8M15 20.5l-1.5-3.8"
        stroke="var(--gold-soft)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  special: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"
        stroke="var(--gold-soft)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-surface">
      {event.image ? (
        <div className="relative h-40 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-20 items-center justify-center bg-surface-raised">
          {typeIcon[event.type]}
        </div>
      )}

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-surface-raised px-2.5 py-1 text-[11px] uppercase tracking-wide text-gold">
            {typeLabel[event.type]}
          </span>
          <span className="text-[13px] text-muted">
            {formatDate(event.date)}
            {event.time ? ` · ${event.time}` : ""}
          </span>
        </div>
        <h3 className="font-display text-xl leading-snug text-foreground">
          {event.title}
        </h3>
        {event.description && (
          <p className="mt-1.5 text-[14px] leading-relaxed text-muted-strong">
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
}
