"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectAuthState } from "@/store/selectors/authSelectors";
import { logoutRequest } from "@/store/slices/authSlice";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(selectAuthState);
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "/"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"],
  ] as const;
  const logout = () => { dispatch(logoutRequest()); setOpen(false); router.push("/"); };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest-900/10 bg-[#f7f8f5]/85 backdrop-blur-md dark:border-forest-100/10 dark:bg-forest-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50">
            Forest<span className="text-forest-600 dark:text-forest-300">Blog</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className={`text-sm font-semibold transition-colors hover:text-forest-600 ${pathname === href ? "text-forest-700" : "text-forest-900/70 dark:text-forest-100/75"}`}>{label}</Link>)}
          {isAuthenticated ? <><Link href="/dashboard" className="text-sm font-semibold text-forest-700">Dashboard</Link><button onClick={logout} className="flex items-center gap-2 rounded-full bg-forest-100 py-1.5 pl-1.5 pr-3 text-sm font-semibold text-forest-900 transition hover:bg-forest-200"><span className="grid h-7 w-7 place-items-center rounded-full bg-forest-700 text-xs text-white">{user?.firstName?.[0] ?? user?.username?.[0] ?? "U"}</span>{user?.firstName ?? user?.username}<span className="sr-only">, log out</span></button></> : <Link href="/login" className="rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 active:scale-[0.98]">Login</Link>}
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-lg text-forest-900 hover:bg-forest-100 md:hidden dark:text-forest-50" aria-label="Toggle navigation" aria-expanded={open}>{open ? <span className="text-xl">×</span> : <span className="space-y-1"><span className="block h-0.5 w-5 bg-current"/><span className="block h-0.5 w-5 bg-current"/><span className="block h-0.5 w-5 bg-current"/></span>}</button>
      </div>
      {open && <nav className="border-t border-forest-900/10 bg-[#f8faf9] px-4 py-4 md:hidden dark:bg-forest-950" aria-label="Mobile navigation"><div className="mx-auto flex max-w-7xl flex-col gap-1">{links.map(([label, href]) => <Link key={href} onClick={() => setOpen(false)} href={href} className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${pathname === href ? "bg-forest-100 text-forest-800" : "text-forest-900 dark:text-forest-100"}`}>{label}</Link>)}{isAuthenticated ? <><Link onClick={() => setOpen(false)} href="/dashboard" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-forest-900 dark:text-forest-100">Dashboard</Link><button onClick={logout} className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-forest-900 dark:text-forest-100">Logout</button></> : <Link onClick={() => setOpen(false)} href="/login" className="mt-2 rounded-lg bg-forest-700 px-3 py-2.5 text-center text-sm font-semibold text-white">Login</Link>}</div></nav>}
    </header>
  );
};

export default Navbar;
