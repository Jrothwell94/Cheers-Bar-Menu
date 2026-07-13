import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getItemBySlug, getCategoryById, menuItems } from "@/data/menu";
import { tags as tagInfo } from "@/data/tags";
import TagIcon from "@/components/TagIcon";
import TrackView from "@/components/TrackView";

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

  const category = getCategoryById(item.category);
  const subcategory = category?.subcategories?.find(
    (s) => s.id === item.subcategory
  );
  const backHref = subcategory
    ? `/category/${category!.id}/${subcategory.id}`
    : "/";
  const backLabel = subcategory ? `Back to ${subcategory.name}` : "Back to menu";

  return (
    <div className="pb-10">
      <TrackView slug={item.slug} />
      <div className="px-5 pt-6">
        <Link
          href={backHref}
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
          {backLabel}
        </Link>
      </div>

      {item.image && (
        <div className="relative mb-6 aspect-[4/3] w-full bg-surface-raised">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="px-5">
      {subcategory && (
        <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gold">
          {category!.name} · {subcategory.name}
        </p>
      )}
      <h1 className="font-display text-4xl leading-tight text-foreground">
        {item.name}
      </h1>
      <p className="mt-1.5 text-base text-muted">{item.tagline}</p>

      {item.tags && item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] text-muted-strong"
            >
              <TagIcon tag={t} className="h-3.5 w-3.5" />
              {tagInfo[t].label}
            </span>
          ))}
        </div>
      )}

      <p className="mt-4 text-2xl font-medium text-gold-soft">{item.price}</p>

      {item.ingredients.length > 0 && (
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
      )}

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
    </div>
  );
}
