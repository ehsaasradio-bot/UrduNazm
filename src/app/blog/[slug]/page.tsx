import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { getBlogBySlug } from "@/lib/supabase/queries";
import BlogPost from "@/components/blog/BlogPost";
import { blogPostingSchema } from "@/lib/jsonld";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Article Not Found — UrduNazm" };
  }

  return {
    title: `${blog.title_en} — UrduNazm Blog`,
    description:
      blog.excerpt_en?.slice(0, 160) ||
      `Read "${blog.title_en}" on the UrduNazm blog.`,
    openGraph: {
      title: blog.title_en,
      description: blog.excerpt_en?.slice(0, 120) || undefined,
      ...(blog.cover_image && {
        images: [{ url: blog.cover_image }],
      }),
    },
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const formattedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema(blog)) }}
      />
      {/* Back link */}
      <div className="mx-auto max-w-[720px] px-6 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          All Articles
        </Link>
      </div>

      <BlogPost
        title={blog.title_en}
        category={blog.category}
        author={blog.author_name}
        date={formattedDate}
        coverImage={blog.cover_image || undefined}
      >
        {/* Urdu title if available */}
        {blog.title_ur && (
          <p className="urdu text-2xl text-foreground/70 mb-6">
            {blog.title_ur}
          </p>
        )}

        {/* English content — sanitized to prevent XSS */}
        <div
          className="text-[15px] text-foreground/90 leading-[1.9] whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content_en) }}
        />

        {/* Urdu content */}
        {blog.content_ur && (
          <div className="mt-12 pt-10 border-t border-border">
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.1em] mb-4">
              اردو متن
            </p>
            <div className="urdu text-lg text-foreground/90 leading-[2.4] whitespace-pre-line">
              {blog.content_ur}
            </div>
          </div>
        )}
      </BlogPost>

      {/* Bottom actions */}
      <div className="mx-auto max-w-[720px] px-6 mt-10 pt-6 border-t border-border flex items-center gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 h-9 px-4 text-[13px] text-muted-foreground rounded-lg border border-border hover:border-muted-foreground/30 hover:text-foreground transition-all"
        >
          More Articles
        </Link>
        <Link
          href={`/blog?category=${blog.category}`}
          className="inline-flex items-center gap-2 h-9 px-4 text-[13px] text-muted-foreground rounded-lg border border-border hover:border-muted-foreground/30 hover:text-foreground transition-all"
        >
          More in {blog.category}
        </Link>
      </div>
    </div>
  );
}
