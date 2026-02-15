/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
type PaginationProps = {
  totalUsers: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalUsers,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {

  const totalPages = Math.ceil(totalUsers / pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  
const rangeSize = 6;
  const [pageRange, setPageRange] = useState({ start: 0, end: rangeSize });


  useEffect(() => {
    // forward
    if (currentPage === pageRange.end && pageRange.end < totalPages) {
      const newStart = pageRange.end - 1;
      const newEnd = Math.min(pageRange.end + (rangeSize - 1), totalPages);
      setPageRange({ start: newStart, end: newEnd });
    }
    // backward
    else if (currentPage === pageRange.start + 1 && pageRange.start > 0) {
      const newStart = Math.max(0, pageRange.start - (rangeSize - 1));
      const newEnd = newStart + rangeSize;
      setPageRange({ start: newStart, end: newEnd });
    }
    // end
    else if (currentPage === totalPages) {
      const newStart = Math.max(0, totalPages - rangeSize);
      const newEnd = totalPages;
      setPageRange({ start: newStart, end: newEnd });
    }

  }, [currentPage, totalPages]);


  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-gray-300 hover:bg-sky-600 rounded-full disabled:opacity-50"
      >
        <Icon icon="mdi-arrow-left" />
      </button>


      {pageRange.start > 0 && <button>...</button>} {/*  6 11 16 */}
      {pages.slice(pageRange.start, pageRange.end).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-full ${page === currentPage ? "bg-sky-600 text-white" : "bg-gray-300"
            }`}
        >
          {page}
        </button>
      ))}
      {pageRange.end < totalPages && <button>...</button>}  {/* 6 11 16 */}



      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-gray-300 hover:bg-sky-600 rounded-full disabled:opacity-50"
      >
        <Icon icon="mdi-arrow-right" />
      </button>
    </div>
  );
}


//