/**
 * Blog post detail page component — Lovable style.
 * Dark background, large title, coral category, author/date meta,
 * then content body with clean typography.
 */

import Image from "next/image";

interface BlogPostProps {
  title: string;
  category: string;
  author: string;
  date: string;
  coverGradient?: string;
  coverImage?: string;
  children: React.ReactNode;
}

export default function BlogPost({
  title,
  category,
  author,
  date,
  coverGradient = "blog-gradient-1",
  coverImage,
  children,
}: BlogPostProps) {
  return (
    <article className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
      {/* Category */}
      <p className="text-[13px] text-coral mb-4">{category}</p>

      {/* Title */}
      <h1 className="text-3xl md:text-[40px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-5">
        {title}
      </h1>

      {/* Meta */}
      <p className="text-[14px] text-muted-foreground mb-10">
        {author} <span className="mx-1.5">·</span> {date}
      </p>

      {/* Cover */}
      <div
        className={`relative aspect-[16/9] rounded-xl mb-12 overflow-hidden ${
          coverImage ? "" : coverGradient
        }`}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 720px) 100vw, 720px"
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      {/* Content — prose styling */}
      <div className="prose-lovable">
        {children}
      </div>
    </article>
  );
}
