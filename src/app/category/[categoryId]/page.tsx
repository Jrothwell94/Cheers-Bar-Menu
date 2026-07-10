import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getItemsBySubcategory } from "@/data/menu";
import PageHeader from "@/components/PageHeader";
import LinkCard from "@/components/LinkCard";

export function generateStaticParams() {
  return categories
    .filter((cat) => cat.subcategories && cat.subcategories.length > 0)
    .map((cat) => ({ categoryId: cat.id }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const category = categories.find((cat) => cat.id === categoryId);
  if (!category || !category.subcategories) notFound();

  return (
    <div>
      <Link
        href="/"
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
        Back to menu
      </Link>

      <PageHeader title={category.name} />

      <div className="flex flex-col gap-2.5 px-5 pb-8">
        {category.subcategories.map((sub) => {
          const count = getItemsBySubcategory(category.id, sub.id).length;
          return (
            <LinkCard
              key={sub.id}
              href={`/category/${category.id}/${sub.id}`}
              title={sub.name}
              subtitle={count > 0 ? `${count} to choose from` : "Coming soon"}
            />
          );
        })}
      </div>
    </div>
  );
}
