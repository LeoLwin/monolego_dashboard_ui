/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Table = ({
  columns,
  data,
  rowsPerPage = 5, // Default rows per page
  initialPage = 1, // Initial page (default to 1)
  onActionClick,
  onPageChange, // Callback for external page change handling
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageLimit, setPageLimit] = useState(rowsPerPage);

  // Calculate the start and end index for slicing the data
  const indexOfLastRow = currentPage * pageLimit;
  console.log("indexOfLastRow : ", indexOfLastRow);
  const indexOfFirstRow = indexOfLastRow - pageLimit;
  console.log("indexOfFirstRow : ", indexOfFirstRow);
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  console.log("currentRows", currentRows);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / pageLimit);
  console.log("totalPages : ", totalPages);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (onPageChange) {
        onPageChange(page); // Notify parent about the page change
      }
    }
  };

  // Update page limit dynamically
  useEffect(() => {
    setPageLimit(rowsPerPage);
  }, [rowsPerPage]);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return (
    <div className="overflow-x-auto w-full max-w-full">
      <table className="table-auto w-full border-collapse text-xs sm:text-sm md:text-base">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-2 sm:px-4 py-2 border-b text-left border-slate-400"
              >
                {column.Header}
              </th>
            ))}
            <th className="px-2 sm:px-4 py-2 border-b text-left border-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-2 sm:px-4 py-2 border-b border-slate-400"
                >
                  {row[column.accessor]}
                </td>
              ))}
              <td className="px-2 sm:px-4 py-2 border-b border-slate-400">
                <button
                  onClick={() => onActionClick(row, "edit")}
                  className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded text-xs sm:text-sm mr-2"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => onActionClick(row, "delete")}
                  className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded text-xs sm:text-sm"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 shrink">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
