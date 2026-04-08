import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePoem } from "@/lib/admin/actions";
import { DeleteForm } from "@/components/admin/AdminFormField";

export default async function AdminPoemsPage() {
  const supabase = await createClient();
  const { data: poems } = await supabase
    .from("poems")
    .select(`
      id, title_en, title_ur, slug, featured, created_at,
      poet:poets(name_en),
      category:categories(name_en)
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Poems</h1>
          <p className="text-sm text-white/40 mt-1">{poems?.length ?? 0} total</p>
        </div>
        <Link
          href="/admin/poems/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c8a96e] hover:bg-[#b8996e] text-[#0a0a0f] font-semibold text-sm transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Poem
        </Link>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-hidden">
        {!poems || poems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/30 text-sm mb-3">No poems yet</p>
            <Link href="/admin/poems/new" className="text-[#c8a96e] text-sm hover:underline">
              Add your first poem →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left text-xs text-white/35 font-medium px-5 py-3.5">Title</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden md:table-cell">Poet</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden lg:table-cell">Category</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden lg:table-cell">Featured</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden md:table-cell">Added</th>
                <th className="text-right text-xs text-white/35 font-medium px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {poems.map((poem: {
                id: string;
                title_en: string;
                title_ur: string;
                slug: string;
                featured: boolean;
                created_at: string;
                poet: { name_en: string } | { name_en: string }[] | null;
                category: { name_en: string } | { name_en: string }[] | null;
              }) => {
                const poetName = Array.isArray(poem.poet) ? poem.poet[0]?.name_en : poem.poet?.name_en;
                const catName = Array.isArray(poem.category) ? poem.category[0]?.name_en : poem.category?.name_en;
                return (
                  <tr key={poem.id} className="hover:bg-white/2 transition-colors group">
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors truncate max-w-[200px]">
                        {poem.title_en}
                      </p>
                      <p className="text-xs text-white/30 mt-0.5 urdu">{poem.title_ur}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-sm text-white/45">{poetName ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-sm text-white/45">{catName ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      {poem.featured ? (
                        <span className="inline-flex items-center gap-1 text-xs text-[#c8a96e] bg-[#c8a96e]/8 border border-[#c8a96e]/15 px-2 py-0.5 rounded-full">
                          ★ Featured
                        </span>
                      ) : (
                        <span className="text-xs text-white/20">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-white/30">
                        {new Date(poem.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/poems/${poem.slug}`}
                          target="_blank"
                          className="px-2.5 py-1.5 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/4 transition-all"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/poems/${poem.id}/edit`}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-white/50 hover:text-[#c8a96e] hover:bg-[#c8a96e]/6 transition-all"
                        >
                          Edit
                        </Link>
                        <DeleteForm id={poem.id} action={deletePoem} label="Delete" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
