"use client";

import { useState } from "react";
import Link from "next/link";
import type { PoemWithRelations } from "@/types/database";
import BookmarkButton from "@/components/poems/BookmarkButton";

interface PoemViewProps {
  poem: PoemWithRelations;
  userId: string | null;
  initialBookmarked: boolean;
}

export default function PoemView({ poem, userId, initialBookmarked }: PoemViewProps) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6">
        {/* Back link */}
        <Link
          href="/poems"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
          All Poems
        </Link>

        {/* Header */}
        <div className="mb-10">
          {/* Category */}
          {poem.category && (
            <Link
              href={`/poems?category=${poem.category.slug}`}
              className="inline-block text-[11px] text-accent uppercase tracking-[0.1em] mb-4 hover:text-accent-hover transition-colors"
            >
              {poem.category.name_en}
            </Link>
          )}

          {/* English title */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-foreground mb-2">
            {poem.title_en}
          </h1>

          {/* Urdu title */}
          <p className="urdu text-2xl text-foreground/70 mb-5">
            {poem.title_ur}
          </p>

          {/* Poet */}
          <Link
            href={`/poets/${poem.poet.slug}`}
            className="flex items-center gap-3 group w-fit"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-semibold">
                {poem.poet.name_en.charAt(0)}
              </span>
            </div>
            <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors">
              {poem.poet.name_en}
            </p>
          </Link>
        </div>

        {/* Urdu content */}
        <div className="mb-10 py-10 border-y border-border">
          <div className="urdu text-xl md:text-2xl text-foreground leading-[2.6] whitespace-pre-line">
            {poem.content_ur}
          </div>
        </div>

        {/* Translation toggle */}
        {poem.content_en && (
          <div className="mb-10">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={`transition-transform ${showTranslation ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              {showTranslation ? "Hide" : "Show"} English Translation
            </button>

            {showTranslation && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <p className="text-[11px] text-muted-foreground uppercase tracking-[0.1em] mb-4">
                  English Translation
                </p>
                <div className="text-[15px] text-foreground/90 leading-[2] whitespace-pre-line">
                  {poem.content_en}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions bar */}
        <div className="flex items-center gap-3 py-6 border-t border-border">
          {/* Bookmark */}
          <BookmarkButton
            poemId={poem.id}
            initialBookmarked={initialBookmarked}
            userId={userId}
          />

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: `${poem.title_en} — ${poem.poet.name_en}`, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="inline-flex items-center gap-2 h-9 px-4 text-[13px] text-muted-foreground rounded-lg border border-border hover:border-muted-foreground/30 hover:text-foreground transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
            Share
          </button>

          {/* More by poet */}
          <Link
            href={`/poets/${poem.poet.slug}`}
            className="inline-flex items-center gap-2 h-9 px-4 text-[13px] text-muted-foreground rounded-lg border border-border hover:border-muted-foreground/30 hover:text-foreground transition-all"
          >
            More by {poem.poet.name_en}
          </Link>
        </div>
      </div>
    </div>
  );
}
