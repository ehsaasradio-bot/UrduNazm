import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  author: string;
  date: string;
  coverGradient?: string;
  coverImage?: string;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  category,
  author,
  date,
  coverGradient = "blog-gradient-1",
  coverImage,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      {/* Cover image / gradient */}
      <div
        className={`relative aspect-[16/10] rounded-xl mb-4 overflow-hidden ${
          coverImage ? "" : coverGradient
        }`}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      {/* Category label — coral like Lovable */}
      <p className="text-[13px] text-coral mb-2">{category}</p>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-[13px] text-muted leading-relaxed mb-3 line-clamp-2">
          {excerpt}
        </p>
      )}

      {/* Author + Date */}
      <p className="text-[13px] text-muted-foreground">
        {author} <span className="mx-1.5">·</span> {date}
      </p>
    </Link>
  );
}
