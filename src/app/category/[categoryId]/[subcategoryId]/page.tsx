import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getItemsBySubcategory,
  getTagsForItems,
} from "@/data/menu";
import PageHeader from "@/components/PageHeader";
import DrinkCard from "@/components/DrinkCard";
import TagLegend from "@/components/TagLegend";
import { getTrendingSlugs } from "@/lib/views";

// Trending badges are computed from view counts that change over time.
export const revalidate = 1800;

export function generateStaticParams() {
  return categories.flatMap((cat) =>
    (cat.subcategories ?? []).map((sub) => ({
      categoryId: cat.id,
      subcategoryId: sub.id,
    }))
  );
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string; subcategoryId: string }>;
}) {
  const { categoryId, subcategoryId } = await params;
  const category = categories.find((cat) => cat.id === categoryId);
  const subcategory = category?.subcategories?.find(
    (sub) => sub.id === subcategoryId
  );
  if (!category || !subcategory) notFound();

  const items = getItemsBySubcategory(categoryId, subcategoryId);
  const tagIds = getTagsForItems(items);
  const trending = await getTrendingSlugs();

  return (
    <div>
      <Link
        href={`/category/${categoryId}`}
        className="mx-5 mt-6 mb-2 inline-flex items-center gap-1.5 text-sm text-muted-strong"
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
        Back to {category.name}
      </Link>

      <PageHeader eyebrow={category.name} title={subcategory.name} />

      <div className="px-5 pb-8">
        {items.length === 0 ? (
          <p className="text-sm text-muted">
            Nothing listed here yet — check back soon.
          </p>
        ) : (
          <>
            <TagLegend tagIds={tagIds} />
            <div className="flex flex-col gap-2.5">
              {items.map((item) => (
                <DrinkCard key={item.slug} item={item} trending={trending.has(item.slug)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
