import { useEffect, useState } from "react";
import Menubar from "./MenuBar";
import Product from "./Product";
import Home from "./Home";

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [show, setShow] = useState(0); // Default view is "Home"

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleProductToggle = (view) => {
    console.log("Click Data:", view);
    setShow(view); // Dynamically set view based on click (0 or 1)
  };

  useEffect(() => {
    console.log("View changed to:", show);
  }, [show]);

  return (
    <div className="m-0 p-0">
      <div className="flex flex-row m-5 h-screen rounded-md gap-1">
        {/* Sidebar */}
        <div
          className={`flex flex-col border rounded-md bg-gray-200 transition-all duration-300 p-2  w-1/4 
               ${
                 isSidebarVisible
                   ? "translate-x-0 w-full"
                   : "-translate-x-full w-0 hidden "
               } lg:block lg:translate-x-0 lg:w-1/4 h-full `}
        >
          <Menubar
            onMenuClick={toggleSidebar}
            onProductClick={handleProductToggle}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex flex-col transition-all duration-500 border-2 border-black rounded-md ${
            isSidebarVisible ? "hidden" : "w-full"
          } shrink justify-center items-center`}
        >
          {/* Button to toggle sidebar visibility on small screens */}
          <button
            className={`p-2 bg-slate-800 w-8 h-8 duration-300 absolute rounded-md mt-2 ml-2 top-5 left-5 lg:hidden ${
              isSidebarVisible
                ? "bg-white duration-300 bg-white-400 bg-blue-400 left-10"
                : "bg-blue-500"
            }`}
            onClick={toggleSidebar}
          >
            <div className="flex flex-col gap-1 items-center">
              <span
                className={`block w-6 h-0.5 ${
                  isSidebarVisible ? "bg-white" : "bg-blue-100"
                } rounded-md`}
              ></span>
              <span
                className={`block w-6 h-0.5 ${
                  isSidebarVisible ? "bg-white" : "bg-blue-100"
                } rounded-md`}
              ></span>
              <span
                className={`block w-6 h-0.5 ${
                  isSidebarVisible ? "bg-white" : "bg-blue-100"
                } rounded-md`}
              ></span>
            </div>
          </button>

          <div className="p-3 w-full h-full">
            {/* Render Home or Product based on state */}
            {show === 0 && <Home />}
            {show === 1 && <Product />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
