import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  rounded = "xl",
  ...props
}) => {
  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-forest-900/10 dark:bg-forest-100/10 animate-pulse ${roundedMap[rounded]} ${className}`}
      {...props}
    />
  );
};

export const PostCardSkeleton: React.FC = () => {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl neu-flat border border-white/60 dark:border-forest-800/30"
      aria-hidden="true"
    >
      <div className="relative aspect-[16/9] w-full bg-forest-900/10 dark:bg-forest-100/10 animate-pulse" />
      <div className="flex flex-1 flex-col p-5 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20" rounded="full" />
          <Skeleton className="h-4 w-16" rounded="md" />
        </div>
        <div className="space-y-2 pt-1">
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="mt-auto flex items-center justify-between pt-5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

export const PostListSkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 6,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      role="status"
      aria-label="Loading articles…"
    >
      {Array.from({ length: count }, (_, index) => (
        <PostCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading articles…</span>
    </div>
  );
};

export const PostDetailSkeleton: React.FC = () => {
  return (
    <article className="mx-auto max-w-4xl" role="status" aria-label="Loading article…">
      <div className="overflow-hidden rounded-3xl neu-flat border border-white/60 dark:border-forest-800/30">
        <div className="aspect-[16/8] sm:aspect-[21/9] w-full bg-forest-900/10 dark:bg-forest-100/10 animate-pulse" />
        <div className="space-y-6 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-6 w-24" rounded="full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="space-y-3 pt-2">
            <Skeleton className="h-9 sm:h-12 w-11/12" />
            <Skeleton className="h-9 sm:h-12 w-4/5" />
          </div>
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16" rounded="full" />
            <Skeleton className="h-6 w-20" rounded="full" />
            <Skeleton className="h-6 w-14" rounded="full" />
          </div>
          <div className="space-y-4 border-t border-forest-900/10 dark:border-forest-100/10 pt-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading article…</span>
    </article>
  );
};

export const CommentSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4" role="status" aria-label="Loading comments…">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="rounded-2xl neu-flat-sm p-4 border border-white/50 dark:border-forest-800/30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-7 w-7" rounded="full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
      <span className="sr-only">Loading comments…</span>
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-7" role="status" aria-label="Loading dashboard…">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="rounded-2xl neu-flat p-5 border border-white/60 dark:border-forest-700/30 space-y-3"
          >
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl neu-flat p-6 border border-white/60 dark:border-forest-800/30 space-y-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <span className="sr-only">Loading dashboard…</span>
    </div>
  );
};

export default Skeleton;
