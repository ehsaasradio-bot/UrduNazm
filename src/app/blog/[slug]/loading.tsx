import Skeleton from "@/components/ui/Skeleton";

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[720px] px-6">
        {/* Back link */}
        <Skeleton className="h-4 w-24 mb-8" />
        {/* Cover image */}
        <Skeleton className="h-64 w-full rounded-2xl mb-10" />
        {/* Category + title */}
        <Skeleton className="h-4 w-20 mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        {/* Meta row */}
        <div className="flex gap-4 mb-10">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Body */}
        <div className="space-y-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className={`h-4 ${i % 5 === 4 ? "w-2/3" : "w-full"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
