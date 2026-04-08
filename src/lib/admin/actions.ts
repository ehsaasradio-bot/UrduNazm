"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ── Helpers ──────────────────────────────────────────────────────────────────

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") throw new Error("Not authorized");

  return { supabase };
}

// ── POEMS ────────────────────────────────────────────────────────────────────

export async function createPoem(formData: FormData) {
  const { supabase } = await requireAdmin();
  const title_en = formData.get("title_en") as string;
  const slug = (formData.get("slug") as string) || toSlug(title_en);

  const { error } = await supabase.from("poems").insert({
    title_en,
    title_ur: formData.get("title_ur") as string,
    content_ur: formData.get("content_ur") as string,
    content_en: (formData.get("content_en") as string) || null,
    poet_id: formData.get("poet_id") as string,
    category_id: (formData.get("category_id") as string) || null,
    slug,
    featured: formData.get("featured") === "on",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/poems");
  revalidatePath("/admin/poems");
  redirect("/admin/poems");
}

export async function updatePoem(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("poems")
    .update({
      title_en: formData.get("title_en") as string,
      title_ur: formData.get("title_ur") as string,
      content_ur: formData.get("content_ur") as string,
      content_en: (formData.get("content_en") as string) || null,
      poet_id: formData.get("poet_id") as string,
      category_id: (formData.get("category_id") as string) || null,
      slug: formData.get("slug") as string,
      featured: formData.get("featured") === "on",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/poems");
  revalidatePath("/admin/poems");
  redirect("/admin/poems");
}

export async function deletePoem(_: unknown, formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("poems").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/poems");
  revalidatePath("/admin/poems");
}

// ── POETS ────────────────────────────────────────────────────────────────────

export async function createPoet(formData: FormData) {
  const { supabase } = await requireAdmin();
  const name_en = formData.get("name_en") as string;
  const slug = (formData.get("slug") as string) || toSlug(name_en);

  const { error } = await supabase.from("poets").insert({
    name_en,
    name_ur: formData.get("name_ur") as string,
    bio_en: (formData.get("bio_en") as string) || null,
    bio_ur: (formData.get("bio_ur") as string) || null,
    image_url: (formData.get("image_url") as string) || null,
    born: (formData.get("born") as string) || null,
    died: (formData.get("died") as string) || null,
    era: (formData.get("era") as string) || null,
    slug,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/poets");
  revalidatePath("/admin/poets");
  redirect("/admin/poets");
}

export async function updatePoet(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("poets")
    .update({
      name_en: formData.get("name_en") as string,
      name_ur: formData.get("name_ur") as string,
      bio_en: (formData.get("bio_en") as string) || null,
      bio_ur: (formData.get("bio_ur") as string) || null,
      image_url: (formData.get("image_url") as string) || null,
      born: (formData.get("born") as string) || null,
      died: (formData.get("died") as string) || null,
      era: (formData.get("era") as string) || null,
      slug: formData.get("slug") as string,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/poets");
  revalidatePath("/admin/poets");
  redirect("/admin/poets");
}

export async function deletePoet(_: unknown, formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("poets").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/poets");
  revalidatePath("/admin/poets");
}

// ── BLOGS ────────────────────────────────────────────────────────────────────

export async function createBlog(formData: FormData) {
  const { supabase } = await requireAdmin();
  const title_en = formData.get("title_en") as string;
  const slug = (formData.get("slug") as string) || toSlug(title_en);
  const published = formData.get("published") === "on";

  const { error } = await supabase.from("blogs").insert({
    title_en,
    title_ur: (formData.get("title_ur") as string) || null,
    content_en: formData.get("content_en") as string,
    content_ur: (formData.get("content_ur") as string) || null,
    excerpt_en: (formData.get("excerpt_en") as string) || null,
    slug,
    cover_image: (formData.get("cover_image") as string) || null,
    category: formData.get("category") as string,
    author_name: formData.get("author_name") as string,
    published,
    published_at: published ? new Date().toISOString() : null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  const published = formData.get("published") === "on";

  const { error } = await supabase
    .from("blogs")
    .update({
      title_en: formData.get("title_en") as string,
      title_ur: (formData.get("title_ur") as string) || null,
      content_en: formData.get("content_en") as string,
      content_ur: (formData.get("content_ur") as string) || null,
      excerpt_en: (formData.get("excerpt_en") as string) || null,
      slug: formData.get("slug") as string,
      cover_image: (formData.get("cover_image") as string) || null,
      category: formData.get("category") as string,
      author_name: formData.get("author_name") as string,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlog(_: unknown, formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}
