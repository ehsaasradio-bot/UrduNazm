import Container from "@/components/ui/Container";
import { SkeletonCard } from "@/components/ui/Skeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function PoetsLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <Skeleton className="h-10 w-40 mb-3" />
          <Skeleton className="h-5 w-64" />
        </div>
        {/* Era label */}
        <Skeleton className="h-5 w-24 mb-6" />
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        {/* Second era */}
        <Skeleton className="h-5 w-24 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
