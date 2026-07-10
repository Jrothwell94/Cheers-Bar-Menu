import Link from "next/link";
import { notFound } from "next/navigation";
import { getItemBySlug, menuItems } from "@/data/menu";

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export default async function DrinkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();

  return (
    <div className="px-5 pt-6 pb-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-strong"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to menu
      </Link>

      <h1 className="font-display text-4xl leading-tight text-foreground">
        {item.name}
      </h1>
      <p className="mt-1.5 text-base text-muted">{item.tagline}</p>
      <p className="mt-4 text-2xl font-medium text-gold-soft">{item.price}</p>

      <div className="mt-8 border-t border-line pt-6">
        <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">
          Ingredients
        </h2>
        <ul className="flex flex-col gap-2">
          {item.ingredients.map((ing) => (
            <li
              key={ing}
              className="flex items-center gap-2.5 text-[15px] text-foreground"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {ing}
            </li>
          ))}
        </ul>
      </div>

      {item.history && (
        <div className="mt-8 border-t border-line pt-6">
          <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">
            The Story
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-strong">
            {item.history}
          </p>
        </div>
      )}
    </div>
  );
}
