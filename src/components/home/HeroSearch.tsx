"use client";

import { useState } from "react";
import SearchModal from "@/components/search/SearchModal";

export default function HeroSearch() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Clickable search card — opens modal */}
      <div className="max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="relative group">
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#a78bfa]/20 via-[#60a5fa]/20 to-[#2dd4bf]/20 rounded-[22px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <button
            onClick={() => setOpen(true)}
            aria-label="Open search"
            className="relative w-full rounded-[20px] bg-surface border border-border-hover p-5 shadow-2xl shadow-black/30 transition-shadow duration-300 hover:shadow-black/50 text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <span className="text-[15px] text-muted-foreground">
                Search poems, poets, or ask AI...
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full border border-border-hover flex items-center justify-center text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[12px] text-muted-foreground flex items-center gap-1">
                  Poetry
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                </span>
                <div className="hidden md:flex items-center gap-1">
                  <kbd className="text-[10px] text-dimmed bg-surface-hover border border-border-hover rounded px-1.5 py-0.5 font-sans">⌘K</kbd>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <SearchModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
