import { categories, getItemsByCategory, getTagsForCategory } from "@/data/menu";
import DrinkCard from "@/components/DrinkCard";
import TagLegend from "@/components/TagLegend";
import LinkCard from "@/components/LinkCard";
import NowPlaying from "@/components/NowPlaying";
import { getTrendingSlugs } from "@/lib/views";

// Trending badges are computed from view counts that change over time.
export const revalidate = 1800;

export default async function MenuPage() {
  const trending = await getTrendingSlugs();

  return (
    <div>
      <header className="flex flex-col items-center px-5 pt-6 pb-5 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Cheers Bar"
          className="h-auto w-full max-w-[160px]"
        />
        <p className="mt-2.5 text-sm text-muted">
          Tap any drink to see what&apos;s in it — and the story behind it.
        </p>
      </header>

      <div className="px-5 pb-5">
        <NowPlaying />
      </div>

      <nav className="flex gap-2 overflow-x-auto px-5 pb-5 [scrollbar-width:none]">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={
              cat.subcategories || cat.groups ? `/category/${cat.id}` : `#${cat.id}`
            }
            className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted-strong"
          >
            {cat.name}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-8 px-5 pb-8">
        {categories.map((cat) => {
          if (cat.subcategories) {
            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-6">
                <h2 className="mb-3 font-display text-xl text-gold-soft">
                  {cat.name}
                </h2>
                <LinkCard
                  href={`/category/${cat.id}`}
                  title={`Browse ${cat.name}`}
                  subtitle={cat.subcategories.map((s) => s.name).join(", ")}
                />
              </section>
            );
          }

          if (cat.groups) {
            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-6">
                <h2 className="mb-3 font-display text-xl text-gold-soft">
                  {cat.name}
                </h2>
                <LinkCard
                  href={`/category/${cat.id}`}
                  title={`Browse ${cat.name}`}
                  subtitle={cat.groups.map((g) => g.name).join(", ")}
                />
              </section>
            );
          }

          const items = getItemsByCategory(cat.id);
          if (items.length === 0) return null;
          const categoryTags = getTagsForCategory(cat.id);
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-6">
              <h2 className="mb-3 font-display text-xl text-gold-soft">
                {cat.name}
              </h2>
              <TagLegend tagIds={categoryTags} />
              <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <DrinkCard key={item.slug} item={item} trending={trending.has(item.slug)} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
