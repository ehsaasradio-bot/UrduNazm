import Link from "next/link";
import type { Poet } from "@/types/database";

interface FeaturedPoetsProps {
  poets: Poet[];
}

export default function FeaturedPoets({ poets }: FeaturedPoetsProps) {
  if (poets.length === 0) return null;

  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground mb-4">
            Legendary Poets
          </h2>
          <p className="text-muted leading-relaxed max-w-md mx-auto">
            Spanning three centuries of Urdu literature — from the classical masters to the modern greats.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {poets.map((poet, i) => {
            const gradients = [
              "from-[#a78bfa] to-[#60a5fa]",
              "from-[#60a5fa] to-[#2dd4bf]",
              "from-[#2dd4bf] to-[#a78bfa]",
            ];
            return (
              <Link
                key={poet.id}
                href={`/poets/${poet.slug}`}
                className="group text-center p-5 rounded-2xl hover:bg-card transition-all duration-300"
              >
                {/* Avatar */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${gradients[i % 3]} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <span className="text-white text-lg font-semibold">
                    {poet.name_en.charAt(0)}
                  </span>
                </div>

                {/* English name */}
                <p className="text-[13px] font-medium text-foreground group-hover:text-accent transition-colors">
                  {poet.name_en}
                </p>

                {/* Era */}
                <p className="text-[11px] text-muted-foreground mt-1">
                  {poet.born}–{poet.died}
                </p>
              </Link>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/poets"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors"
          >
            View all poets
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
