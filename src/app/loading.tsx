import Container from "@/components/ui/Container";
import Skeleton, { SkeletonCard } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section skeleton */}
      <section className="hero-gradient mt-[30px]">
        <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-28 md:pt-36 md:pb-40">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
            <div className="flex gap-3 justify-center pt-6">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Verse of the Day skeleton */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-8">
            <Skeleton className="h-8 w-48" />
          </div>
          <SkeletonCard />
        </Container>
      </section>

      {/* Featured Poems skeleton */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-8">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Poets skeleton */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-8">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Recent Blogs skeleton */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-8">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
