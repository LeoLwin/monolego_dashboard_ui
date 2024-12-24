// eslint-disable-next-line react/prop-types
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message = null }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-4">Confirm Action</h3>
        <p className="text-gray-700 mb-6">
          {message ? message : "Are you sure you want to proceed?"}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
