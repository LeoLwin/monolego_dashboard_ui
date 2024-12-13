import { useEffect, useState } from "react";
// import { data } from "../../data";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { SaleProductDetail } from "./SaleProductDetail";
const OurProducts = () => {
  const { accessToken } = useAuth();
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(6); // Rows per page
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [detailsData, setDetailsData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showError, setShowError] = useState("");
  const [isError, setIsError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [codeStatus, setCodeStatus] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState({
    sku: "",
    product_name: "",
    price: "",
    size: "",
    color: "",
  });

  const fetchData = async (
    page = currentPage,
    limit = rowsPerPage,
    filters = {}
  ) => {
    try {
      // console.log("Page : ", page, "And Limit : ", limit);
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

      const payload = {
        current: page,
        limit,
        filter: {
          sku: filters.sku || null,
          product_name: filters.product_name || null,
          price: filters.price || null,
          size: filters.size || null,
          color: filters.color || null,
          created_at: filters.created_at || null,
        },
      };
      console.log("PayLoad");
      const result = await axios.post(
        `${serverDomain}/lego/saleProducts/filterSaleableList`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the token in the request headers
          },
        }
      );
      console.log("Result :", result.data.data);
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

  // const validateSearchData = (data) => {
  //   const { key, value } = data;
  //   console.log("validateData : ", data);

  //   // Common check: Ensure key and value are not empty
  //   if (!key && value) {
  //     setIsError(true);
  //     setShowError(`Need Key to search.`);
  //     return { isValid: false };
  //   }

  //   if (key && !value) {
  //     setIsError(true);
  //     setShowError(`Need value to search.`);
  //     return { isValid: false };
  //   }

  //   if (!key && !value) {
  //     setIsError(true);
  //     setShowError(`Key and Value cannot both be empty.`);
  //     return { isValid: false };
  //   }

  //   // Key-specific validation

  //   // Additional validation for specific keys (example: sku)
  //   if (key === "sku" && value.length < 3) {
  //     setIsError(true);
  //     setShowError("SKU must be at least 3 characters long.");
  //     return {
  //       isValid: false,
  //     };
  //   }

  //   // All checks passed
  //   return { isValid: true, message: "Validation successful." };
  // };
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
      const filters = searchData;

      console.log(filters);

      await fetchData(currentPage, rowsPerPage, filters);

      // showSearchBar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDetails = (item) => {
    setDetailsData(item);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
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

  const refresh = async () => {
    await fetchData(1, rowsPerPage);
    setSearchData({
      sku: "",
      product_name: "",
      price: "",
      size: "",
      color: "",
    });
    setShowSearch(false);
    setIsError(false);
    setShowError("");
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

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center rounded-md h-full overflow-x-auto">
        <div className="flex justify-center items-center">
          <p
            className={`${
              isError == "" ? "hide" : "block"
            } font-medium border rounded-md ${
              codeStatus == "green"
                ? "text-green-500 bg-green-100"
                : "text-red-500 bg-red-100"
            }`}
          >
            {showError}
          </p>
        </div>
        {showDetails && detailsData && (
          <SaleProductDetail data={detailsData} onClose={closeDetails} />
        )}

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
            <div className="flex flex-row items-center justify-start">
              <input
                type="text"
                name="product_name"
                value={searchData.product_name}
                className="border-b-2 text-center w-24"
                onChange={handleChange}
                placeholder="Product Name"
              />
            </div>
            <div className="flex flex-row gap-1 items-center justify-start">
              <input
                type="number"
                name="price"
                value={searchData.price}
                className="border-b-2 text-center w-24"
                onChange={handleChange}
                placeholder="Price"
              />
            </div>
            <div className="flex flex-row gap-1 items-center justify-start">
              <input
                type="text"
                name="size"
                value={searchData.size}
                className="border-b-2 text-center w-24"
                onChange={handleChange}
                placeholder="size"
              />
            </div>
            <div className="flex flex-row gap-1 items-center justify-start">
              <input
                type="text"
                name="color"
                value={searchData.color}
                className="border-b-2 text-center w-24"
                onChange={handleChange}
                placeholder="color"
              />
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

        <div className="flex flex-row flex-wrap sm:flex-row md:flex-row w-full gap-10 justify-center sm:justify-start items-center rounded-md h-full overflow-x-auto">
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
                    <h3 className=" font-mono font-bold">{item.sku} </h3>
                    <h3 className=" font-mono font-bold">Price:{item.price}</h3>
                    <p className=" font-mono font-bold">Size: {item.size}</p>
                    <p className=" font-mono font-bold">Color: {item.color}</p>
                  </div>

                  <div className="flex flex-row gap-1 items-center justify-start w-full flex-wrap">
                    <p className="bg-green-500 p-1 rounded-md text-sm w-auto text-center">
                      Yes : {item.stock_available}
                    </p>
                    <p className="bg-yellow-500 p-1 rounded-md text-sm w-auto text-center ">
                      Order : {item.stock_inorder}
                    </p>
                    <p className="bg-amber-500 p-1 rounded-md text-sm w-20 text-center">
                      Hold : {item.stock_onhold}
                    </p>
                    <p className="bg-red-500 p-1 rounded-md text-sm w-auto text-center ">
                      Sold : {item.stock_soldout}
                    </p>
                  </div>

                  <div className="flex flex-row gap-1">
                    <button className="border-2 border-blue-500 rounded-md text-sm w-16 text-center text-blue-500 font-bold hover:ring-2 hover:ring-blue-300">
                      ORDER
                    </button>

                    {/* Hold Button */}
                    <button className="border-2 border-orange-500 rounded-md text-sm w-16 text-center text-orange-500 font-bold hover:ring-2 hover:ring-orange-300">
                      HOLD
                    </button>
                    <button
                      className="rounded-md text-sm w-8 bg-teal-500  text-center text-white font-bold hover:ring-2 hover:ring-teal-300"
                      onClick={() => openDetails(item)}
                    >
                      <i className="fa-solid fa-info"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-row gap-2 mt-4">
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
    </>
  );
};

export default OurProducts;
