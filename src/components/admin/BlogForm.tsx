"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FormField, inputCls, textareaCls, selectCls, SubmitButton } from "./AdminFormField";
import { toSlug } from "@/lib/admin/utils";
import type { Blog } from "@/types/database";

const BLOG_CATEGORIES = [
  "Poetry Analysis",
  "Poet Profiles",
  "History & Culture",
  "Translation",
  "Resources",
  "News",
];

interface BlogFormProps {
  blog?: Blog;
  action: (formData: FormData) => Promise<void>;
  isEdit?: boolean;
}

export default function BlogForm({ blog, action, isEdit }: BlogFormProps) {
  const [titleEn, setTitleEn] = useState(blog?.title_en ?? "");
  const [slug, setSlug] = useState(blog?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!blog?.slug);
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
            placeholder="e.g. The Magic of Ghazal"
            className={inputCls}
          />
        </FormField>

        <FormField label="عنوان (اردو)">
          <input
            name="title_ur"
            defaultValue={blog?.title_ur ?? ""}
            dir="rtl"
            placeholder="اختیاری"
            className={inputCls + " urdu text-right text-base"}
          />
        </FormField>
      </div>

      <FormField label="Slug" hint="Auto-generated from title. Determines the blog URL.">
        <input
          name="slug"
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
          required
          placeholder="the-magic-of-ghazal"
          className={inputCls}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Category" required>
          <select name="category" defaultValue={blog?.category ?? ""} required className={selectCls}>
            <option value="">— Select category —</option>
            {BLOG_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Author Name" required>
          <input
            name="author_name"
            defaultValue={blog?.author_name ?? ""}
            required
            placeholder="e.g. Syed Ahmed"
            className={inputCls}
          />
        </FormField>
      </div>

      <FormField label="Cover Image URL" hint="Direct URL to a banner image for this post.">
        <input
          name="cover_image"
          type="url"
          defaultValue={blog?.cover_image ?? ""}
          placeholder="https://..."
          className={inputCls}
        />
      </FormField>

      <FormField label="Excerpt (English)" hint="Short summary shown on the blog listing page (1–2 sentences).">
        <textarea
          name="excerpt_en"
          defaultValue={blog?.excerpt_en ?? ""}
          rows={2}
          placeholder="A brief description of this post..."
          className={textareaCls + " min-h-[70px]"}
        />
      </FormField>

      <FormField label="Content (English)" required hint="Main body of the blog post. Markdown is supported.">
        <textarea
          name="content_en"
          defaultValue={blog?.content_en ?? ""}
          required
          rows={14}
          placeholder="Write your blog post here..."
          className={textareaCls + " min-h-[280px] font-mono text-xs leading-relaxed"}
        />
      </FormField>

      <FormField label="مضمون (اردو)" hint="اختیاری — اردو میں مکمل تحریر">
        <textarea
          name="content_ur"
          defaultValue={blog?.content_ur ?? ""}
          rows={8}
          dir="rtl"
          placeholder="اردو میں مضمون یہاں لکھیں..."
          className={textareaCls + " urdu text-right text-base leading-[2]"}
        />
      </FormField>

      <div className="flex items-center gap-3 py-2 border-t border-white/6 mt-2">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={blog?.published ?? false}
          className="w-4 h-4 rounded accent-[#c8a96e] cursor-pointer"
        />
        <label htmlFor="published" className="text-sm text-white/60 cursor-pointer select-none">
          Publish immediately (visible to readers)
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton label={isEdit ? "Save Changes" : "Create Post"} pending={isPending} />
        <Link href="/admin/blogs" className="text-sm text-white/35 hover:text-white/60 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
