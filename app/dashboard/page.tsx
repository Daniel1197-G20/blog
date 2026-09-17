"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Card from "@/components/common/Card/Card";
import Button from "@/components/common/Button/Button";
import { DashboardSkeleton } from "@/components/common/Skeleton/Skeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectAuthState } from "@/store/selectors/authSelectors";
import { logoutRequest } from "@/store/slices/authSlice";

type DashboardTab = "Dashboard" | "Saved Articles" | "Reading History" | "Preferences";

interface SavedItem {
  id: number;
  title: string;
  category: string;
  readTime: string;
  savedDate: string;
  tone: "forest" | "moss" | "amber" | "ocean" | "violet";
}

const DEFAULT_SAVED_ARTICLES: SavedItem[] = [
  {
    id: 1,
    title: "His mother had always taught him not to look at the sun.",
    category: "History",
    readTime: "4 min read",
    savedDate: "Yesterday",
    tone: "amber",
  },
  {
    id: 2,
    title: "He was an expert but not in a discipline that anyone valued.",
    category: "Classic",
    readTime: "3 min read",
    savedDate: "3 days ago",
    tone: "forest",
  },
  {
    id: 3,
    title: "The light at dawn was different from the light at dusk.",
    category: "Nature",
    readTime: "5 min read",
    savedDate: "Last week",
    tone: "moss",
  },
];

const READING_HISTORY = [
  {
    id: 1,
    title: "His mother had always taught him not to look at the sun.",
    category: "History",
    progress: "100% completed",
    date: "Today at 10:14 AM",
  },
  {
    id: 4,
    title: "The day was slow and nothing in particular happened.",
    category: "Life",
    progress: "100% completed",
    date: "Yesterday at 4:32 PM",
  },
  {
    id: 6,
    title: "All he wanted was a simple answer to an obvious question.",
    category: "Mystery",
    progress: "75% read",
    date: "Sep 14, 2026",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(selectAuthState);
  const [checkingSession, setCheckingSession] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>("Dashboard");
  const [copied, setCopied] = useState(false);
  const [savedArticles, setSavedArticles] = useState<SavedItem[]>(DEFAULT_SAVED_ARTICLES);
  const [readingWidth, setReadingWidth] = useState<"standard" | "wide">("standard");
  const [fontSize, setFontSize] = useState<"default" | "relaxed" | "large">("default");
  const [digestEmail, setDigestEmail] = useState(true);
  const [recommendationsEmail, setRecommendationsEmail] = useState(false);
  const [prefSaved, setPrefSaved] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("forestblog_token") : null;
    if (!token && !isAuthenticated) {
      router.replace("/login?next=/dashboard");
    } else {
      setCheckingSession(false);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!checkingSession && !isLoading && !isAuthenticated) {
      const token = typeof window !== "undefined" ? window.localStorage.getItem("forestblog_token") : null;
      if (!token) {
        router.replace("/login?next=/dashboard");
      }
    }
  }, [checkingSession, isLoading, isAuthenticated, router]);

  if (checkingSession || isLoading || !isAuthenticated) {
    return <DashboardSkeleton />;
  }

  const logout = () => {
    dispatch(logoutRequest());
    router.push("/");
  };

  const copyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const removeSaved = (id: number) => {
    setSavedArticles((prev) => prev.filter((item) => item.id !== id));
  };

  const savePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 2500);
  };

  const navItems: { label: DashboardTab; icon: React.ReactNode; badge?: number }[] = [
    {
      label: "Dashboard",
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
        </svg>
      ),
    },
    {
      label: "Saved Articles",
      badge: savedArticles.length,
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      label: "Reading History",
      badge: READING_HISTORY.length,
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
        </svg>
      ),
    },
    {
      label: "Preferences",
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
  ];

  const userInitial = user?.firstName?.[0] ?? user?.username?.[0] ?? "R";
  const userFullName = user?.firstName ? `${user.firstName} ${user.lastName ?? ""}`.trim() : user?.username ?? "Reader";

  return (
    <div className="grid gap-6 py-2 md:grid-cols-[230px_1fr] lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr] items-start">
      {/* Sidebar Navigation - responsive: horizontal segmented tabs on mobile (< md), sticky vertical rail on desktop (md+) */}
      <aside className="w-full">
        {/* Desktop Sticky Rail */}
        <div className="hidden md:flex md:sticky md:top-20 md:h-[calc(100dvh-6.5rem)] rounded-3xl neu-flat p-5 border border-white/70 dark:border-forest-700/40 flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            {/* User identity card */}
            <div className="flex items-center gap-3 px-1">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-forest-700 text-sm font-bold text-white shadow-neu-flat-sm">
                {userInitial}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-forest-950 dark:text-forest-50">
                  {userFullName}
                </p>
                <p className="truncate text-xs text-forest-800/65 dark:text-forest-100/60">
                  @{user?.username ?? "reader"}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="space-y-1.5" aria-label="Dashboard navigation">
              {navItems.map(({ label, icon, badge }) => {
                const active = activeTab === label;
                return (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label)}
                    className={`min-h-[44px] w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-sm font-semibold transition-all ${
                      active
                        ? "bg-forest-700 text-white shadow-md shadow-forest-950/15"
                        : "text-forest-900/75 hover:bg-forest-100/70 hover:text-forest-950 dark:text-forest-100/75 dark:hover:bg-forest-900/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {icon}
                      <span className="truncate">{label}</span>
                    </div>
                    {typeof badge === "number" && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-forest-200/80 text-forest-900 dark:bg-forest-800/60 dark:text-forest-200"
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop Footer Actions */}
          <div className="mt-6 pt-4 border-t border-forest-900/10 dark:border-forest-700/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-forest-800/65 dark:text-forest-100/60 px-1">
              <span>Status</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-forest-700 dark:text-mint-400">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-500 dark:bg-mint-400 animate-pulse" />
                Active Reader
              </span>
            </div>
            <button
              onClick={logout}
              className="min-h-[42px] w-full flex items-center gap-2 rounded-xl px-3.5 py-2 text-left text-xs sm:text-sm font-semibold text-terracotta-600 hover:bg-terracotta-50 dark:text-terracotta-400 dark:hover:bg-terracotta-950/40 transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign out</span>
            </button>
          </div>
        </div>

        {/* Mobile Header + Horizontal Navigation (< md) */}
        <div className="md:hidden space-y-3">
          {/* Compact User Header with logout */}
          <div className="flex items-center justify-between gap-3 rounded-2xl neu-flat p-3.5 border border-white/70 dark:border-forest-700/40">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-700 text-xs font-bold text-white shadow-sm">
                {userInitial}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs sm:text-sm font-bold text-forest-950 dark:text-forest-50">
                  {userFullName}
                </p>
                <p className="truncate text-[11px] text-forest-800/65 dark:text-forest-100/60">
                  @{user?.username ?? "reader"}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-terracotta-600 hover:bg-terracotta-50 dark:text-terracotta-400 dark:hover:bg-terracotta-950/40 transition"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Exit</span>
            </button>
          </div>

          {/* Smooth Horizontal Scrollable Tabs */}
          <nav
            className="flex flex-row overflow-x-auto gap-2 pb-1 scrollbar-none touch-pan-x"
            aria-label="Mobile dashboard navigation"
          >
            {navItems.map(({ label, icon, badge }) => {
              const active = activeTab === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`min-h-[42px] shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all flex items-center gap-2 ${
                    active
                      ? "bg-forest-700 text-white shadow-md shadow-forest-950/15"
                      : "neu-flat-sm border border-white/60 dark:border-forest-700/30 text-forest-900/80 dark:text-forest-100/80"
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                  {typeof badge === "number" && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-forest-200/80 text-forest-900 dark:bg-forest-800 dark:text-forest-200"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area - fully responsive with min-w-0 to prevent layout blowouts */}
      <div className="space-y-6 min-w-0">
        {/* Dynamic Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800 dark:bg-forest-900/60 dark:text-forest-200">
              <span className="h-2 w-2 rounded-full bg-forest-500 animate-pulse" />
              <span>Reader Hub &bull; {activeTab}</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50">
              {activeTab === "Dashboard" && `Welcome, ${user?.firstName ?? "Reader"}.`}
              {activeTab === "Saved Articles" && "Your Bookmarked Reads."}
              {activeTab === "Reading History" && "Recent Journal Timeline."}
              {activeTab === "Preferences" && "Reader Customization."}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-forest-800/75 dark:text-forest-100/70">
              {activeTab === "Dashboard" && "Manage your reading profile, saved stories, and personal journal notes."}
              {activeTab === "Saved Articles" && "Carefully selected stories and notes saved for thoughtful reflection."}
              {activeTab === "Reading History" && "Articles and dispatches you have explored across ForestBlog."}
              {activeTab === "Preferences" && "Tailor your typography, appearance, and newsletter delivery settings."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-forest-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-forest-950/15 hover:bg-forest-800 transition"
            >
              <span>Explore Blog</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === "Dashboard" && (
          <div className="space-y-6">
            {/* Multi-Color Stat Cards - responsive grid: 1 col on small phone, 2 cols on tablet, 3 cols on desktop */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Stat 1: Account Email */}
              <Card
                variant="flat"
                tone="forest"
                className="space-y-2 border-t-2 border-t-forest-600 dark:border-t-forest-400 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-forest-800/65 dark:text-forest-100/65">
                    Account Email
                  </span>
                  <span className="rounded-full bg-forest-100 px-2 py-0.5 text-[10px] font-bold text-forest-800 dark:bg-forest-900/90 dark:text-forest-200 dark:border dark:border-forest-600/40">
                    verified
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="truncate text-base sm:text-lg font-bold text-forest-950 dark:text-forest-50"
                    title={user?.email ?? "reader@forestblog.example"}
                  >
                    {user?.email ?? "reader@forestblog.example"}
                  </p>
                  <button
                    onClick={copyEmail}
                    className="shrink-0 rounded-lg p-1 text-forest-700 hover:bg-forest-200/50 dark:text-forest-300 dark:hover:bg-forest-800/50 transition"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <span className="text-[11px] font-bold text-mint-500">Copied!</span>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </Card>

              {/* Stat 2: Contributor Status */}
              <Card
                variant="flat"
                tone="amber"
                className="space-y-2 border-t-2 border-t-amber-500 dark:border-t-amber-400 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-forest-800/65 dark:text-forest-100/65">
                    Reader Status
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-950/90 dark:text-amber-200 dark:border dark:border-amber-600/40">
                    level 2
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-forest-950 dark:text-forest-50">
                  Active Contributor
                </p>
                <p className="text-xs text-forest-800/70 dark:text-forest-100/60">
                  {savedArticles.length} saved &bull; {READING_HISTORY.length} completed reads
                </p>
              </Card>

              {/* Stat 3: Access Tier */}
              <Card
                variant="flat"
                tone="ocean"
                className="space-y-2 border-t-2 border-t-ocean-500 dark:border-t-ocean-400 p-5 sm:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-forest-800/65 dark:text-forest-100/65">
                    Access Tier
                  </span>
                  <span className="rounded-full bg-ocean-100 px-2 py-0.5 text-[10px] font-bold text-ocean-900 dark:bg-ocean-950/90 dark:text-ocean-200 dark:border dark:border-ocean-600/40">
                    full pass
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-forest-950 dark:text-forest-50">
                  Full Reader Access
                </p>
                <p className="text-xs text-forest-800/70 dark:text-forest-100/60">
                  Unlimited article reads & reader commenting
                </p>
              </Card>
            </div>

            {/* Quick Actions & Recent Reads Highlights */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                variant="flat"
                className="p-5 sm:p-6 space-y-3 border border-white/70 dark:border-forest-700/40"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-forest-950 dark:text-forest-50">
                    Saved Articles
                  </h2>
                  <button
                    onClick={() => setActiveTab("Saved Articles")}
                    className="text-xs font-semibold text-forest-700 hover:underline dark:text-forest-300"
                  >
                    View all ({savedArticles.length}) &rarr;
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-forest-800/75 dark:text-forest-100/70">
                  You have {savedArticles.length} articles saved for later reading. Pick up where you left off.
                </p>
                <div className="space-y-2 pt-1">
                  {savedArticles.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-[#e4eae6]/60 dark:bg-[#071914] p-2.5 text-xs"
                    >
                      <Link
                        href={`/blog/${item.id}`}
                        className="truncate font-semibold text-forest-950 dark:text-forest-50 hover:underline max-w-[80%]"
                      >
                        {item.title}
                      </Link>
                      <span className="shrink-0 text-forest-800/60 dark:text-forest-100/50">
                        {item.readTime}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                variant="flat"
                className="p-5 sm:p-6 space-y-3 border border-white/70 dark:border-forest-700/40"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-forest-950 dark:text-forest-50">
                    Reading Preferences
                  </h2>
                  <button
                    onClick={() => setActiveTab("Preferences")}
                    className="text-xs font-semibold text-forest-700 hover:underline dark:text-forest-300"
                  >
                    Customize &rarr;
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-forest-800/75 dark:text-forest-100/70">
                  Active theme: <strong className="capitalize text-forest-950 dark:text-forest-50">{theme ?? "system"}</strong> &bull; Font scale: <strong className="capitalize text-forest-950 dark:text-forest-50">{fontSize}</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    onClick={() => setTheme("light")}
                    className="rounded-lg neu-flat-sm px-3 py-1.5 text-xs font-semibold border border-white/60 dark:border-forest-700/40 text-forest-900 dark:text-forest-100"
                  >
                    ☀ Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className="rounded-lg neu-flat-sm px-3 py-1.5 text-xs font-semibold border border-white/60 dark:border-forest-700/40 text-forest-900 dark:text-forest-100"
                  >
                    ☾ Dark
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className="rounded-lg neu-flat-sm px-3 py-1.5 text-xs font-semibold border border-white/60 dark:border-forest-700/40 text-forest-900 dark:text-forest-100"
                  >
                    ⚙ System
                  </button>
                </div>
              </Card>
            </div>

            {/* Informative Environment Card */}
            <Card
              variant="flat"
              className="p-5 sm:p-7 space-y-3 border border-white/70 dark:border-forest-700/40"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-forest-100 text-forest-800 dark:bg-forest-900/80 dark:text-forest-200 text-sm font-bold">
                  ✦
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-forest-950 dark:text-forest-50">
                  Reader environment active
                </h2>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-forest-800/75 dark:text-forest-100/70">
                Your session is synchronized with Redux-Saga and secured with local storage authentication tokens. Designed with responsive tactile surfaces for phones, tablets, and 4K desktop environments.
              </p>
            </Card>
          </div>
        )}

        {/* Tab 2: Saved Articles */}
        {activeTab === "Saved Articles" && (
          <div className="space-y-4">
            {savedArticles.length === 0 ? (
              <Card variant="flat" className="p-8 text-center space-y-3">
                <p className="text-base font-semibold text-forest-950 dark:text-forest-50">
                  No saved articles yet
                </p>
                <p className="text-xs sm:text-sm text-forest-800/70 dark:text-forest-100/60 max-w-sm mx-auto">
                  Browse our journal and click the bookmark icon to keep articles handy here.
                </p>
                <Link
                  href="/blog"
                  className="inline-block mt-2 rounded-xl bg-forest-700 px-4 py-2 text-xs font-semibold text-white"
                >
                  Browse articles
                </Link>
              </Card>
            ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {savedArticles.map((article) => (
                  <Card
                    key={article.id}
                    variant="flat"
                    tone={article.tone}
                    className="p-5 flex flex-col justify-between space-y-4 border border-white/60 dark:border-forest-700/40"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-forest-200/80 dark:bg-forest-800/60 px-2.5 py-0.5 text-[11px] font-bold text-forest-900 dark:text-forest-100">
                          {article.category}
                        </span>
                        <span className="text-[11px] text-forest-800/60 dark:text-forest-100/50">
                          Saved {article.savedDate}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-forest-950 dark:text-forest-50 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-forest-800/75 dark:text-forest-100/70">
                        Estimated read: {article.readTime}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-forest-900/10 dark:border-forest-700/30">
                      <Link
                        href={`/blog/${article.id}`}
                        className="inline-flex min-h-[36px] items-center gap-1 text-xs font-bold text-forest-700 hover:text-forest-950 dark:text-forest-300 dark:hover:text-white"
                      >
                        <span>Read Now</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                      <button
                        onClick={() => removeSaved(article.id)}
                        className="text-xs font-semibold text-terracotta-600 hover:underline dark:text-terracotta-400"
                      >
                        Remove
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Reading History */}
        {activeTab === "Reading History" && (
          <Card variant="flat" className="p-5 sm:p-7 space-y-4 border border-white/70 dark:border-forest-700/40">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-forest-950 dark:text-forest-50">
                Completed & In-Progress Reads
              </h2>
              <span className="text-xs text-forest-800/60 dark:text-forest-100/60">
                {READING_HISTORY.length} entries
              </span>
            </div>

            <div className="divide-y divide-forest-900/10 dark:divide-forest-700/30">
              {READING_HISTORY.map((item) => (
                <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-forest-100 dark:bg-forest-900/80 px-2 py-0.5 text-[10px] font-bold text-forest-800 dark:text-forest-200">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-forest-800/60 dark:text-forest-100/50">
                        {item.date}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${item.id}`}
                      className="block truncate text-sm font-semibold text-forest-950 dark:text-forest-50 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <span className="text-xs font-semibold text-forest-700 dark:text-mint-400">
                      {item.progress}
                    </span>
                    <Link
                      href={`/blog/${item.id}`}
                      className="rounded-lg bg-forest-700/10 dark:bg-forest-800/40 px-2.5 py-1 text-xs font-semibold text-forest-800 dark:text-forest-200 hover:bg-forest-700 hover:text-white transition"
                    >
                      Revisit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 4: Preferences */}
        {activeTab === "Preferences" && (
          <form onSubmit={savePreferences} className="space-y-6">
            {/* Appearance theme */}
            <Card variant="flat" className="p-5 sm:p-7 space-y-4 border border-white/70 dark:border-forest-700/40">
              <h2 className="text-lg font-bold text-forest-950 dark:text-forest-50">
                Visual Theme
              </h2>
              <p className="text-xs sm:text-sm text-forest-800/75 dark:text-forest-100/70">
                Select your preferred appearance mode across all ForestBlog surfaces.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`rounded-2xl p-4 text-left border transition-all ${
                    theme === "light"
                      ? "border-forest-700 bg-white shadow-neu-flat-sm dark:bg-forest-900"
                      : "border-white/60 dark:border-forest-700/30 bg-[#e4eae6]/50 dark:bg-[#071914]"
                  }`}
                >
                  <p className="font-bold text-sm text-forest-950 dark:text-forest-50">☀ Light Mode</p>
                  <p className="text-xs text-forest-800/65 dark:text-forest-100/60 mt-1">
                    Morning sunlit canopy with frosted sage tones
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`rounded-2xl p-4 text-left border transition-all ${
                    theme === "dark"
                      ? "border-forest-500 bg-white shadow-neu-flat-sm dark:bg-forest-900"
                      : "border-white/60 dark:border-forest-700/30 bg-[#e4eae6]/50 dark:bg-[#071914]"
                  }`}
                >
                  <p className="font-bold text-sm text-forest-950 dark:text-forest-50">☾ Dark Mode</p>
                  <p className="text-xs text-forest-800/65 dark:text-forest-100/60 mt-1">
                    Deep nocturnal spruce with rich emerald accents
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`rounded-2xl p-4 text-left border transition-all ${
                    theme === "system"
                      ? "border-forest-500 bg-white shadow-neu-flat-sm dark:bg-forest-900"
                      : "border-white/60 dark:border-forest-700/30 bg-[#e4eae6]/50 dark:bg-[#071914]"
                  }`}
                >
                  <p className="font-bold text-sm text-forest-950 dark:text-forest-50">⚙ System Match</p>
                  <p className="text-xs text-forest-800/65 dark:text-forest-100/60 mt-1">
                    Automatically synchronize with your OS schedule
                  </p>
                </button>
              </div>
            </Card>

            {/* Reading Typography & Layout */}
            <Card variant="flat" className="p-5 sm:p-7 space-y-4 border border-white/70 dark:border-forest-700/40">
              <h2 className="text-lg font-bold text-forest-950 dark:text-forest-50">
                Typography & Reading Width
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100">
                    Text Scale
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["default", "relaxed", "large"] as const).map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => setFontSize(scale)}
                        className={`min-h-[42px] rounded-xl text-xs font-semibold capitalize border transition-all ${
                          fontSize === scale
                            ? "bg-forest-700 text-white border-forest-700"
                            : "border-white/60 dark:border-forest-700/30 bg-[#e4eae6]/50 dark:bg-[#071914] text-forest-900 dark:text-forest-100"
                        }`}
                      >
                        {scale}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100">
                    Reading Column Width
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setReadingWidth("standard")}
                      className={`min-h-[42px] rounded-xl text-xs font-semibold border transition-all ${
                        readingWidth === "standard"
                          ? "bg-forest-700 text-white border-forest-700"
                          : "border-white/60 dark:border-forest-700/30 bg-[#e4eae6]/50 dark:bg-[#071914] text-forest-900 dark:text-forest-100"
                      }`}
                    >
                      Focused (Max 3xl)
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadingWidth("wide")}
                      className={`min-h-[42px] rounded-xl text-xs font-semibold border transition-all ${
                        readingWidth === "wide"
                          ? "bg-forest-700 text-white border-forest-700"
                          : "border-white/60 dark:border-forest-700/30 bg-[#e4eae6]/50 dark:bg-[#071914] text-forest-900 dark:text-forest-100"
                      }`}
                    >
                      Expansive (Max 5xl)
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Notification Delivery */}
            <Card variant="flat" className="p-5 sm:p-7 space-y-4 border border-white/70 dark:border-forest-700/40">
              <h2 className="text-lg font-bold text-forest-950 dark:text-forest-50">
                Email Dispatches
              </h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-forest-950 dark:text-forest-50">
                      Weekly Sunday Digest
                    </p>
                    <p className="text-xs text-forest-800/65 dark:text-forest-100/60">
                      Curated roundup of top reflections and craftsmanship notes
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={digestEmail}
                    onChange={(e) => setDigestEmail(e.target.checked)}
                    className="h-4 w-4 rounded border-forest-900/25 text-forest-700 focus:ring-forest-500 dark:border-forest-600/40 dark:bg-[#071914]"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-forest-900/10 dark:border-forest-700/30">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-forest-950 dark:text-forest-50">
                      Editorial Recommendations
                    </p>
                    <p className="text-xs text-forest-800/65 dark:text-forest-100/60">
                      Notified when essays match your reading history tags
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={recommendationsEmail}
                    onChange={(e) => setRecommendationsEmail(e.target.checked)}
                    className="h-4 w-4 rounded border-forest-900/25 text-forest-700 focus:ring-forest-500 dark:border-forest-600/40 dark:bg-[#071914]"
                  />
                </label>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <Button type="submit" variant="primary" size="md">
                  Save Preferences
                </Button>
                {prefSaved && (
                  <span className="text-xs font-semibold text-mint-600 dark:text-mint-400">
                    ✓ Preferences updated successfully
                  </span>
                )}
              </div>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}
