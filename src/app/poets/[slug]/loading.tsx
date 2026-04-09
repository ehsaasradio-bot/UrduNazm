import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";
import { SkeletonCard } from "@/components/ui/Skeleton";

export default function PoetLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <Container>
        {/* Poet header */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <Skeleton className="h-24 w-24 rounded-full shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-16 w-full max-w-lg" />
          </div>
        </div>
        {/* Poems grid */}
        <Skeleton className="h-6 w-36 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
