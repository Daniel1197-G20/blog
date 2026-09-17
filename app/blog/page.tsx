"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PostList from "@/components/blog/PostList/PostList";
import Pagination from "@/components/blog/Pagination/Pagination";
import { PostListSkeleton } from "@/components/common/Skeleton/Skeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchPostsRequest } from "@/store/slices/postsSlice";
import { selectPostsState } from "@/store/selectors/postsSelectors";
import { POSTS_PER_PAGE } from "@/utils/constants";

const QUICK_TAGS = [
  { label: "All", tag: "" },
  { label: "History", tag: "history", color: "hover:border-amber-400 dark:hover:border-amber-600" },
  { label: "Mystery", tag: "mystery", color: "hover:border-violet-400 dark:hover:border-violet-600" },
  { label: "Classic", tag: "classic", color: "hover:border-ocean-400 dark:hover:border-ocean-600" },
  { label: "Love", tag: "love", color: "hover:border-terracotta-400 dark:hover:border-terracotta-600" },
];

function BlogContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const { posts, total, isLoading, error } = useAppSelector(selectPostsState);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    setQuery(urlQuery);
    setPage(1);
  }, [urlQuery]);

  useEffect(() => {
    dispatch(
      fetchPostsRequest({
        limit: POSTS_PER_PAGE,
        skip: (page - 1) * POSTS_PER_PAGE,
        q: urlQuery || undefined,
      })
    );
  }, [dispatch, page, urlQuery]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/blog?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/blog");
    }
  };

  const handleTagFilter = (tag: string) => {
    if (tag) {
      router.push(`/blog?q=${encodeURIComponent(tag)}`);
    } else {
      router.push("/blog");
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push("/blog");
  };

  const retry = () => {
    dispatch(
      fetchPostsRequest({
        limit: POSTS_PER_PAGE,
        skip: (page - 1) * POSTS_PER_PAGE,
        q: urlQuery || undefined,
      })
    );
  };

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest-100/90 px-3 py-1 text-xs font-semibold text-forest-800 dark:bg-forest-900/60 dark:text-forest-200">
          <span>The Reading Room</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50">
          Ideas worth returning to.
        </h1>
        <p className="text-sm sm:text-base text-forest-800/75 dark:text-forest-100/70">
          Explore thoughtful commentary, essays, and stories across culture, craft, and technology.
        </p>
      </div>

      {/* Search and Quick Filters */}
      <div className="space-y-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-2 max-w-2xl rounded-2xl neu-inset p-2 border border-white/70 dark:border-forest-800/30"
        >
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <div className="relative flex-1 flex items-center">
            <span className="pointer-events-none pl-3 text-forest-700/60 dark:text-forest-300/60" aria-hidden="true">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              id="blog-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles by keyword or topic…"
              className="w-full bg-transparent px-3 py-2 text-base sm:text-sm text-forest-950 dark:text-forest-50 outline-none placeholder:text-forest-800/45 dark:placeholder:text-forest-100/40"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-forest-700 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-forest-950/15 transition hover:bg-forest-800 active:scale-[0.98]"
          >
            Search
          </button>
        </form>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-forest-800/60 dark:text-forest-100/60 mr-1">
            Quick tags:
          </span>
          {QUICK_TAGS.map(({ label, tag, color }) => {
            const isActive = (!urlQuery && !tag) || urlQuery.toLowerCase() === tag;
            return (
              <button
                key={label}
                type="button"
                onClick={() => handleTagFilter(tag)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-forest-800 text-white shadow-neu-flat-sm dark:bg-forest-200 dark:text-forest-950"
                    : `neu-flat-sm border border-white/60 dark:border-forest-800/30 text-forest-800 dark:text-forest-200 ${color}`
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {urlQuery && (
        <div className="flex items-center gap-2 text-sm text-forest-800/80 dark:text-forest-100/75">
          <span>
            Results for <strong className="text-forest-950 dark:text-forest-50">“{urlQuery}”</strong> ({total} found)
          </span>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold text-terracotta-600 dark:text-terracotta-400 hover:underline"
          >
            Clear filter ×
          </button>
        </div>
      )}

      {/* Post Grid */}
      <PostList posts={posts} isLoading={isLoading} error={error} onRetry={retry} />

      {/* Pagination */}
      {total > POSTS_PER_PAGE && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<PostListSkeleton count={6} className="py-6" />}>
      <BlogContent />
    </Suspense>
  );
}
