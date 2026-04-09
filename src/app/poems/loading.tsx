import Container from "@/components/ui/Container";
import { SkeletonCard } from "@/components/ui/Skeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function PoemsLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <Skeleton className="h-10 w-48 mb-3" />
          <Skeleton className="h-5 w-72" />
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
