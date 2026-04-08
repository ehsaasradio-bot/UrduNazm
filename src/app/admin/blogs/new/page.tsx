import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";
import { createBlog } from "@/lib/admin/actions";

export default function NewBlogPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blogs" className="text-white/30 hover:text-white/60 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">New Blog Post</h1>
          <p className="text-sm text-white/40 mt-0.5">Write and publish a new article</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-2xl p-7">
        <BlogForm action={createBlog} />
      </div>
    </div>
  );
}
