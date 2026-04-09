import Skeleton from "@/components/ui/Skeleton";

export default function PoemLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[680px] px-6">
        {/* Back link */}
        <Skeleton className="h-4 w-24 mb-10" />
        {/* Category + title */}
        <Skeleton className="h-5 w-20 mb-4" />
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-8 w-1/2 mb-8" />
        {/* Poet row */}
        <div className="flex items-center gap-3 mb-12">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Poem body */}
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className={`h-5 ${i % 2 === 0 ? "w-full" : "w-4/5"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
