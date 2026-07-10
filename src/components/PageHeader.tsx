export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="px-5 pt-8 pb-4">
      {eyebrow && (
        <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-3xl text-foreground">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
    </header>
  );
}
