import Link from "next/link";

export default function LinkCard({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 active:bg-surface-raised"
    >
      <div className="min-w-0">
        <h3 className="truncate font-display text-lg leading-snug text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 truncate text-[13px] text-muted">{subtitle}</p>
        )}
      </div>
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-muted">
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
