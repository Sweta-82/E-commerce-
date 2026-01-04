import React from 'react';
import { useSelector } from 'react-redux';

function Pagination({
  currentPage,
  onPageChange,
  nextPageText = "Next",
  prevPageText = "Prev",
  firstPageText = '1st',
  lastPageText = 'Last'
}) {
  const { totalPages, products } = useSelector((state) => state.product);

  if (!products || products.length === 0 || totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;

    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {/* first & prev */}
      {currentPage > 1 && (
        <>
          <button
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => onPageChange(1)}
          >
            {firstPageText}
          </button>
          <button
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => onPageChange(currentPage - 1)}
          >
            {prevPageText}
          </button>
        </>
      )}

      {/* page numbers */}
      {getPageNumbers().map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 text-sm font-medium border rounded 
            ${currentPage === number
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
        >
          {number}
        </button>
      ))}

      {/*   next & last */}
      {currentPage < totalPages && (
        <>
          <button
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => onPageChange(currentPage + 1)}
          >
            {nextPageText}
          </button>
          <button
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => onPageChange(totalPages)}
          >
            {lastPageText}
          </button>
        </>
      )}
    </div>
  );
}

export default Pagination;
