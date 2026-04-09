"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import UserMenu from "@/components/auth/UserMenu";
import SearchModal from "@/components/search/SearchModal";
import { cms } from "@/lib/cms";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Cmd/Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "glass border-b border-border" : "bg-transparent"
        }`}
      >
        <nav aria-label="Main navigation" className="mx-auto max-w-[1200px] px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center" aria-hidden="true">
              <span className="text-white text-xs font-bold leading-none">N</span>
            </div>
            <span className="text-[15px] font-semibold text-foreground tracking-tight">{cms.site.name}</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {cms.nav.links.map((link) => (
              <Link key={link.href} href={link.href} className="px-3.5 py-1.5 text-[13px] text-muted hover:text-foreground rounded-md transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search (Cmd+K)"
              className="hidden md:flex items-center gap-2 h-8 px-3 text-[12px] text-muted-foreground hover:text-foreground rounded-md border border-border hover:border-muted-foreground/30 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span>Search</span>
              <kbd className="text-[10px] text-dimmed bg-surface border border-border-hover rounded px-1 py-0.5 font-sans leading-none">⌘K</kbd>
            </button>

            <button onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="w-8 h-8 rounded-md flex items-center justify-center text-muted hover:text-foreground transition-colors">
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>

            {/* Auth buttons — hidden while loading to prevent flash */}
            {!authLoading && (
              <div className="hidden md:flex items-center gap-2.5">
                {user ? (
                  <UserMenu user={user} />
                ) : (
                  <>
                    <Link href="/login" className="inline-flex h-8 px-3.5 items-center text-[13px] text-muted hover:text-foreground rounded-md border border-border hover:border-muted-foreground/30 transition-all">
                      {cms.nav.login}
                    </Link>
                    <Link href="/poems" className="inline-flex h-8 px-4 items-center text-[13px] font-medium rounded-md bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] text-white hover:opacity-90 transition-opacity">
                      {cms.nav.cta}
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="md:hidden w-8 h-8 rounded-md flex items-center justify-center text-muted hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="md:hidden w-8 h-8 rounded-md flex items-center justify-center text-muted hover:text-foreground"
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Search modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-nav-heading">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setMobileOpen(false); }}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />
          <nav className="absolute top-16 inset-x-0 bg-card border-b border-border animate-slide-down" aria-label="Mobile navigation" id="mobile-nav-heading">
            <div className="px-6 py-5 space-y-1">
              {cms.nav.links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-foreground hover:text-accent rounded-md transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-3 border-t border-border space-y-2">
                {user ? (
                  <>
                    <Link href="/bookmarks" onClick={() => setMobileOpen(false)} className="block text-center py-2.5 text-sm text-muted hover:text-foreground rounded-md border border-border transition-all">
                      Bookmarks
                    </Link>
                    <button
                      onClick={async () => {
                        const { createClient } = await import("@/lib/supabase/client");
                        const supabase = createClient();
                        await supabase.auth.signOut();
                        setMobileOpen(false);
                        window.location.href = "/";
                      }}
                      className="block w-full text-center py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md border border-border transition-all"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-center py-2.5 text-sm text-muted hover:text-foreground rounded-md border border-border transition-all">{cms.nav.login}</Link>
                    <Link href="/poems" onClick={() => setMobileOpen(false)} className="block text-center py-2.5 text-sm font-medium rounded-md bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] text-white">{cms.nav.cta}</Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
