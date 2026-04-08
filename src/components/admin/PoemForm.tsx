"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FormField, inputCls, textareaCls, selectCls, SubmitButton } from "./AdminFormField";
import { toSlug } from "@/lib/admin/actions";
import type { Poet, Category, PoemWithRelations } from "@/types/database";

interface PoemFormProps {
  poets: Poet[];
  categories: Category[];
  poem?: PoemWithRelations;
  action: (formData: FormData) => Promise<void>;
  isEdit?: boolean;
}

export default function PoemForm({ poets, categories, poem, action, isEdit }: PoemFormProps) {
  const [titleEn, setTitleEn] = useState(poem?.title_en ?? "");
  const [slug, setSlug] = useState(poem?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!poem?.slug);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitleEn(val);
    if (!slugEdited) setSlug(toSlug(val));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await action(formData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Title (English)" required>
          <input
            name="title_en"
            value={titleEn}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="e.g. My Ghazal"
            className={inputCls}
          />
        </FormField>

        <FormField label="عنوان (اردو)" required>
          <input
            name="title_ur"
            defaultValue={poem?.title_ur}
            required
            dir="rtl"
            placeholder="مثال: میری غزل"
            className={inputCls + " urdu text-right text-base"}
          />
        </FormField>
      </div>

      <FormField label="Slug" hint="Auto-generated from title. Edit to customise the URL.">
        <input
          name="slug"
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
          required
          placeholder="my-ghazal"
          className={inputCls}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Poet" required>
          <select name="poet_id" defaultValue={poem?.poet_id} required className={selectCls}>
            <option value="">— Select poet —</option>
            {poets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name_en}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Category">
          <select name="category_id" defaultValue={poem?.category_id ?? ""} className={selectCls}>
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_en}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Poem Content (Urdu)" required hint="The full poem text in Urdu/Nastaliq script.">
        <textarea
          name="content_ur"
          defaultValue={poem?.content_ur}
          required
          dir="rtl"
          rows={10}
          placeholder="یہاں نظم لکھیں..."
          className={textareaCls + " urdu text-right text-lg leading-[2.2] min-h-[200px]"}
        />
      </FormField>

      <FormField label="Translation / Notes (English)" hint="Optional English translation or editorial notes.">
        <textarea
          name="content_en"
          defaultValue={poem?.content_en ?? ""}
          rows={6}
          placeholder="Optional English translation..."
          className={textareaCls}
        />
      </FormField>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={poem?.featured ?? false}
          className="w-4 h-4 rounded accent-[#c8a96e] cursor-pointer"
        />
        <label htmlFor="featured" className="text-sm text-white/60 cursor-pointer select-none">
          Feature on homepage
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-white/6">
        <SubmitButton label={isEdit ? "Save Changes" : "Create Poem"} pending={isPending} />
        <Link href="/admin/poems" className="text-sm text-white/35 hover:text-white/60 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
