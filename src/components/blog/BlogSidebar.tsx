"use client";

import Link from "next/link";

interface BlogSidebarProps {
  categories: string[];
  activeCategory?: string;
}

export default function BlogSidebar({
  categories,
  activeCategory = "Latest",
}: BlogSidebarProps) {
  return (
    <aside className="space-y-1">
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/blog?category=${cat.toLowerCase().replace(/\s+/g, "-")}`}
          className={`block text-[14px] py-1.5 transition-colors ${
            cat === activeCategory
              ? "text-foreground font-medium"
              : "text-muted hover:text-foreground"
          }`}
        >
          {cat}
        </Link>
      ))}
    </aside>
  );
}
