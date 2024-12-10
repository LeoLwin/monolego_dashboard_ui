import { useEffect, useState } from "react";
// import { data } from "../../../data";
import Table from "../../../Table";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import InputTransaction from "./InputTransaction";

const Transaction = () => {
  const { accessToken } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(10); // Rows per page
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [codeStatus, setCodeStatus] = useState("");
  const [showError, setShowError] = useState("");
  const [isError, setIsError] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editAble, setEditAble] = useState(false);
  const [searchData, setSearchData] = useState({
    key: "",
    value: "",
  });

  const handleShowProductToggle = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setEditData(null);
    setEditAble(false);
    setShowAdd(!showAdd); // Toggle Product visibility
  };

  const handlePageChange = (page) => {
    console.log("Product Page : ", page);
    setCurrentPage(page); // Update current page when Table notifies
  };

  const columns = [
    // { Header: "ID", accessor: "id" },
    { Header: "Tr Date", accessor: "transaction_date" },
    { Header: "SKU", accessor: "sku" },
    { Header: "Color", accessor: "color" },
    { Header: "Size", accessor: "size" },
    { Header: "Qty In", accessor: "quantity_in" },
    { Header: "Qty Out", accessor: "quantity_out" },
    { Header: "In Stock", accessor: "remaining_stock" },
    { Header: "To Return  ", accessor: "remaining_return_qty" },
    { Header: "Tr Type", accessor: "transaction_type" },
    { Header: "Remarks", accessor: "remarks" },
    { Header: "Created_at", accessor: "created_at" },
  ];

  const validateSearchData = (data) => {
    const { key, value } = data;
    console.log("validateData : ", data);

    // Common check: Ensure key and value are not empty
    if (!key && value) {
      setShowError(`Need Key to search.`);
      return { isValid: false };
    }

    if (key && !value) {
      setShowError(`Need value to search.`);
      return { isValid: false };
    }

    if (!key && !value) {
      setShowError(`Key and Value cannot both be empty.`);
      return { isValid: false };
    }

    // Key-specific validation
    if (key === "transaction_date" || key === "created_at") {
      const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/; // YYYY/MM/DD format
      if (!dateRegex.test(value)) {
        setShowError(`${key} must be in YYYY/MM/DD format.`);
        return {
          isValid: false,
        };
      }
    }

    // Additional validation for specific keys (example: sku)
    if (key === "sku" && value.length < 3) {
      setShowError("SKU must be at least 3 characters long.");
      return {
        isValid: false,
      };
    }

    // All checks passed
    return { isValid: true, message: "Validation successful." };
  };

  const searchButton = async () => {
    try {
      validateSearchData(searchData);
      const { key, value } = searchData; // Destructure key-value pair
      const result = await fetchData(currentPage, rowsPerPage, {
        [key]: value, // Dynamically pass the key-value pair
      });
      console.log("search Result : ", result);
    } catch (error) {
      console.log(error);
    }
  };

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
        ...filters, // Spread dynamic filters
      };

      const result = await axios.post(
        `${serverDomain}/lego/transaction/filterList`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the token in the request headers
          },
        }
      );

      console.log("Result :", result.data);
      if (result.data.code !== "200") {
        console.log("Result :", result.data.message);
        setShowError(result.data.message);
      }
      setData(result.data.data.by);
      setTotalData(result.data.data.pagination.total);
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = async () => {
    await fetchData(1, rowsPerPage);
    setSearchData({ key: "", value: "" });
  };

  const makeTransaction = async (data) => {
    console.log("Edit data  : ", data);
    setEditData(data);
    setShowAdd(true);
    setEditAble(true);
  };

  const onActionClick = async (row, actionType) => {
    try {
      // console.log("Data : ", row);
      // console.log("ActionType : ", actionType);
      if (actionType == "delete") {
        // await productDelete(row.id);
      } else if (actionType == "edit") {
        makeTransaction(row);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value, // Use the name of the field to update the specific property
    }));
  };

  useEffect(() => {
    console.log(searchData);
    fetchData(currentPage, rowsPerPage);
    const timer = setTimeout(() => {
      setIsError(false);
      setShowError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentPage, rowsPerPage, isError, searchData]);

  return (
    <>
      <div className="flex flex-col items-center h-full shrink">
        <h3 className="text-xl sm:text-3xl md:text2xl font-extrabold shrink tracking-wide">
          {showAdd ? "In/Out Transaction" : "TRANSACTION LIST"}
        </h3>
        <div className="flex justify-end w-full mb-1 ">
          <div className="lg:px-10 sm:justify-end md:justify-end">
            <div
              className="text-3xl font-extrabold border-2 border-slate-500 rounded w-12 text-center shrink  justify-center 
            transition-all duration-300 ease-out-in hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
              onClick={handleShowProductToggle}
            >
              {showAdd ? (
                <i className="fa-solid fa-arrow-left"></i>
              ) : (
                <i className="fa-solid fa-recycle"></i>
              )}
            </div>
          </div>
        </div>
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

        {!showAdd ? (
          <div className="flex flex-col sm:flex-row shrink mb-1">
            <select
              name="key"
              id="key"
              value={searchData.key}
              onChange={handleChange}
              className="
            rounded-l-md 
            sm:border-2 md:border-2 lg:border-2  
            border-slate-500 mb-1"
            >
              <option value="" disabled>
                Select a field
              </option>
              <option value="sku">SKU</option>
              <option value="transaction_date">Tr Date</option>
              <option value="transaction_type">Tr Type</option>
              <option value="created_at">Created_at</option>
            </select>
            <input
              type="text"
              name="value"
              id="color"
              value={searchData.value}
              onChange={handleChange}
              className="
              border-2 sm:border-2 md:border-2 
              sm:rounded-md md:rounded-md rounded-md
              lg:border-t-2 lg:border-b-2 lg:rounded-none lg:border-0
              border-slate-500 p-2 
              text-sm sm:text-base 
              placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-1"
              placeholder="Enter what you want to search"
              aria-describedby="Search"
            />
            <div className="flex fexl-col justify-center items-center">
              <button
                type="submit"
                onClick={searchButton}
                className="border-2 border-slate-500 rounded-r-md 
            sm:border-2 md:border-2 lg:border-2 p-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-1"
              >
                Search
              </button>
              <div
                onClick={refresh}
                className="p-2 text-2xl font-extrabold  text-center shrink  justify-center items-center
            transition-all duration-500 ease-out-in  hover:scale-105 "
              >
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {showAdd ? (
          <InputTransaction data={editData} editAble={editAble} />
        ) : (
          <Table
            columns={columns}
            data={data}
            rowsPerPage={rowsPerPage}
            initialPage={currentPage}
            onPageChange={handlePageChange}
            totalData={totalData}
            Action={{ detail: false, edit: true, delete: false, action: true }}
            onActionClick={onActionClick} // Notify parent on page change
          />
        )}
      </div>
    </>
  );
};

export default Transaction;
