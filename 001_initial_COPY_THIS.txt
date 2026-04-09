-- ============================================================
-- UrduNazm — Initial Schema Migration
-- Run this in Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- ==================== CATEGORIES ====================
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name_en text not null,
  name_ur text not null,
  slug text not null unique,
  created_at timestamptz default now() not null
);

create index idx_categories_slug on public.categories(slug);

-- ==================== POETS ====================
create table public.poets (
  id uuid default gen_random_uuid() primary key,
  name_en text not null,
  name_ur text not null,
  slug text not null unique,
  bio_en text,
  bio_ur text,
  image_url text,
  born text,
  died text,
  era text,
  created_at timestamptz default now() not null
);

create index idx_poets_slug on public.poets(slug);
create index idx_poets_name_en on public.poets(name_en);

-- ==================== POEMS ====================
create table public.poems (
  id uuid default gen_random_uuid() primary key,
  title_en text not null,
  title_ur text not null,
  content_ur text not null,
  content_en text,
  poet_id uuid not null references public.poets(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  slug text not null unique,
  featured boolean default false,
  created_at timestamptz default now() not null
);

create index idx_poems_slug on public.poems(slug);
create index idx_poems_poet_id on public.poems(poet_id);
create index idx_poems_category_id on public.poems(category_id);
create index idx_poems_featured on public.poems(featured) where featured = true;

-- Full-text search index for poems (Urdu + English)
alter table public.poems add column fts tsvector
  generated always as (
    to_tsvector('english', coalesce(title_en, '') || ' ' || coalesce(content_en, ''))
  ) stored;

create index idx_poems_fts on public.poems using gin(fts);

-- ==================== BLOGS ====================
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  title_en text not null,
  title_ur text,
  content_en text not null,
  content_ur text,
  excerpt_en text,
  slug text not null unique,
  cover_image text,
  category text default 'Latest',
  author_name text not null default 'UrduNazm',
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now() not null
);

create index idx_blogs_slug on public.blogs(slug);
create index idx_blogs_published on public.blogs(published, published_at desc) where published = true;

-- ==================== PROFILES ====================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now() not null
);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ==================== BOOKMARKS ====================
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  poem_id uuid not null references public.poems(id) on delete cascade,
  created_at timestamptz default now() not null,
  unique(user_id, poem_id)
);

create index idx_bookmarks_user_id on public.bookmarks(user_id);
create index idx_bookmarks_poem_id on public.bookmarks(poem_id);

-- ==================== ROW LEVEL SECURITY ====================

-- Enable RLS on all tables
alter table public.categories enable row level security;
alter table public.poets enable row level security;
alter table public.poems enable row level security;
alter table public.blogs enable row level security;
alter table public.profiles enable row level security;
alter table public.bookmarks enable row level security;

-- Categories: public read
create policy "Categories are viewable by everyone"
  on public.categories for select using (true);

-- Poets: public read
create policy "Poets are viewable by everyone"
  on public.poets for select using (true);

-- Poems: public read
create policy "Poems are viewable by everyone"
  on public.poems for select using (true);

-- Blogs: public read (only published)
create policy "Published blogs are viewable by everyone"
  on public.blogs for select using (published = true);

-- Profiles: users can read all profiles, update only their own
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Bookmarks: users can CRUD only their own
create policy "Users can view their own bookmarks"
  on public.bookmarks for select using (auth.uid() = user_id);

create policy "Users can create their own bookmarks"
  on public.bookmarks for insert with check (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
  on public.bookmarks for delete using (auth.uid() = user_id);
