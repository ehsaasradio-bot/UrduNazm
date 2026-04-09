import Link from "next/link";
import type { Poet } from "@/types/database";
import type { PoemWithRelations } from "@/types/database";

interface PoetProfileProps {
  poet: Poet;
  poems: PoemWithRelations[];
}

const gradients = [
  "from-[#a78bfa] to-[#60a5fa]",
  "from-[#60a5fa] to-[#2dd4bf]",
  "from-[#2dd4bf] to-[#a78bfa]",
];

export default function PoetProfile({ poet, poems }: PoetProfileProps) {
  const gIdx = poet.name_en.length % 3;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Back link */}
        <Link
          href="/poets"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
          All Poets
        </Link>

        {/* Profile header */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 mb-16">
          {/* Left — avatar + meta */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Avatar */}
            <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${gradients[gIdx]} flex items-center justify-center mb-6 opacity-90`}>
              <span className="text-white text-4xl font-semibold">
                {poet.name_en.charAt(0)}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-foreground mb-4">{poet.name_en}</h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-2 mb-6">
              {poet.era && (
                <span className="px-3 py-1 rounded-full bg-accent-soft text-accent text-[12px] font-medium border border-accent/15">
                  {poet.era}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-surface text-muted-foreground text-[12px] font-medium border border-border">
                {poet.born}–{poet.died}
              </span>
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-center lg:text-left">
              <div>
                <p className="text-xl font-bold text-foreground">{poems.length}</p>
                <p className="text-[12px] text-muted-foreground">Poems</p>
              </div>
            </div>
          </div>

          {/* Right — bio */}
          <div>
            {poet.bio_en && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-4">
                  Biography
                </h2>
                <p className="text-foreground/90 leading-relaxed text-[15px]">
                  {poet.bio_en}
                </p>
              </div>
            )}

            {/* Urdu bio — keep data accessible but secondary */}
            {poet.bio_ur && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-4">
                  سوانح حیات
                </h2>
                <p className="urdu text-lg text-foreground/80 leading-[2.4]">
                  {poet.bio_ur}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Poems section */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">
              Poetry by {poet.name_en}
            </h2>
            <span className="text-[13px] text-muted-foreground">
              {poems.length} {poems.length === 1 ? "poem" : "poems"}
            </span>
          </div>

          {poems.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              No poems available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {poems.map((poem) => (
                <Link
                  key={poem.id}
                  href={`/poems/${poem.slug}`}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/20 transition-all duration-300"
                >
                  {/* Category */}
                  {poem.category && (
                    <span className="inline-block text-[11px] text-accent uppercase tracking-[0.1em] mb-3">
                      {poem.category.name_en}
                    </span>
                  )}

                  {/* English title */}
                  <h3 className="text-[15px] font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {poem.title_en}
                  </h3>

                  {/* First line preview */}
                  <p className="urdu text-[14px] text-muted leading-[2.2] line-clamp-2">
                    {poem.content_ur.split("\n")[0]}
                  </p>

                  {/* Featured badge */}
                  {poem.featured && (
                    <span className="inline-block mt-3 text-[11px] text-accent/70 border border-accent/15 rounded-full px-2 py-0.5">
                      Featured
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
