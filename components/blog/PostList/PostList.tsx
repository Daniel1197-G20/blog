"use client";

import React from "react";
import PostCard from "../PostCard/PostCard";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import { PostListSkeleton } from "@/components/common/Skeleton/Skeleton";
import type { Post } from "@/types";

export interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  className?: string;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  isLoading,
  error,
  onRetry,
  className = "",
}) => {
  if (isLoading && posts.length === 0) {
    return <PostListSkeleton count={6} className={className} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (posts.length === 0) {
    return (
      <Card variant="flat" className="my-8 py-16 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-forest-100 text-forest-700 dark:bg-forest-900/60 dark:text-forest-300">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold tracking-tight text-forest-950 dark:text-forest-50">
          Nothing found here yet
        </h3>
        <p className="mt-2 text-sm text-forest-800/70 dark:text-forest-100/70 max-w-sm mx-auto">
          We couldn&apos;t find any articles matching your search. Try adjusting keywords or refreshing.
        </p>
        <Button variant="neu" size="sm" className="mt-6" onClick={onRetry}>
          Reload collection
        </Button>
      </Card>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      aria-busy={isLoading}
    >
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} priority={index < 2} />
      ))}
    </div>
  );
};

export default PostList;
