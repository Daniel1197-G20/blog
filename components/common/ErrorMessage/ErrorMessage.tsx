"use client";

import React from "react";

export interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = "",
  onRetry,
}) => {
  return (
    <div
      role="alert"
      className={`rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300 ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-3 text-sm font-semibold underline hover:no-underline active:scale-[0.98]"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
