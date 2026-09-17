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
  return <div className="space-y-1.5">
    <label htmlFor={inputId} className="block text-sm font-semibold text-forest-900 dark:text-forest-100">{label}</label>
    <input ref={ref} id={inputId} className={`block w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-forest-950 outline-none transition placeholder:text-forest-800/40 focus:border-forest-600 focus:ring-4 focus:ring-forest-100 disabled:cursor-not-allowed disabled:bg-forest-50 dark:border-forest-100/15 dark:bg-forest-950 dark:text-forest-50 dark:focus:ring-forest-900 ${error ? "border-red-500" : "border-forest-900/15"} ${className}`} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined} {...props} />
    {error ? <p id={`${inputId}-error`} className="text-xs font-medium text-red-600">{error}</p> : hint ? <p id={`${inputId}-hint`} className="text-xs text-forest-800/65 dark:text-forest-100/65">{hint}</p> : null}
  </div>;
});

export default Input;
