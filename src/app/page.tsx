import Link from "next/link";
import { cms } from "@/lib/cms";
import { getFeaturedPoems, getRandomVerse } from "@/lib/supabase/queries";
import { getPoets } from "@/lib/supabase/queries";
import { getBlogs } from "@/lib/supabase/queries";
import FeaturedPoems from "@/components/home/FeaturedPoems";
import FeaturedPoets from "@/components/home/FeaturedPoets";
import VerseOfTheDay from "@/components/home/VerseOfTheDay";
import RecentBlogs from "@/components/home/RecentBlogs";
import HeroSearch from "@/components/home/HeroSearch";
import { websiteSchema } from "@/lib/jsonld";

/* Icon map for features */
const icons: Record<string, React.ReactNode> = {
  book: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
  sparkle: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  search: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  users: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  heart: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  pen: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>,
};

export default async function Home() {
  const [featuredPoems, verse, poets, blogs] = await Promise.all([
    getFeaturedPoems().catch(() => []),
    getRandomVerse().catch(() => null),
    getPoets().catch(() => []),
    getBlogs({ limit: 3 }).catch(() => []),
  ]);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />

      {/* ===== HERO ===== */}
      <section id="main-content" className="hero-gradient">
        <div className="mx-auto max-w-[1200px] px-6 pt-6 pb-16 md:pt-10 md:pb-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Aurora badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent-soft mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-[12px] text-accent font-medium">AI-Powered Poetry Platform</span>
            </div>

            {/* Headline with gradient text */}
            <h1 className="text-[40px] md:text-[64px] font-bold tracking-[-0.04em] leading-[1.05] text-foreground mb-5 animate-fade-in-up">
              Discover timeless{" "}
              <span className="gradient-text-animated">Urdu poetry</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted max-w-md mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {cms.hero.subtitle}
            </p>

            {/* Floating search card — opens SearchModal */}
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* ===== FEATURED POETS ===== */}
      <FeaturedPoets poets={poets} />

      {/* ===== FEATURES ===== */}
      <section className="mx-auto max-w-[1200px] px-6 py-6 md:py-8">
        <div className="max-w-lg mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground mb-4">
            {cms.features.heading}
          </h2>
          <p className="text-muted leading-relaxed">
            {cms.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cms.features.items.map((f, i) => {
            const colors = ["accent", "blue", "teal", "accent", "blue", "teal"];
            const color = colors[i % 6];
            return (
              <div
                key={f.title}
                className="group p-7 rounded-2xl bg-card border border-border hover:border-accent/20 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-${color}-soft flex items-center justify-center mb-5 text-${color}`}>
                  {icons[f.icon]}
                </div>
                <h3 className="text-[15px] font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== FEATURED POEMS ===== */}
      <FeaturedPoems poems={featuredPoems} />

      {/* ===== VERSE OF THE DAY ===== */}
      <VerseOfTheDay poem={verse} />

      {/* ===== RECENT BLOGS ===== */}
      <RecentBlogs blogs={blogs} />

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground mb-4">
            {cms.cta.heading}
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            {cms.cta.subtitle}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/poems"
              className="inline-flex items-center gap-2 h-10 px-5 text-[13px] font-medium rounded-lg bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] text-white hover:opacity-90 transition-opacity"
            >
              {cms.cta.primary}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center h-10 px-5 text-[13px] font-medium rounded-lg border border-border text-foreground hover:border-accent/30 transition-all"
            >
              {cms.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
