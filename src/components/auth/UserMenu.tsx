"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const avatar = user.user_metadata?.avatar_url;
  const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const initials = name.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="User menu"
        aria-expanded={open}
        className="w-8 h-8 rounded-full overflow-hidden border border-border hover:border-accent/30 transition-colors flex items-center justify-center"
      >
        {avatar ? (
          <img src={avatar} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[12px] font-semibold text-foreground">{initials}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-card border border-border shadow-xl shadow-black/30 animate-slide-down z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-[13px] font-medium text-foreground truncate">{name}</p>
            <p className="text-[12px] text-muted-foreground truncate">{user.email}</p>
          </div>

          {/* Links */}
          <div className="py-1.5">
            <Link
              href="/bookmarks"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-[13px] text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              Bookmarks
            </Link>
          </div>

          {/* Sign out */}
          <div className="border-t border-border py-1.5">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-[13px] text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
