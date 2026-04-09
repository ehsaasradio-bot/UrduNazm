import type { MetadataRoute } from "next";
import { getPoets, getPoems, getBlogs } from "@/lib/supabase/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://urdunazm.com";

  // Fetch dynamic content with error handling
  const [poets, poems, blogs] = await Promise.all([
    getPoets().catch(() => []),
    getPoems().catch(() => []),
    getBlogs().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/poets`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/poems`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/chat`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const poetPages: MetadataRoute.Sitemap = poets.map((poet) => ({
    url: `${baseUrl}/poets/${poet.slug}`,
    lastModified: new Date(poet.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const poemPages: MetadataRoute.Sitemap = poems.map((poem) => ({
    url: `${baseUrl}/poems/${poem.slug}`,
    lastModified: new Date(poem.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.published_at || blog.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...poetPages, ...poemPages, ...blogPages];
}
