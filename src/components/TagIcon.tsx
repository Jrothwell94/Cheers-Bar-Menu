import type { TagId } from "@/data/tags";

export default function TagIcon({
  tag,
  className = "h-4 w-4",
}: {
  tag: TagId;
  className?: string;
}) {
  const stroke = "var(--gold-soft)";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (tag) {
    case "refreshing":
      // mint leaf
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M12 21C7 21 4 16.5 4 11.5 4 7 7.5 3 12 3c4.5 0 8 4 8 8.5C20 16.5 17 21 12 21Z"
            {...common}
          />
          <path d="M12 21V7M8.5 10c1.2.6 2.3 1.6 3.5 3M15.5 10c-1.2.6-2.3 1.6-3.5 3" {...common} />
        </svg>
      );
    case "fruity":
      // two berries with a stem
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M12 3v3.5" {...common} />
          <path d="M12 6.5c-1.5-1.2-3.3-1-4 .3" {...common} />
          <circle cx="8.7" cy="13.5" r="4.2" {...common} />
          <circle cx="15.3" cy="13.5" r="4.2" {...common} />
        </svg>
      );
    case "frozen":
      // snowflake
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M12 3v18M4.5 7.5l15 9M4.5 16.5l15-9M9 4.5l3 2.5 3-2.5M9 19.5l3-2.5 3 2.5M4.9 10l.4 3.5-3 1.7M22 15.2l-3-1.7.4-3.5M1.7 9l3-1.7-.4-3.5M18.7 20.2l-.4-3.5 3-1.7"
            {...common}
          />
        </svg>
      );
    case "strong":
      // flame
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M12 21c-4 0-6.5-2.7-6.5-6.2 0-3 2-5 3-7.3.6 1.4 1.6 2 2.3 1.6-.4-2.5.6-5 3-6.6-.7 2.6.4 4.4 2 6C17.3 10 18.5 12 18.5 14.8 18.5 18.3 16 21 12 21Z"
            {...common}
          />
          <path d="M12 21c-1.8 0-3-1.2-3-2.9 0-1.6 1.4-2.6 1.7-3.9.5 1 1.3 1.3 1.3 1.3s.8-.6 1-1.6c.9 1 1.5 2.2 1.5 3.3 0 1.9-1.2 3.8-3.5 3.8Z" {...common} />
        </svg>
      );
    case "classic":
      // outline star
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M12 3.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3.5Z"
            {...common}
          />
        </svg>
      );
    case "bitter":
      // citrus peel twist
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M6 6c4-2.5 9-2.5 12 1.2M18 18c-4 2.5-9 2.5-12-1.2"
            {...common}
          />
          <circle cx="12" cy="12" r="8.5" {...common} />
        </svg>
      );
    case "tropical":
      // palm frond
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M12 21V12" {...common} />
          <path
            d="M12 12c0-4.5-3-7.5-7.5-7.8C4.8 8.6 7.7 12 12 12ZM12 12c0-4.5 3-7.5 7.5-7.8C19.2 8.6 16.3 12 12 12ZM12 12c-3.7 0-6.5 1.8-7.3 5.3C8.3 17.8 11.3 15.6 12 12ZM12 12c3.7 0 6.5 1.8 7.3 5.3-3.6.5-6.6-1.7-7.3-5.3Z"
            {...common}
          />
        </svg>
      );
  }
}
