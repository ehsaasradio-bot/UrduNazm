import Link from "next/link";
import type { Poet } from "@/types/database";

interface PoetCardProps {
  poet: Poet;
}

const gradients = [
  "from-[#a78bfa] to-[#60a5fa]",
  "from-[#60a5fa] to-[#2dd4bf]",
  "from-[#2dd4bf] to-[#a78bfa]",
];

export default function PoetCard({ poet }: PoetCardProps) {
  // Use name length as stable index for gradient
  const gIdx = poet.name_en.length % 3;

  return (
    <Link
      href={`/poets/${poet.slug}`}
      className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/20 transition-all duration-300 flex flex-col items-center text-center"
    >
      {/* Avatar */}
      <div className={`w-20 h-20 mb-5 rounded-full bg-gradient-to-br ${gradients[gIdx]} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
        <span className="text-white text-2xl font-semibold">
          {poet.name_en.charAt(0)}
        </span>
      </div>

      {/* English name */}
      <h3 className="text-[15px] font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
        {poet.name_en}
      </h3>

      {/* Era + dates */}
      <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
        {poet.era && (
          <>
            <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent text-[11px] font-medium">
              {poet.era}
            </span>
            <span>·</span>
          </>
        )}
        <span>{poet.born}–{poet.died}</span>
      </div>

      {/* Short bio preview */}
      {poet.bio_en && (
        <p className="text-[13px] text-muted leading-relaxed mt-4 line-clamp-2">
          {poet.bio_en}
        </p>
      )}
    </Link>
  );
}
