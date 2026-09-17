"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  size = "md",
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    const placeholderSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
    return <div className={`${placeholderSize} rounded-xl`} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  const sizeClasses =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : "h-10 w-10 text-sm";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`grid place-items-center rounded-xl neu-flat-interactive border border-white/70 dark:border-forest-700/40 text-forest-800 dark:text-forest-200 focus:outline-none focus:ring-2 focus:ring-forest-500 ${sizeClasses} ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        // Sun icon for dark mode
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // Moon icon for light mode
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
