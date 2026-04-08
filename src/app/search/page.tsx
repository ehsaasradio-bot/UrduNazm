import type { Metadata } from "next";
import Link from "next/link";
import { search } from "@/lib/supabase/queries";
import SearchInput from "@/components/search/SearchInput";

export const metadata: Metadata = {
  title: "Search — UrduNazm",
  description: "Search across poems, poets, and blog posts on UrduNazm.",
  robots: { index: false, follow: false },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const results = query.length >= 2
    ? await search(query).catch(() => ({ poems: [], poets: [], blogs: [] }))
    : { poems: [], poets: [], blogs: [] };

  const totalResults = results.poems.length + results.poets.length + results.blogs.length;
  const hasQuery = query.length >= 2;
  const hasResults = totalResults > 0;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-foreground mb-6">
            Search
          </h1>
          <SearchInput initialQuery={query} />
        </div>

        {/* Results count */}
        {hasQuery && (
          <p className="text-[13px] text-muted-foreground mb-8">
            {hasResults
              ? `${totalResults} result${totalResults === 1 ? "" : "s"} for `
              : "No results for "}
            <span className="text-foreground font-medium">&ldquo;{query}&rdquo;</span>
          </p>
        )}

        {/* Empty — no query */}
        {!hasQuery && (
          <div className="text-center py-16 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-auto mb-4 opacity-30" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <p className="text-[15px]">Type at least 2 characters to search</p>
          </div>
        )}

        {/* No results */}
        {hasQuery && !hasResults && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-[15px] mb-2">Nothing found for &ldquo;{query}&rdquo;</p>
            <p className="text-[13px]">Try a different spelling or search in Urdu.</p>
          </div>
        )}

        {/* ===== POEMS ===== */}
        {results.poems.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-4">
              Poems — {results.poems.length}
            </h2>
            <div className="space-y-2">
              {results.poems.map((poem) => (
                <Link
                  key={poem.id}
                  href={`/poems/${poem.slug}`}
                  className="group flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-accent/20 transition-all duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors truncate">
                      {poem.title_en}
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                      {Array.isArray(poem.poet) ? poem.poet[0]?.name_en : poem.poet?.name_en}
                      {poem.category && (
                        <span className="ml-2 text-accent/70">
                          {Array.isArray(poem.category) ? poem.category[0]?.name_en : poem.category?.name_en}
                        </span>
                      )}
                    </p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 group-hover:text-accent/50 flex-shrink-0 ml-3 transition-colors" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ===== POETS ===== */}
        {results.poets.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-4">
              Poets — {results.poets.length}
            </h2>
            <div className="space-y-2">
              {results.poets.map((poet, i) => {
                const gradients = [
                  "from-[#a78bfa] to-[#60a5fa]",
                  "from-[#60a5fa] to-[#2dd4bf]",
                  "from-[#2dd4bf] to-[#a78bfa]",
                ];
                return (
                  <Link
                    key={poet.id}
                    href={`/poets/${poet.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/20 transition-all duration-200"
                  >
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradients[i % 3]} flex items-center justify-center flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}>
                      <span className="text-white text-sm font-semibold">{poet.name_en.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors">{poet.name_en}</p>
                      {poet.era && (
                        <p className="text-[12px] text-muted-foreground">{poet.era} · {poet.born}–{poet.died}</p>
                      )}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 group-hover:text-accent/50 flex-shrink-0 transition-colors" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== BLOGS ===== */}
        {results.blogs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-4">
              Blog — {results.blogs.length}
            </h2>
            <div className="space-y-2">
              {results.blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-accent/20 transition-all duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors truncate">
                      {blog.title_en}
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                      {blog.author_name}
                      <span className="ml-2 text-accent/70">{blog.category}</span>
                    </p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 group-hover:text-accent/50 flex-shrink-0 ml-3 transition-colors" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
