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

  const fillDemo = () => {
    setUsername("emilys");
    setPassword("emilyspass");
    setValidation("");
  };

  return (
    <div className="mt-7 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-forest-800/75 dark:text-forest-100/75">
          Sign in to access your journal & reader space.
        </p>
      </div>

      {(error || validation) && (
        <ErrorMessage
          message={error || validation}
          className="border-terracotta-200 bg-terracotta-50/90 dark:border-terracotta-800/50 dark:bg-terracotta-950/70"
        />
      )}

      <form className="space-y-4" onSubmit={submit} noValidate>
        <div className="space-y-1.5">
          <label
            htmlFor="username"
            className="block text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100"
          >
            Username
          </label>
          <div className="relative">
            <span
              className="pointer-events-none absolute inset-y-0 left-3.5 grid place-items-center text-forest-700/60 dark:text-forest-300/60"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5" strokeLinecap="round" />
              </svg>
            </span>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="e.g. emilys"
              autoComplete="username"
              disabled={isLoading}
              className="block w-full rounded-xl border border-white/60 bg-[#e4eae6]/90 py-3 pl-10 pr-4 text-base sm:text-sm text-forest-950 shadow-neu-inset outline-none transition placeholder:text-forest-800/45 focus:border-forest-600 focus:bg-white focus:ring-4 focus:ring-forest-500/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-forest-700/40 dark:bg-[#071914]/90 dark:text-forest-50 dark:shadow-neu-inset-dark dark:placeholder:text-forest-200/40 dark:focus:border-forest-400 dark:focus:bg-[#0d271f]"
              aria-invalid={Boolean(validation)}
              aria-describedby={validation ? "login-error" : undefined}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="text-xs font-semibold text-forest-700 hover:text-forest-950 focus:outline-none dark:text-forest-300 dark:hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <span
              className="pointer-events-none absolute inset-y-0 left-3.5 grid place-items-center text-forest-700/60 dark:text-forest-300/60"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
              className="block w-full rounded-xl border border-white/60 bg-[#e4eae6]/90 py-3 pl-10 pr-12 text-base sm:text-sm text-forest-950 shadow-neu-inset outline-none transition placeholder:text-forest-800/45 focus:border-forest-600 focus:bg-white focus:ring-4 focus:ring-forest-500/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-forest-700/40 dark:bg-[#071914]/90 dark:text-forest-50 dark:shadow-neu-inset-dark dark:placeholder:text-forest-200/40 dark:focus:border-forest-400 dark:focus:bg-[#0d271f]"
              aria-invalid={Boolean(validation)}
              aria-describedby={validation ? "login-error" : undefined}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-forest-800/75 dark:text-forest-100/75 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-forest-900/25 text-forest-700 focus:ring-forest-500 dark:border-forest-600/40 dark:bg-[#071914] dark:checked:bg-forest-600"
            />
            <span>Remember this device</span>
          </label>
          <button
            type="button"
            onClick={fillDemo}
            className="rounded-md bg-amber-100 px-2 py-0.5 font-semibold text-amber-900 hover:bg-amber-200 dark:bg-amber-950/70 dark:text-amber-200 dark:border dark:border-amber-600/40 transition"
          >
            Use demo login
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="8" className="opacity-25" />
                <path d="M20 12a8 8 0 0 0-8-8" strokeLinecap="round" />
              </svg>
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="border-t border-forest-900/10 dark:border-forest-100/10 pt-4 text-center text-xs text-forest-800/70 dark:text-forest-100/70">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-forest-700 hover:underline dark:text-forest-300"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
