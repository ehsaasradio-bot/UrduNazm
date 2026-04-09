import Link from "next/link";
import type { PoemWithRelations } from "@/types/database";

interface VerseOfTheDayProps {
  poem: PoemWithRelations | null;
}

export default function VerseOfTheDay({ poem }: VerseOfTheDayProps) {
  if (!poem) return null;

  // Get first two lines of Urdu content
  const lines = poem.content_ur.split("\n").filter((l) => l.trim());
  const line1 = lines[0] || "";
  const line2 = lines[1] || "";

  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-[800px] px-6 py-20 md:py-28 text-center">
        <p className="text-[11px] text-accent uppercase tracking-[0.15em] mb-8">
          Verse of the Day
        </p>

        <Link href={`/poems/${poem.slug}`} className="group block">
          <p className="urdu text-2xl md:text-3xl text-foreground mb-4 group-hover:text-accent/90 transition-colors">
            {line1}
          </p>
          {line2 && (
            <p className="urdu text-2xl md:text-3xl text-foreground mb-8 group-hover:text-accent/90 transition-colors">
              {line2}
            </p>
          )}
        </Link>

        <Link
          href={`/poets/${poem.poet.slug}`}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          — {poem.poet.name_en}
        </Link>
      </div>
    </section>
  );
}
