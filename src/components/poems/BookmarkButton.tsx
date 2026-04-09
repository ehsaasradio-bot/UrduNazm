"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface BookmarkButtonProps {
  poemId: string;
  initialBookmarked: boolean;
  userId: string | null;
  /** compact = icon only, default = icon + label */
  compact?: boolean;
}

export default function BookmarkButton({
  poemId,
  initialBookmarked,
  userId,
  compact = false,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggle = async () => {
    if (!userId) {
      router.push(`/login?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const supabase = createClient();
    const next = !bookmarked;
    setBookmarked(next); // optimistic update

    startTransition(async () => {
      if (next) {
        await supabase
          .from("bookmarks")
          .insert({ user_id: userId, poem_id: poemId });
      } else {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("poem_id", poemId);
      }
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark this poem"}
      aria-pressed={bookmarked}
      className={`inline-flex items-center gap-2 transition-all disabled:opacity-50 ${
        compact
          ? "w-8 h-8 justify-center rounded-lg border border-border hover:border-accent/30"
          : "h-9 px-4 text-[13px] rounded-lg border border-border hover:border-accent/30"
      } ${
        bookmarked
          ? "text-accent border-accent/30 bg-accent-soft"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
      {!compact && (bookmarked ? "Saved" : "Save")}
    </button>
  );
}
