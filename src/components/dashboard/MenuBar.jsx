import { useState } from "react";
import { useAuth } from "../../AuthContext";
import ConfirmationModal from "../models/ConfirmationModal";

// eslint-disable-next-line react/prop-types
const Menubar = ({ onMenuClick, onProductClick }) => {
  const [showButton, setShowButton] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { userData, logout } = useAuth();
  console.log(userData);
  const showButtonAction = (data) => {
    setShowButton(data);
    console.log("showButton : ", showButton);
  };
  return (
    <>
      {showModal && (
        <div className="">
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              logout();
            }}
            message={"Log out?"}
          />
        </div>
      )}

      <div className="flex justify-end">
        <div className="flex flex-col w-full">
          <p className="w-full text-center justify-center font-bold uppercase">
            {userData.username}
          </p>
          <p className="w-full text-center justify-center font-bold uppercase">
            {userData.role_name}
          </p>
        </div>
        <div
          className="p-1 hover:bg-black hover:text-white rounded-full h-8 mr-1"
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(8); // Set view to Product
            showButtonAction(8);
          }}
        >
          <i className="fa fa-key"></i>
        </div>
        <div
          className="p-1 hover:bg-black hover:text-white rounded-full h-8"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <i className="fas fa-power-off"></i>
        </div>
      </div>

      <div className="h-20 flex items-center justify-center shrink mt-3">
        <h3 className="text-xl sm:text-4xl md:text-3xl font-extrabold shrink tracking-widest">
          MENU
        </h3>
      </div>

      {/* Sidebar content */}
      <div className="flex flex-col shrink gap-2">
        {/* Home Menu */}
        <div
          className={`flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0 ${
              showButton === 0
                ? "bg-blue-500 text-white scale-105 border-0"
                : ""
            }`}
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(0); // Set view to Home
            showButtonAction(0);
          }}
        >
          <i className="fa-solid fa-house mt-1"></i>
          <span className="hidden sm:block md:block font-bold">Home</span>
        </div>

        {/* users */}
        {(userData.role_name === "admin" ||
          userData.role_name === "developer" )&& (
            <div
              className={`flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0 ${
              showButton === 7
                ? "bg-blue-500 text-white scale-105 border-0"
                : ""
            }`}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onMenuClick(); // Toggle sidebar on small screens
                }
                onProductClick(7); // Set view to Product
                showButtonAction(7);
              }}
            >
              <i className="fa-solid fa-user"></i>
              <span className="hidden sm:block md:block font-bold">
                Users
              </span>
            </div>
          )}

        {/* Product Menu */}
        {(userData.role_name === "admin" ||
          userData.role_name === "developer") && (
            <div
              className={`flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0 ${
              showButton === 1
                ? "bg-blue-500 text-white scale-105 border-0"
                : ""
            }`}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onMenuClick(); // Toggle sidebar on small screens
                }
                onProductClick(1); // Set view to Product
                showButtonAction(1);
              }}
            >
              <i className="fa-solid fa-shirt mt-1"></i>
              <span className="hidden sm:block md:block font-bold">
                Product
              </span>
            </div>
          )}
        {/* Product Menu */}
        {(userData.role_name === "admin" ||
          userData.role_name === "developer" )&& (
            <div
              className={`flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0 ${
              showButton === 2
                ? "bg-blue-500 text-white scale-105 border-0"
                : ""
            }`}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onMenuClick(); // Toggle sidebar on small screens
                }
                onProductClick(2); // Set view to Product
                showButtonAction(2);
              }}
            >
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
              <span className="hidden sm:block md:block font-bold">
                Transaction
              </span>
            </div>
          )}
        {/* Saleable Products */}
        {(userData.role_name === "admin" ||
          userData.role_name === "developer") && (
            <div
              className={`flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0 ${
              showButton === 3
                ? "bg-blue-500 text-white scale-105 border-0"
                : ""
            }`}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onMenuClick(); // Toggle sidebar on small screens
                }
                onProductClick(3); // Set view to Product
                showButtonAction(3);
              }}
            >
              {/* <i className="fa-solid fa-arrow-right-arrow-left text-xl"></i> */}
              <i className="fa-solid fa-shirt text-xl"></i>
              <span className="hidden sm:block md:block font-bold text-lg">
                Saleable Products
              </span>
            </div>
          )}

        <div
          className={`flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
          transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0 ${
            showButton === 4 ? "bg-blue-500 text-white scale-105 border-0" : ""
          }`}
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(4); // Set view to Product
            showButtonAction(4);
          }}
        >
          {/* <i className="fa-solid fa-arrow-right-arrow-left text-xl"></i> */}
          <i className="fas fa-shopping-bag text-xl"></i>
          <span className="hidden sm:block md:block font-bold text-lg">
            Our Products
          </span>
        </div>

        {/* {userData.role === "admin" && ( */}
        <div
          className={`flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
          transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0 ${
            showButton === 5 ? "bg-blue-500 text-white scale-105 border-0" : ""
          }`}
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(5); // Set view to Product
            showButtonAction(5);
          }}
        >
          {/* <i className="fa-solid fa-arrow-right-arrow-left text-xl"></i> */}
          <i className="fas fa-shopping-cart"></i>

          <span className="hidden sm:block md:block font-bold text-lg">
            Check Orders
          </span>
        </div>
        {/* )} */}

        {/* CheckOnHold */}
        {/* {userData.role === "admin" && ( */}
        <div
          className={`flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
          transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0 ${
            showButton === 6 ? "bg-blue-500 text-white scale-105 border-0" : ""
          }`}
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(6); // Set view to Product
            showButtonAction(6);
          }}
        >
          <i className="fa-solid fa-hand-holding"></i>
          <span className="hidden sm:block md:block font-bold text-lg">
            Check Holders
          </span>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Menubar;
