import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteBlog } from "@/lib/admin/actions";
import { DeleteForm } from "@/components/admin/AdminFormField";

export default async function AdminBlogsPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, title_en, title_ur, slug, category, author_name, published, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Blog Posts</h1>
          <p className="text-sm text-white/40 mt-1">{blogs?.length ?? 0} total</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c8a96e] hover:bg-[#b8996e] text-[#0a0a0f] font-semibold text-sm transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Post
        </Link>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-hidden">
        {!blogs || blogs.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/30 text-sm mb-3">No blog posts yet</p>
            <Link href="/admin/blogs/new" className="text-[#c8a96e] text-sm hover:underline">
              Write your first post →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left text-xs text-white/35 font-medium px-5 py-3.5">Title</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden md:table-cell">Category</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden md:table-cell">Author</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden lg:table-cell">Status</th>
                <th className="text-left text-xs text-white/35 font-medium px-4 py-3.5 hidden lg:table-cell">Date</th>
                <th className="text-right text-xs text-white/35 font-medium px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors truncate max-w-[220px]">
                      {blog.title_en}
                    </p>
                    {blog.title_ur && (
                      <p className="text-xs text-white/30 mt-0.5 urdu">{blog.title_ur}</p>
                    )}
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-xs text-white/40 bg-white/4 border border-white/6 px-2 py-0.5 rounded-full">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-sm text-white/45">{blog.author_name}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    {blog.published ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/8 border border-emerald-400/15 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-white/30 bg-white/4 border border-white/8 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 inline-block" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className="text-xs text-white/30">
                      {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {blog.published && (
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="px-2.5 py-1.5 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/4 transition-all"
                        >
                          View
                        </Link>
                      )}
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-white/50 hover:text-[#c8a96e] hover:bg-[#c8a96e]/6 transition-all"
                      >
                        Edit
                      </Link>
                      <DeleteForm id={blog.id} action={deleteBlog} label="Delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
