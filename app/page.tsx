"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PostList from "@/components/blog/PostList/PostList";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchPostsRequest } from "@/store/slices/postsSlice";
import { selectPostsState } from "@/store/selectors/postsSelectors";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { posts, isLoading, error } = useAppSelector(selectPostsState);
  const [query, setQuery] = useState("");
  useEffect(() => { dispatch(fetchPostsRequest({ limit: 6, skip: 0 })); }, [dispatch]);
  const submitSearch = (event: FormEvent) => { event.preventDefault(); router.push(`/blog${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`); };

  return <div className="space-y-20 py-6 sm:py-10">
    <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
      <div className="max-w-2xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-forest-700 dark:text-forest-300">A quieter corner of the internet</p>
        <h1 className="text-5xl font-bold leading-[1.04] tracking-[-0.055em] text-forest-950 sm:text-6xl dark:text-forest-50">Thoughtful stories for a more curious life.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-forest-800/75 dark:text-forest-100/70">Explore practical ideas, creative work, and the small observations that make technology and everyday life more meaningful.</p>
        <form onSubmit={submitSearch} className="mt-8 flex max-w-lg rounded-2xl border border-forest-900/15 bg-white p-1.5 shadow-sm dark:border-forest-100/15 dark:bg-forest-900/40">
          <label htmlFor="home-search" className="sr-only">Search articles</label><input id="home-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the journal" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-forest-800/45 dark:text-forest-50" />
          <button className="rounded-xl bg-forest-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-800 active:scale-[0.98]">Search</button>
        </form>
      </div>
      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] bg-forest-100 shadow-xl shadow-forest-950/10"><div className="aspect-[4/5] sm:aspect-[5/4]"><Image src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1500&q=85" alt="Sunlight through a dense forest" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /></div><div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-forest-800 backdrop-blur">Read slowly. Think deeply.</div></div>
    </section>
    <section aria-labelledby="featured-heading"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">From the journal</p><h2 id="featured-heading" className="mt-2 text-3xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50">Featured reading</h2></div><Link href="/blog" className="text-sm font-bold text-forest-700 hover:text-forest-900 dark:text-forest-300">Browse all articles <span aria-hidden="true">→</span></Link></div><PostList posts={posts} isLoading={isLoading} error={error} onRetry={() => dispatch(fetchPostsRequest({ limit: 6, skip: 0 }))} /></section>
    <section className="grid gap-px overflow-hidden rounded-2xl border border-forest-900/10 bg-forest-900/10 sm:grid-cols-3 dark:border-forest-100/10"><div className="bg-white p-6 dark:bg-forest-950"><p className="text-2xl font-bold text-forest-800">Thoughtful</p><p className="mt-2 text-sm leading-6 text-forest-800/70 dark:text-forest-100/70">Ideas selected for clarity, not noise.</p></div><div className="bg-white p-6 dark:bg-forest-950"><p className="text-2xl font-bold text-forest-800">Practical</p><p className="mt-2 text-sm leading-6 text-forest-800/70 dark:text-forest-100/70">Useful perspective for modern builders.</p></div><div className="bg-white p-6 dark:bg-forest-950"><p className="text-2xl font-bold text-forest-800">Open</p><p className="mt-2 text-sm leading-6 text-forest-800/70 dark:text-forest-100/70">A growing collection for curious people.</p></div></section>
  </div>;
}
