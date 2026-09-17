import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className = "", ...props },
  ref
) {
  const inputId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-semibold text-forest-900 dark:text-forest-100">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={`block w-full rounded-xl border bg-[#e4eae6] px-4 py-3 text-base sm:text-sm text-forest-950 shadow-neu-inset outline-none transition-all placeholder:text-forest-800/50 focus:border-forest-600 focus:bg-white focus:ring-4 focus:ring-forest-500/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-forest-700/40 dark:bg-[#071914] dark:text-forest-50 dark:shadow-neu-inset-dark dark:placeholder:text-forest-200/40 dark:focus:border-forest-400 dark:focus:bg-[#0d271f] dark:focus:ring-forest-400/20 ${
          error ? "border-terracotta-500 ring-2 ring-terracotta-500/20" : "border-white/60 dark:border-forest-700/40"
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-terracotta-600 dark:text-terracotta-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-forest-800/70 dark:text-forest-100/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
