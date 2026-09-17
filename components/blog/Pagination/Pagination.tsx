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
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span className="text-sm text-forest-800/75 dark:text-forest-100/70">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
