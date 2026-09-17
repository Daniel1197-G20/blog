"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PostList from "@/components/blog/PostList/PostList";
import Card from "@/components/common/Card/Card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchPostsRequest } from "@/store/slices/postsSlice";
import { selectPostsState } from "@/store/selectors/postsSelectors";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { posts, isLoading, error } = useAppSelector(selectPostsState);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPostsRequest({ limit: 6, skip: 0 }));
  }, [dispatch]);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(`/blog${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ""}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-forest-100/80 px-3.5 py-1 text-xs font-semibold text-forest-900 border border-forest-300/40 dark:bg-forest-900/60 dark:text-forest-200 dark:border-forest-700/40 shadow-neu-flat-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
            <span>Curated Journal & Digital Notebook</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50 leading-[1.08]">
            Thoughtful stories for a more curious life.
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-forest-900/80 dark:text-forest-100/75 max-w-xl">
            Explore practical ideas, creative craftsmanship, and reflections designed to inspire and inform across technology, literature, and everyday discovery.
          </p>

          <form
            onSubmit={submitSearch}
            className="flex flex-col sm:flex-row gap-2 max-w-lg rounded-2xl neu-inset p-2 border border-white/70 dark:border-forest-800/30"
          >
            <label htmlFor="home-search" className="sr-only">
              Search articles
            </label>
            <div className="relative flex-1 flex items-center">
              <span className="pointer-events-none pl-3 text-forest-700/60 dark:text-forest-300/60" aria-hidden="true">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                id="home-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles, topics or tags…"
                className="w-full bg-transparent px-3 py-2.5 text-base sm:text-sm text-forest-950 dark:text-forest-50 outline-none placeholder:text-forest-800/45 dark:placeholder:text-forest-100/40"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-forest-700 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-forest-950/15 transition hover:bg-forest-800 active:scale-[0.98]"
            >
              Search
            </button>
          </form>
        </div>

        {/* Hero visual */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none overflow-hidden rounded-3xl neu-flat p-2 border border-white/80 dark:border-forest-800/40">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-forest-900/10">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=75"
              alt="Sunlight filtering through morning forest trees"
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 94vw, (max-width: 1200px) 46vw, 540px"
              className="object-cover object-center gpu-layer transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="rounded-full neu-glass px-3 py-1.5 text-xs font-semibold text-forest-950 dark:text-forest-100">
                Read slowly. Think deeply.
              </span>
              <span className="rounded-full bg-amber-500/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                Issue 24
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reading Grid */}
      <section aria-labelledby="featured-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="featured-heading"
              className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-forest-950 dark:text-forest-50"
            >
              Featured Reading
            </h2>
            <p className="mt-1 text-sm text-forest-800/75 dark:text-forest-100/70">
              Hand-picked stories and latest dispatches from our contributors.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-700 hover:text-forest-900 dark:text-forest-300 dark:hover:text-white"
          >
            <span>Browse all articles</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <PostList
          posts={posts}
          isLoading={isLoading}
          error={error}
          onRetry={() => dispatch(fetchPostsRequest({ limit: 6, skip: 0 }))}
        />
      </section>

      {/* Pillars Section with Neomorphic Multi-Color Cards */}
      <section className="grid gap-5 sm:grid-cols-3">
        <Card variant="flat" tone="amber" className="space-y-3 border-t-2 border-t-amber-500">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Depth & Context
          </div>
          <h3 className="text-xl font-bold tracking-tight text-forest-950 dark:text-forest-50">
            Thoughtful Selection
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-forest-800/75 dark:text-forest-100/70">
            Carefully curated insights that focus on long-term substance rather than transient web noise.
          </p>
        </Card>

        <Card variant="flat" tone="ocean" className="space-y-3 border-t-2 border-t-ocean-500">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ocean-700 dark:text-ocean-400">
            <span className="h-2 w-2 rounded-full bg-ocean-500" />
            Practical Craft
          </div>
          <h3 className="text-xl font-bold tracking-tight text-forest-950 dark:text-forest-50">
            Builder Notes
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-forest-800/75 dark:text-forest-100/70">
            Real-world patterns, engineering perspectives, and craft principles tested in practice.
          </p>
        </Card>

        <Card variant="flat" tone="violet" className="space-y-3 border-t-2 border-t-violet-500">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            Open Access
          </div>
          <h3 className="text-xl font-bold tracking-tight text-forest-950 dark:text-forest-50">
            Reader Experience
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-forest-800/75 dark:text-forest-100/70">
            Built for mobile responsiveness, battery friendliness, and instant speed across every device.
          </p>
        </Card>
      </section>
    </div>
  );
}
