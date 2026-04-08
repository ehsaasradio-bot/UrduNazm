import { createClient } from "@/lib/supabase/server";
import type {
  Poet,
  Poem,
  PoemWithRelations,
  SearchPoem,
  Category,
  Blog,
  BookmarkWithPoem,
} from "@/types/database";

// Supabase error code for "no rows returned" from .single()
const SUPABASE_NO_ROWS_ERROR = "PGRST116";

// ==================== POETS ====================

export async function getPoets(): Promise<Poet[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("poets")
    .select("*")
    .order("name_en");

  if (error) throw error;
  return data;
}

export async function getPoetBySlug(slug: string): Promise<Poet | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("poets")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error && error.code !== SUPABASE_NO_ROWS_ERROR) throw error;
  return data;
}

// ==================== POEMS ====================

export async function getPoems(options?: {
  categorySlug?: string;
  poetSlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<PoemWithRelations[]> {
  const supabase = await createClient();
  let query = supabase
    .from("poems")
    .select(`
      *,
      poet:poets!poet_id(id, name_en, name_ur, slug),
      category:categories!category_id(id, name_en, name_ur, slug)
    `)
    .order("created_at", { ascending: false });

  if (options?.featured) {
    query = query.eq("featured", true);
  }

  if (options?.categorySlug) {
    query = query.eq("category.slug", options.categorySlug);
  }

  if (options?.poetSlug) {
    query = query.eq("poet.slug", options.poetSlug);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data as PoemWithRelations[];
}

export async function getPoemBySlug(
  slug: string
): Promise<PoemWithRelations | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("poems")
    .select(`
      *,
      poet:poets!poet_id(id, name_en, name_ur, slug),
      category:categories!category_id(id, name_en, name_ur, slug)
    `)
    .eq("slug", slug)
    .single();

  if (error && error.code !== SUPABASE_NO_ROWS_ERROR) throw error;
  return data as PoemWithRelations | null;
}

export async function getPoemsByPoet(
  poetId: string
): Promise<PoemWithRelations[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("poems")
    .select(`
      *,
      poet:poets!poet_id(id, name_en, name_ur, slug),
      category:categories!category_id(id, name_en, name_ur, slug)
    `)
    .eq("poet_id", poetId)
    .order("title_en");

  if (error) throw error;
  return data as PoemWithRelations[];
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name_en");

  if (error) throw error;
  return data;
}

// ==================== BLOGS ====================

export async function getBlogCategories(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("category")
    .eq("published", true);

  if (error) throw error;
  const unique = [...new Set(data.map((b) => b.category))].sort();
  return unique;
}

export async function getBlogs(options?: {
  category?: string;
  limit?: number;
}): Promise<Blog[]> {
  const supabase = await createClient();
  let query = supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (options?.category && options.category !== "Latest") {
    query = query.eq("category", options.category);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error && error.code !== SUPABASE_NO_ROWS_ERROR) throw error;
  return data;
}

// ==================== FEATURED / HOMEPAGE ====================

export async function getFeaturedPoems(): Promise<PoemWithRelations[]> {
  return getPoems({ featured: true, limit: 6 });
}

export async function getRandomVerse(): Promise<PoemWithRelations | null> {
  const supabase = await createClient();

  // Get all featured poems for date-based rotation
  const { data: allPoems, error: allError } = await supabase
    .from("poems")
    .select(`
      *,
      poet:poets!poet_id(id, name_en, name_ur, slug),
      category:categories!category_id(id, name_en, name_ur, slug)
    `)
    .eq("featured", true);

  if (allError) throw allError;
  if (!allPoems || allPoems.length === 0) return null;

  // Date-based rotation: use today's date to select a consistent poem
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % allPoems.length;

  return (allPoems[index] as PoemWithRelations) || null;
}

// ==================== BOOKMARKS ====================

export async function getBookmarks(userId: string): Promise<BookmarkWithPoem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`
      *,
      poem:poems (
        *,
        poet:poets ( id, name_en, name_ur, slug ),
        category:categories ( id, name_en, name_ur, slug )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as BookmarkWithPoem[];
}

export async function isBookmarked(userId: string, poemId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("poem_id", poemId)
    .maybeSingle();

  if (error) return false;
  return data !== null;
}

export async function addBookmark(userId: string, poemId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookmarks")
    .insert({ user_id: userId, poem_id: poemId });

  if (error && error.code !== "23505") throw error; // ignore duplicate
}

export async function removeBookmark(userId: string, poemId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("poem_id", poemId);

  if (error) throw error;
}

// ==================== SEARCH ====================

export interface SearchResults {
  poems: SearchPoem[];
  poets: Poet[];
  blogs: Blog[];
}

export async function search(query: string): Promise<SearchResults> {
  if (!query || query.trim().length < 2) {
    return { poems: [], poets: [], blogs: [] };
  }

  const supabase = await createClient();
  const q = query.trim();

  const [poemsResult, poetsResult, blogsResult] = await Promise.all([
    supabase
      .from("poems")
      .select(`
        *,
        poet:poets ( id, name_en, name_ur, slug ),
        category:categories ( id, name_en, name_ur, slug )
      `)
      .or(`title_en.ilike.%${q}%,title_ur.ilike.%${q}%,content_ur.ilike.%${q}%,content_en.ilike.%${q}%`)
      .limit(8),

    supabase
      .from("poets")
      .select("*")
      .or(`name_en.ilike.%${q}%,name_ur.ilike.%${q}%,bio_en.ilike.%${q}%`)
      .limit(5),

    supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .or(`title_en.ilike.%${q}%,excerpt_en.ilike.%${q}%,content_en.ilike.%${q}%`)
      .limit(5),
  ]);

  return {
    poems: (poemsResult.data ?? []) as PoemWithRelations[],
    poets: poetsResult.data ?? [],
    blogs: blogsResult.data ?? [],
  };
}
