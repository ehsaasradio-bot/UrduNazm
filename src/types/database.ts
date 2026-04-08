/**
 * TypeScript types matching the Supabase schema.
 * Updated to match supabase/migrations/001_initial.sql
 */

export interface Category {
  id: string;
  name_en: string;
  name_ur: string;
  slug: string;
  created_at: string;
}

export interface Poet {
  id: string;
  name_en: string;
  name_ur: string;
  slug: string;
  bio_en: string | null;
  bio_ur: string | null;
  image_url: string | null;
  born: string | null;
  died: string | null;
  era: string | null;
  created_at: string;
}

export interface Poem {
  id: string;
  title_en: string;
  title_ur: string;
  content_ur: string;
  content_en: string | null;
  poet_id: string;
  category_id: string | null;
  slug: string;
  featured: boolean;
  created_at: string;
}

/** Poem with joined poet and category data */
export interface PoemWithRelations extends Poem {
  poet: Pick<Poet, "id" | "name_en" | "name_ur" | "slug">;
  category: Pick<Category, "id" | "name_en" | "name_ur" | "slug"> | null;
}

/** Minimal poem shape returned by the search modal query.
 *  Supabase returns joined relations as arrays, so poet/category are arrays here. */
export interface SearchPoem {
  id: string;
  title_en: string;
  title_ur: string;
  slug: string;
  poet: Pick<Poet, "id" | "name_en" | "name_ur" | "slug">[];
  category: Pick<Category, "id" | "name_en" | "name_ur" | "slug">[] | null;
}

export interface Blog {
  id: string;
  title_en: string;
  title_ur: string | null;
  content_en: string;
  content_ur: string | null;
  excerpt_en: string | null;
  slug: string;
  cover_image: string | null;
  category: string;
  author_name: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  poem_id: string;
  created_at: string;
}

/** Bookmark with joined poem data */
export interface BookmarkWithPoem extends Bookmark {
  poem: PoemWithRelations;
}
