"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/common/Card/Card";
import Loader from "@/components/common/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectAuthState } from "@/store/selectors/authSelectors";
import { logoutRequest } from "@/store/slices/authSlice";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(selectAuthState);
  const [checkingSession, setCheckingSession] = useState(true);

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

  if (checkingSession || isLoading || !isAuthenticated) return <Loader label="Checking your session…" className="min-h-[55dvh]" />;
  const logout = () => { dispatch(logoutRequest()); router.push("/"); };
  return (
    <div className="grid gap-6 py-2 lg:grid-cols-[230px_1fr]"><aside className="rounded-2xl bg-forest-900 p-5 text-forest-50 lg:min-h-[calc(100dvh-10rem)]"><p className="text-lg font-bold tracking-[-0.04em]">ForestBlog</p><nav className="mt-10 space-y-1" aria-label="Dashboard navigation">{["Dashboard", "My posts", "Comments", "Settings"].map((item, index) => <button key={item} className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${index === 0 ? "bg-white/15 text-white" : "text-forest-100/75 hover:bg-white/10 hover:text-white"}`}>{item}</button>)}<button onClick={logout} className="mt-5 block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-forest-100/75 hover:bg-white/10 hover:text-white">Logout</button></nav></aside><main className="space-y-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">Your space</p><h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] text-forest-950 dark:text-forest-50">Hello{user?.firstName ? `, ${user.firstName}` : " Admin"}.</h1><p className="mt-2 text-forest-800/70 dark:text-forest-100/70">Here&apos;s a quiet overview of your ForestBlog account.</p></div><div className="grid gap-4 sm:grid-cols-3">{[["Profile", user?.email ?? "Connected"],["Account", "Active"],["Role", "Reader"]].map(([label, value]) => <Card key={label}><p className="text-sm font-semibold text-forest-800/65 dark:text-forest-100/65">{label}</p><p className="mt-3 truncate text-xl font-bold text-forest-950 dark:text-forest-50">{value}</p></Card>)}</div><Card><h2 className="text-xl font-bold tracking-[-0.025em] text-forest-950 dark:text-forest-50">Your dashboard is ready</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-forest-800/70 dark:text-forest-100/70">Authentication is active and this route is protected by middleware. Content-management features can be added when they are part of the assignment scope.</p></Card></main></div>
  );
}
