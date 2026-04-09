"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { SearchResults } from "@/lib/supabase/queries";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({ poems: [], poets: [], blogs: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults({ poems: [], poets: [], blogs: [] });
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Debounced search via Supabase client directly
  const handleChange = useCallback(async (value: string) => {
    setQuery(value);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (value.trim().length < 2) {
      setResults({ poems: [], poets: [], blogs: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const supabase = createClient();
        const q = value.trim();

        const [poemsResult, poetsResult, blogsResult] = await Promise.all([
          supabase
            .from("poems")
            .select("id, title_en, title_ur, slug, poet:poets(id, name_en, name_ur, slug), category:categories(id, name_en, name_ur, slug)")
            .or(`title_en.ilike.%${q}%,title_ur.ilike.%${q}%`)
            .limit(5),
          supabase
            .from("poets")
            .select("id, name_en, name_ur, slug, era, born, died")
            .or(`name_en.ilike.%${q}%,name_ur.ilike.%${q}%`)
            .limit(4),
          supabase
            .from("blogs")
            .select("id, title_en, slug, category, author_name")
            .eq("published", true)
            .ilike("title_en", `%${q}%`)
            .limit(4),
        ]);

        setResults({
          poems: (poemsResult.data ?? []) as unknown as SearchResults["poems"],
          poets: (poetsResult.data ?? []) as unknown as SearchResults["poets"],
          blogs: (blogsResult.data ?? []) as unknown as SearchResults["blogs"],
        });
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }, 250);
  }, []);

  const totalResults = results.poems.length + results.poets.length + results.blogs.length;
  const hasQuery = query.trim().length >= 2;
  const gradients = [
    "from-[#a78bfa] to-[#60a5fa]",
    "from-[#60a5fa] to-[#2dd4bf]",
    "from-[#2dd4bf] to-[#a78bfa]",
  ];

  const handleResultClick = () => {
    onClose();
  };

  const goToSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[580px] rounded-2xl bg-card border border-border shadow-2xl shadow-black/50 overflow-hidden animate-fade-in-up">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground flex-shrink-0" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") goToSearch(); }}
            placeholder="Search poems, poets, blog..."
            aria-label="Search"
            className="flex-1 text-[15px] bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {loading && (
            <svg className="animate-spin h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          <kbd className="hidden md:block text-[10px] text-dimmed bg-surface border border-border-hover rounded px-1.5 py-0.5">Esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[420px] overflow-y-auto">
          {/* Empty / hint state */}
          {!hasQuery && (
            <div className="px-5 py-8 text-center">
              <p className="text-[13px] text-muted-foreground">Search across poems, poets, and blog articles.</p>
            </div>
          )}

          {/* No results */}
          {hasQuery && !loading && totalResults === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-[13px] text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}

          {/* Poems */}
          {results.poems.length > 0 && (
            <div className="py-2">
              <p className="px-4 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
                Poems
              </p>
              {results.poems.map((poem) => (
                <Link
                  key={poem.id}
                  href={`/poems/${poem.slug}`}
                  onClick={handleResultClick}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-surface transition-colors group"
                >
                  <div>
                    <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors">{poem.title_en}</p>
                    <p className="text-[12px] text-muted-foreground">{poem.poet.name_en}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/30 group-hover:text-accent/50 transition-colors" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          )}

          {/* Poets */}
          {results.poets.length > 0 && (
            <div className="py-2 border-t border-border">
              <p className="px-4 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
                Poets
              </p>
              {results.poets.map((poet, i) => (
                <Link
                  key={poet.id}
                  href={`/poets/${poet.slug}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition-colors group"
                >
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradients[i % 3]} flex items-center justify-center flex-shrink-0 opacity-80`}>
                    <span className="text-white text-[11px] font-semibold">{poet.name_en.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors">{poet.name_en}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/30 group-hover:text-accent/50 transition-colors" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          )}

          {/* Blogs */}
          {results.blogs.length > 0 && (
            <div className="py-2 border-t border-border">
              <p className="px-4 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
                Blog
              </p>
              {results.blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  onClick={handleResultClick}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-surface transition-colors group"
                >
                  <div>
                    <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors">{blog.title_en}</p>
                    <p className="text-[12px] text-muted-foreground">{blog.category}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/30 group-hover:text-accent/50 transition-colors" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          )}

          {/* View all results */}
          {hasQuery && totalResults > 0 && (
            <div className="border-t border-border px-4 py-3">
              <button
                onClick={goToSearch}
                className="text-[13px] text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
              >
                View all results for &ldquo;{query}&rdquo;
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
