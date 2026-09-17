import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
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
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

  const variantStyles = {
    primary: "bg-forest-700 text-white hover:bg-forest-800 focus:ring-forest-500",
    secondary: "bg-forest-100 text-forest-950 hover:bg-forest-200 dark:bg-forest-900 dark:text-forest-50 dark:hover:bg-forest-800 focus:ring-forest-400",
    outline: "border border-forest-700/25 text-forest-800 hover:bg-forest-50 dark:border-forest-300/30 dark:text-forest-200 dark:hover:bg-forest-900 focus:ring-forest-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
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
