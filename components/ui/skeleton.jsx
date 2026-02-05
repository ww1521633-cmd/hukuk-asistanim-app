'use client';

import { cn } from '@/lib/utils';

/**
 * Skeleton Component
 * Placeholder loading animation
 */
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton Card Component
 * Card-shaped loading placeholder
 */
export function SkeletonCard({ className }) {
  return (
    <div className={cn("p-4 border rounded-lg space-y-3", className)}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton List Component
 * Multiple skeleton cards for list loading
 */
export function SkeletonList({ count = 3, className }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton Form Component
 * Form-shaped loading placeholder
 */
export function SkeletonForm({ fields = 4 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32 mt-4" />
    </div>
  );
}

/**
 * Skeleton Stats Component
 * Stats card loading placeholder
 */
export function SkeletonStats() {
  return (
    <div className="p-6 border rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

export default Skeleton;
 
