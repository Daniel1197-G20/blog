import React from "react";

export interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  className = "",
  label = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`} role="status">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-forest-600 border-t-transparent`}
        aria-hidden="true"
      />
      {label && <span className="mt-2 text-sm text-forest-800/70 dark:text-forest-100/70">{label}</span>}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Loader;
