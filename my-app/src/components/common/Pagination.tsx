import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button key={index + 1} onClick={() => onPageChange(index + 1)} disabled={currentPage === index + 1}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
