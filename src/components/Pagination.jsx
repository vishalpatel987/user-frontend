// src/components/Pagination.jsx
import React from "react";
const Pagination = ({ page, pages, onPageChange }) => (
  <div className="flex justify-center mt-4 gap-2">
    {Array.from({ length: pages }, (_, i) => (
      <button
        key={i+1}
        onClick={() => onPageChange(i+1)}
        className={`px-3 py-1 rounded ${page === i+1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        {i+1}
      </button>
    ))}
  </div>
);
export default Pagination;

