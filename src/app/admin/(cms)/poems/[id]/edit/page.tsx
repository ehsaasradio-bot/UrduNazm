import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PoemForm from "@/components/admin/PoemForm";
import { updatePoem } from "@/lib/admin/actions";
import type { PoemWithRelations } from "@/types/database";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPoemPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: poem }, { data: poets }, { data: categories }] = await Promise.all([
    supabase
      .from("poems")
      .select(`*, poet:poets(id, name_en, name_ur, slug), category:categories(id, name_en, name_ur, slug)`)
      .eq("id", id)
      .single(),
    supabase.from("poets").select("*").order("name_en"),
    supabase.from("categories").select("*").order("name_en"),
  ]);

  if (!poem) notFound();

  const updateAction = updatePoem.bind(null, id);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/poems" className="text-white/30 hover:text-white/60 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Edit Poem</h1>
          <p className="text-sm text-white/40 mt-0.5 urdu">{poem.title_ur}</p>
        </div>
        <Link
          href={`/poems/${poem.slug}`}
          target="_blank"
          className="ml-auto text-xs text-white/30 hover:text-[#c8a96e] flex items-center gap-1.5 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View live
        </Link>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-2xl p-7">
        <PoemForm
          poets={poets ?? []}
          categories={categories ?? []}
          poem={poem as PoemWithRelations}
          action={updateAction}
          isEdit
        />
      </div>
    </div>
  );
}
