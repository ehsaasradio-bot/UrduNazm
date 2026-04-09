interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-surface rounded-lg ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent 0%, var(--color-border) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonLine({ width = "w-full" }: { width?: string }) {
  return <Skeleton className={`h-3 ${width}`} />;
}
