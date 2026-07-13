import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/data/menu";
import TagIcon from "./TagIcon";

export default function DrinkCard({
  item,
  trending = false,
}: {
  item: MenuItem;
  trending?: boolean;
}) {
  return (
    <Link
      href={`/menu/${item.slug}`}
      className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 active:bg-surface-raised"
    >
      {item.image && (
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-surface-raised">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-1"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate font-display text-lg leading-snug text-foreground">
            {item.name}
          </h3>
          {trending && (
            <span className="shrink-0 rounded-full bg-surface-raised px-2 py-0.5 text-[10px] uppercase tracking-wide text-gold">
              🔥 Trending
            </span>
          )}
          {item.tags && item.tags.length > 0 && (
            <span className="flex shrink-0 items-center gap-1">
              {item.tags.map((t) => (
                <TagIcon key={t} tag={t} className="h-3.5 w-3.5" />
              ))}
            </span>
          )}
        </div>
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
