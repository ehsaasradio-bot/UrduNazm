import Link from "next/link";
import type { Blog } from "@/types/database";

interface RecentBlogsProps {
  blogs: Blog[];
}

export default function RecentBlogs({ blogs }: RecentBlogsProps) {
  if (blogs.length === 0) return null;

  const gradients = [
    "from-[#a78bfa]/30 to-[#60a5fa]/20",
    "from-[#60a5fa]/30 to-[#2dd4bf]/20",
    "from-[#2dd4bf]/30 to-[#a78bfa]/20",
  ];

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
      <div className="max-w-lg mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground mb-4">
          From the Blog
        </h2>
        <p className="text-muted leading-relaxed">
          Literary analysis, poet biographies, and deep dives into Urdu literature.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, i) => {
          const date = blog.published_at
            ? new Date(blog.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "";

          return (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group block"
            >
              {/* Cover gradient */}
              <div className={`relative aspect-[16/10] rounded-xl mb-4 overflow-hidden bg-gradient-to-br ${gradients[i % 3]} border border-border`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg text-accent/40 font-medium">
                    {blog.title_en.split(" ").slice(0, 3).join(" ")}
                  </span>
                </div>
              </div>

              {/* Category */}
              <p className="text-[13px] text-accent mb-2">{blog.category}</p>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors">
                {blog.title_en}
              </h3>

              {/* Excerpt */}
              {blog.excerpt_en && (
                <p className="text-[13px] text-muted leading-relaxed mb-3 line-clamp-2">
                  {blog.excerpt_en}
                </p>
              )}

              {/* Author + Date */}
              <p className="text-[13px] text-muted-foreground">
                {blog.author_name}
                {date && (
                  <>
                    <span className="mx-1.5">·</span>
                    {date}
                  </>
                )}
              </p>
            </Link>
          );
        })}
      </div>

      {/* View all link */}
      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          View all posts
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  );
}
