"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PostList from "@/components/blog/PostList/PostList";
import Pagination from "@/components/blog/Pagination/Pagination";
import Loader from "@/components/common/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchPostsRequest } from "@/store/slices/postsSlice";
import { selectPostsState } from "@/store/selectors/postsSelectors";
import { POSTS_PER_PAGE } from "@/utils/constants";

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
    <div className="space-y-8 py-4">
      <div className="max-w-3xl border-l-2 border-forest-600 pl-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-600 dark:text-forest-300">The reading room</p>
        <h1 className="mt-2 text-4xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50">
          Ideas worth returning to.
        </h1>
        <p className="mt-3 text-forest-800/75 dark:text-forest-100/70">
          Discover insights, tutorials, and deep-dives into modern web development.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex max-w-2xl rounded-2xl border border-forest-900/15 bg-white p-1.5 shadow-sm dark:border-forest-100/15 dark:bg-forest-900/40">
        <label htmlFor="blog-search" className="sr-only">Search articles</label>
        <input
          id="blog-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles by keyword"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-forest-800/45 dark:text-forest-50"
        />
        <button type="submit" className="rounded-xl bg-forest-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-800 active:scale-[0.98]">
          Search
        </button>
      </form>

      {urlQuery && (
        <div className="flex items-center gap-2 text-sm text-forest-800/70 dark:text-forest-100/70">
          <span>Showing results for <strong className="text-forest-900 dark:text-forest-50">“{urlQuery}”</strong></span>
          <button onClick={handleClear} className="font-semibold text-forest-700 hover:underline">
            Clear
          </button>
        </div>
      )}

      <PostList posts={posts} isLoading={isLoading} error={error} onRetry={retry} />

      {total > POSTS_PER_PAGE && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<Loader label="Loading reading room…" className="py-20" />}>
      <BlogContent />
    </Suspense>
  );
}
