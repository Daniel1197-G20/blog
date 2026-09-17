import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "amber" | "outline" | "danger" | "neu";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-forest-700 text-white shadow-md shadow-forest-950/15 hover:bg-forest-800 focus:ring-forest-500 active:shadow-inner",
    secondary:
      "bg-forest-100 text-forest-950 hover:bg-forest-200 dark:bg-forest-900 dark:text-forest-50 dark:hover:bg-forest-800 focus:ring-forest-400",
    amber:
      "bg-amber-600 text-white shadow-md shadow-amber-950/15 hover:bg-amber-700 focus:ring-amber-500 active:shadow-inner",
    neu:
      "bg-[#ebf1ee] text-forest-900 border border-white/80 shadow-neu-flat-sm hover:shadow-neu-flat active:shadow-neu-inset dark:bg-[#102720] dark:text-forest-50 dark:border-forest-700/40 dark:shadow-neu-flat-dark dark:active:shadow-neu-inset-dark focus:ring-forest-500",
    outline:
      "border border-forest-700/25 text-forest-800 hover:bg-forest-50 dark:border-forest-300/30 dark:text-forest-200 dark:hover:bg-forest-900 focus:ring-forest-500",
    danger:
      "bg-terracotta-600 text-white hover:bg-terracotta-700 focus:ring-terracotta-500",
  };

  const sizeStyles = {
    sm: "min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm",
    md: "min-h-[44px] px-4 py-2.5 text-sm",
    lg: "min-h-[50px] px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
