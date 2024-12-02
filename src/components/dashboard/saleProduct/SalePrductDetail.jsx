export const SalePrductDetail = ({ data, onClose }) => {
  console.log("SaleProductDetail : ", data);
  return (
    <>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
          {data ? (
            <div>
              {Object.entries(data).map(([key, value]) => (
                <p key={key} className="mb-2">
                  <strong>{key.replace(/_/g, " ")}:</strong> {value || "0"}
                </p>
              ))}
            </div>
          ) : (
            <p>No details available.</p>
          )}
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
