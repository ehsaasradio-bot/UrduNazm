import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { deletePoet } from "@/lib/admin/actions";
import { DeleteForm } from "@/components/admin/AdminFormField";

export default async function AdminPoetsPage() {
  const supabase = await createClient();
  const { data: poets } = await supabase
    .from("poets")
    .select("id, name_en, name_ur, slug, era, born, died, image_url, created_at")
    .order("name_en");

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Poets</h1>
          <p className="text-sm text-white/40 mt-1">{poets?.length ?? 0} total</p>
        </div>
        <Link
          href="/admin/poets/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c8a96e] hover:bg-[#b8996e] text-[#0a0a0f] font-semibold text-sm transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Poet
        </Link>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-hidden">
        {!poets || poets.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/30 text-sm mb-3">No poets yet</p>
            <Link href="/admin/poets/new" className="text-[#c8a96e] text-sm hover:underline">
              Add your first poet →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left text-xs text-white/35 font-medium px-5 py-3.5">Poet</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden md:table-cell">Era</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden lg:table-cell">Dates</th>
                <th className="text-right text-xs text-white/35 font-medium px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {poets.map((poet) => (
                <tr key={poet.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1a1a24] border border-white/8 shrink-0">
                        {poet.image_url ? (
                          <Image src={poet.image_url} alt={poet.name_en} width={32} height={32} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-white/20">
                            {poet.name_en.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                          {poet.name_en}
                        </p>
                        <p className="text-xs text-white/30 mt-0.5 urdu">{poet.name_ur}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-sm text-white/45">{poet.era ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className="text-xs text-white/35">
                      {poet.born ?? "?"} — {poet.died ?? "?"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/poets/${poet.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/4 transition-all"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/poets/${poet.id}/edit`}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-white/50 hover:text-[#c8a96e] hover:bg-[#c8a96e]/6 transition-all"
                      >
                        Edit
                      </Link>
                      <DeleteForm id={poet.id} action={deletePoet} label="Delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
