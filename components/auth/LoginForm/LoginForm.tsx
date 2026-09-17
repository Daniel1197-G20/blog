"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button/Button";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectAuthState } from "@/store/selectors/authSelectors";
import { loginRequest, clearAuthError } from "@/store/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, isAuthenticated, error } = useAppSelector(selectAuthState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearAuthError());
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(searchParams.get("next") || "/dashboard");
    }
  }, [isAuthenticated, router, searchParams]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      return setValidation("Enter both your username and password.");
    }
    setValidation("");
    dispatch(loginRequest({ username: username.trim(), password }));
  };
  return (
    <div className="mt-10 space-y-7 sm:mt-12">
      <div>
        <h1 className="text-4xl font-bold tracking-[-0.055em] text-forest-950 dark:text-forest-50">Welcome back</h1>
        <p className="mt-3 text-[0.95rem] leading-6 text-forest-800/70 dark:text-forest-100/70">Sign in to your account to continue.</p>
      </div>
      {(error || validation) && <ErrorMessage message={error || validation} className="border-red-200 bg-red-50/80" />}
      <form className="space-y-5" onSubmit={submit} noValidate>
        <div className="space-y-2"><label htmlFor="username" className="block text-sm font-semibold text-forest-900 dark:text-forest-100">Username</label><div className="relative"><span className="pointer-events-none absolute inset-y-0 left-4 grid place-items-center text-forest-700/60" aria-hidden="true"><svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8"><circle cx="12" cy="8" r="3.25"/><path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5" strokeLinecap="round"/></svg></span><input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="e.g. emilys" autoComplete="username" disabled={isLoading} className="block w-full rounded-xl border border-forest-900/15 bg-white py-3.5 pl-11 pr-4 text-sm text-forest-950 outline-none transition placeholder:text-forest-800/40 focus:border-forest-600 focus:ring-4 focus:ring-forest-100 disabled:cursor-not-allowed disabled:bg-forest-50 dark:border-forest-100/15 dark:bg-forest-950 dark:text-forest-50" aria-invalid={Boolean(validation)} aria-describedby={validation ? "login-error" : undefined}/></div></div>
        <div className="space-y-2"><label htmlFor="password" className="block text-sm font-semibold text-forest-900 dark:text-forest-100">Password</label><div className="relative"><span className="pointer-events-none absolute inset-y-0 left-4 grid place-items-center text-forest-700/60" aria-hidden="true"><svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round"/></svg></span><input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" disabled={isLoading} className="block w-full rounded-xl border border-forest-900/15 bg-white py-3.5 pl-11 pr-16 text-sm text-forest-950 outline-none transition placeholder:text-forest-800/40 focus:border-forest-600 focus:ring-4 focus:ring-forest-100 disabled:cursor-not-allowed disabled:bg-forest-50 dark:border-forest-100/15 dark:bg-forest-950 dark:text-forest-50" aria-invalid={Boolean(validation)} aria-describedby={validation ? "login-error" : undefined}/><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-3 rounded-md px-2 text-xs font-bold text-forest-700 hover:text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div></div>
        <div className="flex items-center gap-2.5 text-sm text-forest-800/75 dark:text-forest-100/75"><input type="checkbox" checked readOnly tabIndex={-1} aria-label="Remember me is enabled by the existing session policy" className="h-4 w-4 rounded border-forest-900/25 text-forest-700 focus:ring-forest-500"/><span>Remember me on this device</span></div>
        <Button type="submit" className="h-12 w-full rounded-xl bg-forest-800 text-sm font-semibold hover:bg-forest-900" disabled={isLoading}>{isLoading ? <><svg className="mr-2 h-4 w-4 animate-spin fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="8" className="opacity-25"/><path d="M20 12a8 8 0 0 0-8-8" strokeLinecap="round"/></svg>Signing in…</> : "Login"}</Button>
      </form>
      <p className="text-center text-sm text-forest-800/70 dark:text-forest-100/70">Don&apos;t have an account? <Link href="/signup" className="font-bold text-forest-700 hover:text-forest-900 hover:underline dark:text-forest-300">Sign up</Link></p>
      <p className="text-center text-xs text-forest-800/55 dark:text-forest-100/55">Use a DummyJSON demo account to sign in.</p>
    </div>
  );
};

export default LoginForm;
