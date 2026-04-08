"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FormField, inputCls, textareaCls, SubmitButton } from "./AdminFormField";
import { toSlug } from "@/lib/admin/actions";
import type { Poet } from "@/types/database";

interface PoetFormProps {
  poet?: Poet;
  action: (formData: FormData) => Promise<void>;
  isEdit?: boolean;
}

export default function PoetForm({ poet, action, isEdit }: PoetFormProps) {
  const [nameEn, setNameEn] = useState(poet?.name_en ?? "");
  const [slug, setSlug] = useState(poet?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!poet?.slug);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setNameEn(val);
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
        <FormField label="Name (English)" required>
          <input
            name="name_en"
            value={nameEn}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            placeholder="e.g. Mirza Ghalib"
            className={inputCls}
          />
        </FormField>

        <FormField label="نام (اردو)" required>
          <input
            name="name_ur"
            defaultValue={poet?.name_ur}
            required
            dir="rtl"
            placeholder="مثال: مرزا غالب"
            className={inputCls + " urdu text-right text-base"}
          />
        </FormField>
      </div>

      <FormField label="Slug" hint="URL-friendly identifier. Auto-generated from name.">
        <input
          name="slug"
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
          required
          placeholder="mirza-ghalib"
          className={inputCls}
        />
      </FormField>

      <div className="grid grid-cols-3 gap-5">
        <FormField label="Born" hint="Year or date of birth">
          <input
            name="born"
            defaultValue={poet?.born ?? ""}
            placeholder="1797"
            className={inputCls}
          />
        </FormField>
        <FormField label="Died" hint="Year or date of death">
          <input
            name="died"
            defaultValue={poet?.died ?? ""}
            placeholder="1869"
            className={inputCls}
          />
        </FormField>
        <FormField label="Era / Period">
          <input
            name="era"
            defaultValue={poet?.era ?? ""}
            placeholder="Mughal, Modern…"
            className={inputCls}
          />
        </FormField>
      </div>

      <FormField label="Profile Image URL" hint="Direct URL to a portrait image (JPG/PNG/WebP).">
        <input
          name="image_url"
          type="url"
          defaultValue={poet?.image_url ?? ""}
          placeholder="https://..."
          className={inputCls}
        />
      </FormField>

      <FormField label="Biography (English)">
        <textarea
          name="bio_en"
          defaultValue={poet?.bio_en ?? ""}
          rows={5}
          placeholder="Brief biography in English..."
          className={textareaCls}
        />
      </FormField>

      <FormField label="سوانح عمری (اردو)">
        <textarea
          name="bio_ur"
          defaultValue={poet?.bio_ur ?? ""}
          rows={5}
          dir="rtl"
          placeholder="اردو میں مختصر سوانح..."
          className={textareaCls + " urdu text-right text-base leading-[2]"}
        />
      </FormField>

      <div className="flex items-center gap-3 pt-2 border-t border-white/6">
        <SubmitButton label={isEdit ? "Save Changes" : "Create Poet"} pending={isPending} />
        <Link href="/admin/poets" className="text-sm text-white/35 hover:text-white/60 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
