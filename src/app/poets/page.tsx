import type { Metadata } from "next";
import { getPoets } from "@/lib/supabase/queries";
import PoetCard from "@/components/poets/PoetCard";

export const metadata: Metadata = {
  title: "Poets — UrduNazm",
  description:
    "Explore legendary Urdu poets spanning three centuries — from Ghalib and Mir to Faiz and Parveen Shakir. Read their poetry in Urdu and English.",
  openGraph: {
    title: "Poets — UrduNazm",
    description:
      "Explore legendary Urdu poets spanning three centuries — from Ghalib and Mir to Faiz and Parveen Shakir.",
  },
};

export default async function PoetsPage() {
  const poets = await getPoets();

  // Group poets by era
  const classical = poets.filter((p) => p.era === "Classical");
  const modern = poets.filter((p) => p.era === "Modern");
  const other = poets.filter((p) => p.era !== "Classical" && p.era !== "Modern");

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Page header */}
        <div className="max-w-xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground mb-4">
            Legendary Poets
          </h1>
          <p className="text-muted leading-relaxed">
            Spanning three centuries of Urdu literature — from the classical masters to the modern greats. Each poet&apos;s complete works available in Urdu and English.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-6 mb-12 pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">{poets.length}</span>
            <span className="text-[13px] text-muted-foreground">Poets</span>
          </div>
          {classical.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[13px] text-muted-foreground">
                {classical.length} Classical
              </span>
            </div>
          )}
          {modern.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-foreground/50" />
              <span className="text-[13px] text-muted-foreground">
                {modern.length} Modern
              </span>
            </div>
          )}
        </div>

        {/* Classical poets */}
        {classical.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-xl font-semibold text-foreground">Classical Era</h2>
              <span className="text-[12px] text-muted-foreground">18th–19th century</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classical.map((poet) => (
                <PoetCard key={poet.id} poet={poet} />
              ))}
            </div>
          </section>
        )}

        {/* Modern poets */}
        {modern.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-xl font-semibold text-foreground">Modern Era</h2>
              <span className="text-[12px] text-muted-foreground">20th–21st century</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modern.map((poet) => (
                <PoetCard key={poet.id} poet={poet} />
              ))}
            </div>
          </section>
        )}

        {/* Other eras (if any) */}
        {other.length > 0 && (
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {other.map((poet) => (
                <PoetCard key={poet.id} poet={poet} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
