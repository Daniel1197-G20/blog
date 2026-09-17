"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectAuthState } from "@/store/selectors/authSelectors";
import { logoutRequest } from "@/store/slices/authSlice";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(selectAuthState);
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    ["Home", "/"],
    ["Blog", "/blog"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ] as const;

  const logout = () => {
    dispatch(logoutRequest());
    setOpen(false);
    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest-900/10 bg-[#f2f5f3]/90 backdrop-blur-md dark:border-forest-800/40 dark:bg-[#081411]/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500 rounded-xl p-1"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-forest-700 text-sm font-bold text-white shadow-neu-flat-sm transition-transform group-hover:scale-105">
              F
            </span>
            <span>
              Forest<span className="text-forest-600 dark:text-forest-400">Blog</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
          <div className="flex items-center gap-1 rounded-2xl bg-[#e6ece8]/70 dark:bg-[#0f251e]/80 p-1 border border-white/60 dark:border-forest-700/40 shadow-neu-inset-sm dark:shadow-neu-inset-dark">
            {links.map(([label, href]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-all ${
                    active
                      ? "bg-white text-forest-900 shadow-neu-flat-sm dark:bg-[#16382c] dark:text-forest-50 dark:shadow-neu-flat-dark dark:border dark:border-forest-600/30"
                      : "text-forest-900/70 hover:text-forest-950 dark:text-forest-100/70 dark:hover:text-forest-50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="ml-4 flex items-center gap-3">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="grid h-10 w-10 place-items-center rounded-xl neu-flat-interactive border border-white/70 dark:border-forest-800/30 text-forest-800 dark:text-forest-200 focus:outline-none focus:ring-2 focus:ring-forest-500"
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
              >
                {resolvedTheme === "dark" ? (
                  // Sun icon
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <path strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  // Moon icon
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className={`rounded-xl px-3.5 py-1.5 text-sm font-semibold transition ${
                    pathname === "/dashboard"
                      ? "text-forest-700 dark:text-forest-300 font-bold"
                      : "text-forest-900/75 hover:text-forest-950 dark:text-forest-100/75 dark:hover:text-forest-50"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-xl neu-flat-interactive border border-white/70 py-1.5 pl-2 pr-3.5 text-sm font-semibold text-forest-900 dark:border-forest-800/40 dark:text-forest-100"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-forest-700 text-xs font-bold text-white shadow-sm">
                    {user?.firstName?.[0] ?? user?.username?.[0] ?? "U"}
                  </span>
                  <span>{user?.firstName ?? user?.username}</span>
                  <span className="sr-only">, log out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex min-h-[40px] items-center rounded-xl bg-forest-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-forest-950/20 transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 active:scale-[0.98]"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile controls: Theme toggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-xl neu-flat-sm border border-white/60 dark:border-forest-800/30 text-forest-800 dark:text-forest-200"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-xl neu-flat-sm border border-white/60 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 dark:border-forest-800/30 dark:text-forest-50"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? (
              <span className="text-2xl font-light leading-none">×</span>
            ) : (
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-3 rounded-full bg-current" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          className="border-t border-forest-900/10 bg-[#f2f5f3]/95 px-4 py-4 md:hidden dark:border-forest-800/40 dark:bg-[#081411]/95 backdrop-blur-md"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1.5">
            {links.map(([label, href]) => (
              <Link
                key={href}
                onClick={() => setOpen(false)}
                href={href}
                className={`min-h-[44px] flex items-center rounded-xl px-4 text-base font-semibold transition-all ${
                  pathname === href
                    ? "bg-white text-forest-900 shadow-neu-flat-sm dark:bg-[#16382c] dark:text-forest-50"
                    : "text-forest-900/80 hover:bg-forest-100/50 dark:text-forest-100/80 dark:hover:bg-forest-900/40"
                }`}
              >
                {label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  href="/dashboard"
                  className={`min-h-[44px] flex items-center rounded-xl px-4 text-base font-semibold ${
                    pathname === "/dashboard"
                      ? "bg-white text-forest-900 shadow-neu-flat-sm dark:bg-forest-900 dark:text-forest-50"
                      : "text-forest-900/80 dark:text-forest-100/80"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="min-h-[44px] flex items-center rounded-xl px-4 text-left text-base font-semibold text-terracotta-600 dark:text-terracotta-400"
                >
                  Logout ({user?.firstName ?? user?.username})
                </button>
              </>
            ) : (
              <Link
                onClick={() => setOpen(false)}
                href="/login"
                className="mt-2 min-h-[44px] flex items-center justify-center rounded-xl bg-forest-700 px-4 text-center text-base font-semibold text-white shadow-md shadow-forest-950/20"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
