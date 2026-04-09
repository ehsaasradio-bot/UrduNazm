import Link from "next/link";
import type { PoemWithRelations } from "@/types/database";

interface FeaturedPoemsProps {
  poems: PoemWithRelations[];
}

export default function FeaturedPoems({ poems }: FeaturedPoemsProps) {
  if (poems.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
      <div className="max-w-lg mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground mb-4">
          Featured Poetry
        </h2>
        <p className="text-muted leading-relaxed">
          Hand-picked verses from the greatest Urdu poets — timeless words that still move hearts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {poems.map((poem) => (
          <Link
            key={poem.id}
            href={`/poems/${poem.slug}`}
            className="group p-7 rounded-2xl bg-card border border-border hover:border-accent/20 transition-all duration-300"
          >
            {/* Category badge */}
            {poem.category && (
              <span className="inline-block text-[11px] text-accent uppercase tracking-[0.1em] mb-4">
                {poem.category.name_en}
              </span>
            )}

            {/* English title */}
            <h3 className="text-[15px] font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
              {poem.title_en}
            </h3>

            {/* First line preview — Urdu if available */}
            <p className="urdu text-[15px] text-muted leading-[2.2] mb-4 line-clamp-2">
              {poem.content_ur.split("\n")[0]}
            </p>

            {/* Poet name */}
            <p className="text-[13px] text-muted-foreground">
              — {poem.poet.name_en}
            </p>
          </Link>
        ))}
      </div>

      {/* View all link */}
      <div className="text-center mt-12">
        <Link
          href="/poems"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          View all poems
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  );
}
