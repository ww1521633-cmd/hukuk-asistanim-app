export function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 ${className}`} />;
}

export function SkeletonStats() {
  return (
    <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />
  );
}

export function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 h-16 rounded-lg" />
      ))}
    </div>
  );
}
