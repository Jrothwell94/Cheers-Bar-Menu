import Link from "next/link";
import type { MenuItem } from "@/data/menu";

export default function DrinkCard({ item }: { item: MenuItem }) {
  return (
    <Link
      href={`/menu/${item.slug}`}
      className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 active:bg-surface-raised"
    >
      <div className="min-w-0">
        <h3 className="truncate font-display text-lg leading-snug text-foreground">
          {item.name}
        </h3>
        <p className="mt-0.5 truncate text-[13px] text-muted">{item.tagline}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm font-medium text-gold-soft">{item.price}</span>
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-muted">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
