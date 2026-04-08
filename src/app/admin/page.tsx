import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const supabase = await createClient();
  const [poems, poets, blogs] = await Promise.all([
    supabase.from("poems").select("id", { count: "exact", head: true }),
    supabase.from("poets").select("id", { count: "exact", head: true }),
    supabase.from("blogs").select("id", { count: "exact", head: true }),
  ]);
  return {
    poems: poems.count ?? 0,
    poets: poets.count ?? 0,
    blogs: blogs.count ?? 0,
  };
}

async function getRecentPoems() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("poems")
    .select("id, title_en, title_ur, created_at, poet:poets(name_en)")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function AdminDashboardPage() {
  const [stats, recentPoems] = await Promise.all([getStats(), getRecentPoems()]);

  const statCards = [
    {
      label: "Total Poems",
      value: stats.poems,
      href: "/admin/poems",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      ),
    },
    {
      label: "Total Poets",
      value: stats.poets,
      href: "/admin/poets",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      label: "Blog Posts",
      value: stats.blogs,
      href: "/admin/blogs",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { label: "Add Poem", href: "/admin/poems/new" },
    { label: "Add Poet", href: "/admin/poets/new" },
    { label: "New Blog Post", href: "/admin/blogs/new" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group bg-[#111118] border border-white/8 rounded-2xl p-6 hover:border-[#c8a96e]/25 hover:bg-[#111118]/80 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#c8a96e]/8 border border-[#c8a96e]/12 flex items-center justify-center text-[#c8a96e]">
                {card.icon}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-[#c8a96e]/50 transition-colors mt-1">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-3xl font-bold text-white tabular-nums">{card.value}</p>
            <p className="text-sm text-white/40 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent poems */}
        <div className="col-span-2 bg-[#111118] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-white">Recent Poems</h2>
            <Link href="/admin/poems" className="text-xs text-[#c8a96e] hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {recentPoems.length === 0 ? (
              <p className="text-sm text-white/30 py-4 text-center">No poems yet</p>
            ) : (
              recentPoems.map((poem: {
                id: string;
                title_en: string;
                title_ur: string;
                created_at: string;
                poet: { name_en: string } | { name_en: string }[] | null;
              }) => (
                <Link
                  key={poem.id}
                  href={`/admin/poems/${poem.id}/edit`}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/3 transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-white/80 truncate group-hover:text-white transition-colors">
                      {poem.title_en}
                    </p>
                    <p className="text-xs text-white/30 mt-0.5 urdu">
                      {poem.title_ur}
                    </p>
                  </div>
                  <p className="text-xs text-white/25 shrink-0 ml-4">
                    {new Date(poem.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-6">
          <h2 className="text-sm font-medium text-white mb-4">Quick Add</h2>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg border border-white/6 hover:border-[#c8a96e]/30 hover:bg-[#c8a96e]/5 text-sm text-white/50 hover:text-white/80 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
