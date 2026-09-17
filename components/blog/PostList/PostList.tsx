"use client";

import React from "react";
import PostCard from "../PostCard/PostCard";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import Button from "@/components/common/Button/Button";
import type { Post } from "@/types";

export interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  className?: string;
}

export const PostList: React.FC<PostListProps> = ({ posts, isLoading, error, onRetry, className = "" }) => {
  if (isLoading && posts.length === 0) return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading posts">{Array.from({ length: 6 }, (_, index) => <div key={index} className="overflow-hidden rounded-2xl border border-forest-900/10 bg-white dark:border-forest-100/10 dark:bg-forest-900/40"><div className="aspect-[16/9] animate-pulse bg-forest-100 dark:bg-forest-900"/><div className="space-y-3 p-5"><div className="h-4 w-20 animate-pulse rounded bg-forest-100 dark:bg-forest-900"/><div className="h-6 w-4/5 animate-pulse rounded bg-forest-100 dark:bg-forest-900"/><div className="h-4 w-full animate-pulse rounded bg-forest-100 dark:bg-forest-900"/></div></div>)}</div>;
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;
  if (posts.length === 0) {
    return (
      <div className="border-y border-forest-900/10 py-16 text-center dark:border-forest-100/10">
        <p className="text-lg font-semibold text-forest-950 dark:text-forest-50">Nothing has been published here yet.</p>
        <p className="mt-2 text-sm text-forest-800/70 dark:text-forest-100/70">Try loading the collection again in a moment.</p>
        <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>Reload posts</Button>
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 ${className}`} aria-busy={isLoading}>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
