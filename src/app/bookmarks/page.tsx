import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getBookmarks } from "@/lib/supabase/queries";
import BookmarkButton from "@/components/poems/BookmarkButton";

export const metadata: Metadata = {
  title: "Bookmarks — UrduNazm",
  description: "Your saved poems — a personal collection of Urdu poetry.",
};

export default async function BookmarksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware handles this, but double-guard server-side
  if (!user) redirect("/login?next=/bookmarks");

  const bookmarks = await getBookmarks(user.id).catch(() => []);
  const name = user.user_metadata?.full_name?.split(" ")[0] || "your";

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="max-w-xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground mb-3">
            {name}&apos;s Bookmarks
          </h1>
          <p className="text-muted leading-relaxed">
            {bookmarks.length > 0
              ? `${bookmarks.length} saved ${bookmarks.length === 1 ? "poem" : "poems"}`
              : "Your saved poems will appear here."}
          </p>
        </div>

        {/* Empty state */}
        {bookmarks.length === 0 && (
          <div className="text-center py-20 border border-border rounded-2xl bg-card">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">No bookmarks yet</h2>
            <p className="text-[14px] text-muted mb-6">
              Browse poems and hit the Save button to build your collection.
            </p>
            <Link
              href="/poems"
              className="inline-flex items-center gap-2 h-9 px-5 text-[13px] font-medium rounded-lg bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] text-white hover:opacity-90 transition-opacity"
            >
              Browse Poems
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        )}

        {/* Bookmarks grid */}
        {bookmarks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarks.map((bookmark) => {
              const poem = bookmark.poem;
              const firstLine = poem.content_ur.split("\n").find((l) => l.trim()) || "";

              return (
                <div
                  key={bookmark.id}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/20 transition-all duration-300"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      {poem.category && (
                        <span className="inline-block text-[11px] text-accent uppercase tracking-[0.1em] mb-2">
                          {poem.category.name_en}
                        </span>
                      )}
                      <Link href={`/poems/${poem.slug}`}>
                        <h3 className="text-[15px] font-semibold text-foreground group-hover:text-accent transition-colors">
                          {poem.title_en}
                        </h3>
                      </Link>
                    </div>

                    {/* Remove bookmark */}
                    <BookmarkButton
                      poemId={poem.id}
                      initialBookmarked={true}
                      userId={user.id}
                      compact
                    />
                  </div>

                  {/* First line preview */}
                  <p className="urdu text-[14px] text-muted leading-[2.2] mb-3 line-clamp-2">
                    {firstLine}
                  </p>

                  {/* Poet + saved date */}
                  <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                    <Link href={`/poets/${poem.poet.slug}`} className="hover:text-foreground transition-colors">
                      — {poem.poet.name_en}
                    </Link>
                    <span>
                      {new Date(bookmark.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
