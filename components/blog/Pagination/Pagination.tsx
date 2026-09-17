"use client";

import React from "react";
import Button from "@/components/common/Button/Button";

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
}) => {
  return (
    <nav
      className="flex items-center justify-center gap-3 py-8"
      aria-label="Pagination navigation"
    >
      <Button
        variant="neu"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
      >
        <span aria-hidden="true">←</span> Previous
      </Button>

      <span className="rounded-xl neu-inset px-4 py-2 text-xs sm:text-sm font-semibold text-forest-800 dark:text-forest-100">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="neu"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        aria-label="Go to next page"
      >
        Next <span aria-hidden="true">→</span>
      </Button>
    </nav>
  );
};

export default Pagination;
