import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PoemForm from "@/components/admin/PoemForm";
import { createPoem } from "@/lib/admin/actions";

export default async function NewPoemPage() {
  const supabase = await createClient();
  const [{ data: poets }, { data: categories }] = await Promise.all([
    supabase.from("poets").select("*").order("name_en"),
    supabase.from("categories").select("*").order("name_en"),
  ]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/poems" className="text-white/30 hover:text-white/60 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Add Poem</h1>
          <p className="text-sm text-white/40 mt-0.5">Create a new poem entry</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-2xl p-7">
        <PoemForm
          poets={poets ?? []}
          categories={categories ?? []}
          action={createPoem}
        />
      </div>
    </div>
  );
}
