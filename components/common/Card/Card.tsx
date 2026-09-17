import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "flat" | "inset" | "glass" | "plain";
  tone?: "neutral" | "amber" | "ocean" | "violet" | "terracotta" | "forest" | "moss" | "sage" | "spruce";
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "flat",
  tone = "neutral",
  interactive = false,
  ...props
}) => {
  const toneStyles = {
    neutral:
      "border-white/70 bg-[#ebf1ee] dark:border-forest-700/40 dark:bg-[#0f251e]",
    amber:
      "border-amber-200/80 bg-[#fbf7ee] dark:border-amber-500/35 dark:bg-gradient-to-b dark:from-amber-950/40 dark:to-[#0f251e]",
    ocean:
      "border-ocean-200/80 bg-[#f0faf7] dark:border-ocean-500/35 dark:bg-gradient-to-b dark:from-ocean-950/40 dark:to-[#0f251e]",
    violet:
      "border-violet-200/80 bg-[#f7f4fc] dark:border-violet-500/35 dark:bg-gradient-to-b dark:from-violet-950/40 dark:to-[#0f251e]",
    terracotta:
      "border-terracotta-200/80 bg-[#fdf5f3] dark:border-terracotta-500/35 dark:bg-gradient-to-b dark:from-terracotta-950/40 dark:to-[#0f251e]",
    forest:
      "border-forest-200/80 bg-[#ebf3ee] dark:border-forest-600/40 dark:bg-gradient-to-b dark:from-forest-900/40 dark:to-[#0f251e]",
    moss:
      "border-moss-200/80 bg-[#f5f7f2] dark:border-moss-600/35 dark:bg-gradient-to-b dark:from-moss-950/40 dark:to-[#0f251e]",
    sage:
      "border-sage-200/80 bg-[#f4f7f5] dark:border-sage-600/35 dark:bg-gradient-to-b dark:from-sage-950/40 dark:to-[#0f251e]",
    spruce:
      "border-spruce-200/80 bg-[#f0f6f4] dark:border-spruce-600/35 dark:bg-gradient-to-b dark:from-spruce-950/40 dark:to-[#0f251e]",
  };

  const variantStyles = {
    flat: `rounded-2xl border shadow-neu-flat dark:shadow-neu-flat-dark ${toneStyles[tone]}`,
    inset: "rounded-2xl border border-transparent bg-[#e4eae6] shadow-neu-inset dark:bg-[#071914] dark:shadow-neu-inset-dark",
    glass: "neu-glass rounded-2xl",
    plain: "rounded-2xl border border-forest-900/10 bg-white dark:border-forest-700/30 dark:bg-[#0b1e18]",
  };

  const interactiveStyle = interactive
    ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-neu-flat-hover dark:hover:shadow-neu-flat-dark-hover"
    : "";

  return (
    <div
      className={`${variantStyles[variant]} ${interactiveStyle} p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
