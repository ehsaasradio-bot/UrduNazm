import Link from "next/link";
import type { PoemWithRelations } from "@/types/database";

interface PoemCardProps {
  poem: PoemWithRelations;
}

export default function PoemCard({ poem }: PoemCardProps) {
  // Get first line of Urdu content
  const firstLine = poem.content_ur.split("\n").find((l) => l.trim()) || "";

  return (
    <Link
      href={`/poems/${poem.slug}`}
      className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/20 transition-all duration-300 block"
    >
      {/* Top row — category + featured */}
      <div className="flex items-center justify-between mb-3">
        {poem.category && (
          <span className="text-[11px] text-accent uppercase tracking-[0.1em]">
            {poem.category.name_en}
          </span>
        )}
        {poem.featured && (
          <span className="text-[11px] text-accent/60 border border-accent/15 rounded-full px-2 py-0.5">
            Featured
          </span>
        )}
      </div>

      {/* Urdu title */}
      <p className="urdu text-xl text-foreground/80 mb-1">{poem.title_ur}</p>

      {/* English title */}
      <h3 className="text-[15px] font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
        {poem.title_en}
      </h3>

      {/* First line preview */}
      <p className="urdu text-[14px] text-muted leading-[2.2] mb-4 line-clamp-2">
        {firstLine}
      </p>

      {/* Poet name */}
      <p className="text-[13px] text-muted-foreground">
        — {poem.poet.name_en}
      </p>
    </Link>
  );
}
