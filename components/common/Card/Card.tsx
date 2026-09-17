import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`rounded-xl border border-forest-900/10 bg-white p-6 shadow-sm dark:border-forest-100/10 dark:bg-forest-900/40 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
