"use client";

import { useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchInputProps {
  initialQuery?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

export default function SearchInput({
  initialQuery = "",
  autoFocus = false,
  onClose,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim().length >= 2) {
          params.set("q", value.trim());
        } else {
          params.delete("q");
        }
        router.replace(`/search?${params.toString()}`);
      }, 300);
    },
    [router, searchParams]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (onClose) onClose();
    }
  };

  return (
    <div className="relative group">
      {/* Search icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
      </div>

      <input
        ref={inputRef}
        type="search"
        defaultValue={initialQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search poems, poets, blog..."
        aria-label="Search"
        className="w-full h-12 pl-11 pr-12 text-[15px] bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/40 transition-colors"
      />

      {/* Keyboard hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 pointer-events-none">
        <kbd className="text-[10px] text-dimmed bg-surface-hover border border-border-hover rounded px-1.5 py-0.5 font-sans">Esc</kbd>
      </div>
    </div>
  );
}
