import { useState } from "react";
import CheckOnHold from "./CheckOnHold";

const CheckTotalHold = () => {
  const [showList, setShowList] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editAble, setEditAble] = useState(false);
  const handleShowProductToggle = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setEditData(null);
    setEditAble(false);
    setShowList(!showList); // Toggle Product visibility
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row w-full">
        {/* First Div: 2/3 Width */}
        <div className="w-full sm:w-4/5 flex justify-end sm:justify-center items-end mb-4 sm:mb-0">
          <h3 className="text-xl sm:text-3xl md:text-2xl font-extrabold shrink tracking-wide">
            {showList ? "Hold List" : "HOLD TRANSACTION"}
          </h3>
        </div>
        {/* Second Div: 1/3 Width */}
        <div className="w-full sm:w-1/5 flex justify-end items-center">
          <div
            className="text-3xl font-extrabold border-2 border-slate-500 rounded w-12 text-center shrink justify-center 
            transition-all duration-300 ease-out-in hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
            onClick={handleShowProductToggle}
          >
            {showList ? (
              <i className="fa-solid fa-arrow-left"></i>
            ) : (
              <i className="fa-solid fa-plus"></i>
            )}
          </div>
        </div>
      </div>
      {showList && <CheckOnHold />}
    </>
  );
};

export default CheckTotalHold;
