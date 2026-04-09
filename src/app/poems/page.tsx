import type { Metadata } from "next";
import { getPoems, getCategories } from "@/lib/supabase/queries";
import PoemCard from "@/components/poems/PoemCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Poems — UrduNazm",
  description:
    "Browse Urdu poetry — ghazals, nazms, rubais and more from legendary poets. Read in beautiful Nastaliq script with English translations.",
  openGraph: {
    title: "Poems — UrduNazm",
    description:
      "Browse Urdu poetry — ghazals, nazms, rubais and more from legendary poets.",
  },
};

interface PoemsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PoemsPage({ searchParams }: PoemsPageProps) {
  const { category } = await searchParams;

  const [poems, categories] = await Promise.all([
    getPoems({ categorySlug: category }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Page header */}
        <div className="max-w-xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground mb-4">
            Poetry Collection
          </h1>
          <p className="text-muted leading-relaxed">
            Explore ghazals, nazms, and more from the greatest Urdu poets — in beautiful Nastaliq script with English translations.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 mb-10 pb-6 border-b border-border overflow-x-auto">
          <Link
            href="/poems"
            className={`flex-shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border transition-all ${
              !category
                ? "bg-foreground text-background border-foreground"
                : "text-muted-foreground border-border hover:border-muted-foreground/30 hover:text-foreground"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/poems?category=${cat.slug}`}
              className={`flex-shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border transition-all ${
                category === cat.slug
                  ? "bg-foreground text-background border-foreground"
                  : "text-muted-foreground border-border hover:border-muted-foreground/30 hover:text-foreground"
              }`}
            >
              {cat.name_en}
              <span className="urdu ml-1.5 text-[12px] opacity-70">{cat.name_ur}</span>
            </Link>
          ))}
        </div>

        {/* Results count */}
        <p className="text-[13px] text-muted-foreground mb-6">
          {poems.length} {poems.length === 1 ? "poem" : "poems"}
          {category && (
            <> in <span className="text-foreground font-medium">{categories.find((c) => c.slug === category)?.name_en || category}</span></>
          )}
        </p>

        {/* Poems grid */}
        {poems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No poems found in this category.</p>
            <Link
              href="/poems"
              className="text-[13px] text-accent hover:text-accent-hover transition-colors"
            >
              View all poems
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {poems.map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
