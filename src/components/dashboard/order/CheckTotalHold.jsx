import { useEffect, useState } from "react";
import CheckOnHold from "./CheckOnHold";
import { useAuth } from "../../../AuthContext";
import axios from "axios";

const CheckTotalHold = () => {
  const { accessToken } = useAuth();
  const [showList, setShowList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(6); // Rows per page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [showError, setShowError] = useState("");
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState({
    sku: "",
    adminWuserId: "",
    product_name: "",
  });
  const handleShowProductToggle = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setShowList(!showList); // Toggle Product visibility
  };

  const searchButton = async () => {
    try {
      const filledFields = Object.values(searchData).filter(
        (value) => value.trim() !== ""
      ).length;

      // Validate that only one field is filled
      if (filledFields > 1) {
        setShowError("Only one field can be used for searching at a time.");
        return;
      }

      if (filledFields === 0) {
        setShowError("Please enter a value to search.");
        return;
      }

      await fetchData(currentPage, rowsPerPage, status);
      // showSearchBar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (
    page = currentPage,
    limit = rowsPerPage,
    sku = null,
    product_name = null
  ) => {
    try {
      // console.log("Page : ", page, "And Limit : ", limit);
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

      const payload = {
        current: page,
        limit,
        sku,
        product_name,
      };
      const result = await axios.post(
        `${serverDomain}/lego/order/getOnHoldListByItems`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the token in the request headers
          },
        }
      );
      console.log("Result :", result.data);
      if (result.data.code != 200) {
        setData([]);
        setIsError(true);
        setShowError(result.data.message);
        return;
      }
      setData(result.data.data.by);
      console.log(result.data.data.pagination);
      setTotalPages(result.data.data.pagination.rowsPerPage || 1);
    } catch (error) {
      console.log(error);
    }
  };

  const showSearchBar = (data) => {
    setShowSearch(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value, // Use the name of the field to update the specific property
    }));
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    console.log(searchData);
    fetchData(currentPage, rowsPerPage);
    console.log();
    const timer = setTimeout(() => {
      // setIsError(false);
      setShowError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentPage, rowsPerPage, searchData, isError, showError]);

  const refresh = async () => {
    await fetchData(1, rowsPerPage);
    setSearchData({
      sku: "",
      adminWuserId: "",
      product_name: "",
    });
    setShowSearch(false);
    setIsError(false);
    setShowError("");
  };

  return (
    <>
      <div className="flex flex-col items-center h-full shrink overflow-x-auto">
        <div className="flex flex-col w-full overflow-x-auto ">
          {/* Header Section */}
          {/* <div className="flex flex-col sm:flex-row w-full mb-5"> */}
          {/* First Div: 4/5 Width */}
          <div className="w-full  flex justify-center sm:justify-center items-end mb-4 sm:mb-0">
            <h3 className="text-xl sm:text-3xl md:text-2xl font-extrabold shrink tracking-wide">
              {showList ? "Hold List" : "HOLD TRANSACTION"}
            </h3>
          </div>
          {/* Second Div: 1/5 Width */}
          <div className="w-full  flex justify-end items-center pr-5 mb-1">
            <div
              className="text-3xl font-extrabold border-2 border-slate-500 rounded w-12 text-center shrink justify-center 
        transition-all duration-300 ease-out-in hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
              onClick={handleShowProductToggle}
            >
              {showList ? (
                <i className="fa-solid fa-arrow-left"></i>
              ) : (
                <i className="fa-solid fa-arrow-right-arrow-left"></i>
              )}
            </div>
          </div>
          {/* </div> */}

          {/* Content Section */}
          <div className="">
            {showList ? (
              <CheckOnHold />
            ) : (
              <div className="flex flex-col w-full  items-center rounded-md h-full overflow-x-auto">
                <div className="flex flex-row mt-10 w-full mb-2 w-auto sm:w-full items-start justify-start  sm:mt-10 md:mt-10 lg:mt-0">
                  <div
                    onClick={() => {
                      showSearchBar(true);
                    }}
                    onDoubleClick={() => {
                      showSearchBar(false);
                    }}
                    className="border rounded-full w-8 h-8 hover:ring-2 hover:ring-slate-300 flex items-center justify-center "
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div
                    className={`${
                      showSearch ? "flex flex-row" : "hidden"
                    } flex-row flex-wrap w-full gap-2 p-1  justify-start`}
                  >
                    <div className="flex flex-row items-center justify-start">
                      <input
                        type="text"
                        name="sku"
                        value={searchData.sku}
                        className="border-b-2 text-center w-24"
                        onChange={handleChange}
                        placeholder="SKU"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-start mr-5">
                      <input
                        type="text"
                        name="product_name"
                        value={searchData.product_name}
                        className="border-b-2 text-center w-28"
                        onChange={handleChange}
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-start mr-5">
                      <select
                        name="adminWuserId"
                        value={searchData.adminWuserId}
                        className="border-b-2 text-start w-28"
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select Users
                        </option>
                        <option value="6">Aunng Chan Pyae</option>
                        <option value="5">Aunng Phyoe Pyae</option>
                        <option value="2">Kaung Htet Lwin</option>
                        <option value="7">Pyae KO KO</option>
                      </select>
                    </div>

                    <button
                      className="rounded-md text-sm w-8 bg-teal-500  text-center text-white font-bold hover:ring-2 hover:ring-teal-300"
                      onClick={() => {
                        searchButton();
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button
                      className="rounded-md text-sm w-8 bg-teal-500  text-center text-white font-bold hover:ring-2 hover:ring-teal-300"
                      onClick={() => {
                        refresh();
                      }}
                    >
                      <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap justify-center items-center gap-10 overflow-x-auto">
                  {data.map((item, index) => {
                    return (
                      <div
                        key={index}
                        // className="flex rounded-md border border-indigo-500 bg-gray-50 p-1 shadow-md w-72 h-90 items-center justify-center  flex-col overflow-x-auto "
                        className="flex rounded-md border border-indigo-500 bg-gray-50 p-1 shadow-md w-72 h-90 items-center justify-center flex-col overflow-x-auto "
                      >
                        <div className="relative group">
                          <img
                            src={item.img_1}
                            alt={item.product_name}
                            className="w-full h-full object-cover border-2 border-slate-200 rounded-md transition-opacity duration-300 group-hover:opacity-0"
                            // className="object-cover w-full h-full rounded-md"
                          />
                          <img
                            src={item.img_2}
                            alt={item.product_name}
                            className="absolute inset-0 w-full h-full object-cover border-2 border-slate-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                        <div className="relative flex flex-col w-full items-start gap-1 p-1">
                          <h3 className="text-2xl font-mono font-extrabold">
                            {item.product_name}
                          </h3>
                          <div className="flex flex-col gap-1">
                            <h3 className=" font-mono font-bold">
                              {item.sku}{" "}
                            </h3>
                            <p className=" font-mono font-bold">
                              Size: {item.size}
                            </p>
                            <p className=" font-mono font-bold">
                              Color: {item.color}
                            </p>
                          </div>

                          <div className="flex flex-col gap-1 items-start justify-start w-full flex-wrap">
                            <p className="bg-yellow-500 p-1 rounded-md text-sm w-auto text-center ">
                              Hold Qty : {item.total_qty}
                            </p>
                            <p className="bg-yellow-500 p-1 rounded-md text-sm w-auto text-center ">
                              Hold By : {item.username}
                            </p>
                          </div>

                          <div className="flex flex-row gap-1">
                            <button
                              className="border-2 border-blue-500 rounded-md text-sm w-16 text-center text-blue-500 font-bold hover:ring-2 hover:ring-blue-300"
                              onClick={() => {
                                // setHeader("ORDER");
                                // openOrder(item, true);
                              }}
                            >
                              RETURN
                            </button>

                            {/* Hold Button */}
                            <button
                              className="border-2 border-orange-500 rounded-md text-sm w-16 text-center text-orange-500 font-bold hover:ring-2 hover:ring-orange-300"
                              onClick={() => {
                                // setHeader("HOLD");
                                // openOrder(item, false);
                              }}
                            >
                              HOLD
                            </button>
                            <button
                              className="rounded-md text-sm w-8 bg-teal-500  text-center text-white font-bold hover:ring-2 hover:ring-teal-300"
                              // onClick={() => openDetails(item)}
                            >
                              <i className="fa-solid fa-info"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-row gap-2 mt-2">
                  <button
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500"
                    } text-white font-bold`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-bold">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500"
                    } text-white font-bold`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckTotalHold;
