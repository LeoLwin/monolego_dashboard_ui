import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Table = ({ columns, data, rowsPerPage = 5, onActionClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for slicing the data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-4 py-2 border-b text-left"
              >
                {column.Header}
              </th>
            ))}
            <th className="px-4 py-2 border-b text-left">Actions</th>{" "}
            {/* Action Column */}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor} className="px-4 py-2 border-b">
                  {row[column.accessor]}
                </td>
              ))}
              {/* Action Buttons */}
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => onActionClick(row, "edit")}
                  className="px-2 py-1 text-white bg-blue-500 rounded mr-2"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>

                <button
                  onClick={() => onActionClick(row, "delete")}
                  className="px-2 py-1 text-white bg-red-500 rounded"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded bg-gray-200"
        >
          Prev
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
