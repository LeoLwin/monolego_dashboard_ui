// import { useState } from "react";

//
// eslint-disable-next-line react/prop-types
const Menubar = ({ onMenuClick, onProductClick }) => {
  return (
    <>
      <div className="h-20 flex items-center justify-center shrink mt-5">
        <h3 className="text-xl sm:text-4xl md:text3xl font-extrabold shrink tracking-widest">
          MENU
        </h3>
      </div>

      {/* Sidebar content */}
      <div className="flex flex-col shrink gap-2">
        <div
          className="flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
          onClick={window.innerWidth < 1024 ? onMenuClick : null}
        >
          <i className="fa-solid fa-house mt-1"></i>
          <span className="hidden sm:block md:block font-bold">Home</span>
        </div>

        <div
          className="flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // First function
            }
            onProductClick(); // Second function
          }}
        >
          <i className="fa-solid fa-shirt mt-1"></i>
          <span className="hidden sm:block md:block font-bold">Product</span>
        </div>
        <div
          className="flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
          onClick={window.innerWidth < 1024 ? onMenuClick : null}
        >
          <i className="fa-solid fa-arrow-right-arrow-left mt-1.5"></i>
          <span className="hidden sm:block md:block font-bold">
            Transaction
          </span>
        </div>
      </div>
    </>
  );
};

export default Menubar;
