import { useState } from "react";
import { useAuth } from "../../AuthContext";
import ConfirmationModal from "./ConfirmationModal";

const LogoutModal = () => {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="w-full h-full absolute z-index-10">
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            logout();
          }}
          message={"Log out?"}
        />
      </div>
      <div className="flex justify-end z-index-10   ">
        <div
          className="p-1 hover:bg-black hover:text-white rounded-full"
          onClick={() => {
            setShowModal(true);
            console.log("Hello");
          }}
        >
          <i className="fas fa-power-off"></i>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
