import type { Metadata } from "next";
import { getBlogs, getBlogCategories } from "@/lib/supabase/queries";
import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — UrduNazm",
  description:
    "Articles on Urdu poetry, literature, and the art of verse — explore insights into ghazals, nazms, and the lives of legendary poets.",
  openGraph: {
    title: "Blog — UrduNazm",
    description:
      "Articles on Urdu poetry, literature, and the art of verse.",
  },
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;

  const [blogs, categories] = await Promise.all([
    getBlogs({ category }),
    getBlogCategories(),
  ]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Page header */}
        <div className="max-w-xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground mb-4">
            Blog
          </h1>
          <p className="text-muted leading-relaxed">
            Articles on Urdu poetry, literature, and the art of verse — insights into ghazals, nazms, and the lives of legendary poets.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 mb-10 pb-6 border-b border-border overflow-x-auto">
          <Link
            href="/blog"
            className={`flex-shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border transition-all ${
              !category
                ? "bg-foreground text-background border-foreground"
                : "text-muted-foreground border-border hover:border-muted-foreground/30 hover:text-foreground"
            }`}
          >
            Latest
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className={`flex-shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border transition-all ${
                category === cat
                  ? "bg-foreground text-background border-foreground"
                  : "text-muted-foreground border-border hover:border-muted-foreground/30 hover:text-foreground"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Results count */}
        <p className="text-[13px] text-muted-foreground mb-6">
          {blogs.length} {blogs.length === 1 ? "article" : "articles"}
          {category && (
            <>
              {" "}in{" "}
              <span className="text-foreground font-medium">{category}</span>
            </>
          )}
        </p>

        {/* Blog grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              No articles found in this category.
            </p>
            <Link
              href="/blog"
              className="text-[13px] text-accent hover:text-accent-hover transition-colors"
            >
              View all articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                slug={blog.slug}
                title={blog.title_en}
                excerpt={blog.excerpt_en || undefined}
                category={blog.category}
                author={blog.author_name}
                date={
                  blog.published_at
                    ? new Date(blog.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""
                }
                coverImage={blog.cover_image || undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
