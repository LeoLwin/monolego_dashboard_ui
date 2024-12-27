import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";
import axios from "axios";
import Table from "../../../Table";
import { SaleProductDetail } from "./SaleProductDetail";
import ConfirmationModal from "../../models/ConfirmationModal";

const CheckOnHold = () => {
  const { accessToken } = useAuth();
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(10); // Rows per page
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showError, setShowError] = useState("");
  const [isError, setIsError] = useState(false);
  const [codeStatus, setCodeStatus] = useState("");

  const [searchData, setSearchData] = useState({
    sku: "",
    adminWuserId: "",
    product_name: "",
  });
  const columns = [
    // { Header: "ID", accessor: "id" },
    // { Header: "SKU", accessor: "sku" },
    { Header: "Name", accessor: "product_name" },
    { Header: "Price", accessor: "price" },
    { Header: "Size", accessor: "size" },
    { Header: "Color", accessor: "color" },
    { Header: "Qty", accessor: "qty" },
    { Header: "Total_qty", accessor: "total_qty" },
    // total_qty
    // tranaction_type
    { Header: "Type", accessor: "tranaction_type" },
    { Header: "HoldBy   ", accessor: "user" },
    { Header: "Status", accessor: "status" },
    { Header: "OrderDate", accessor: "created_at" },
  ];

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

  const fetchData = async (page = currentPage, limit = rowsPerPage, status) => {
    try {
      // console.log("Page : ", page, "And Limit : ", limit);
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

      const payload = {
        current: page,
        limit,
        status,
        sku: searchData.sku == "" ? null : searchData.sku,
        adminWuserId:
          Number(searchData.adminWuserId) == ""
            ? null
            : Number(searchData.adminWuserId),
        product_name:
          searchData.product_name == "" ? null : searchData.product_name,
      };
      console.log("PayLoad : ", payload);
      const result = await axios.post(
        `${serverDomain}/lego/order/getOnHoldList`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the token in the request headers
          },
        }
      );
      console.log("Result :", result);

      if (result.data.code != 200) {
        setIsError(true);
        setShowError(result.data.message);
        setCodeStatus("red");
        return;
      }
      setData(result.data.data.by);
      setTotalData(result.data.data.pagination.total);
      console.log(result.data.data.pagination);

      setTotalPages(result.data.data.pagination.rowsPerPage || 1);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const onActionClick = async (row, actionType) => {
    try {
      setDetailsData(row);
      setShowDetails(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  const handlePageChange = (page) => {
    console.log("Product Page : ", page);
    setCurrentPage(page); // Update current page when Table notifies
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

  useEffect(() => {
    fetchData(currentPage, rowsPerPage, status);
    const timer = setTimeout(() => {
      setIsError(false);
      setShowError("");
    }, 5000);
    console.log("SearchData : ", searchData);
    return () => clearTimeout(timer);
  }, [currentPage, rowsPerPage, status, isError, showError, searchData]);

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
      {data.length > 0 ? (
        <div className="flex flex-col items-center h-full shrink overflow-x-auto">
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
          {/* <i class="fa-solid fa-arrow-right-arrow-left"></i> */}
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              // saveOrder();
              setShowModal(false);
            }}
          />
          <div className="flex justify-center items-center p-5">
            <h3 className="text-xl sm:text-3xl md:text-2xl font-extrabold tracking-wide">
              HOLD LIST
            </h3>
          </div>
          {showDetails && detailsData && (
            <SaleProductDetail
              data={detailsData}
              onClose={closeDetails}
              check={true}
              order={false}
            />
          )}

          <Table
            columns={columns}
            data={data}
            rowsPerPage={rowsPerPage}
            initialPage={currentPage}
            onPageChange={handlePageChange}
            totalData={totalData}
            Action={{
              detail: true,
              edit: false,
              delete: false,
              action: true,
            }}
            onActionClick={onActionClick} // Notify parent on page change
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4 p-6 bg-gray-100 border h-full rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            No Available Products
          </p>
          <p className="text-sm text-gray-600">
            We&lsquo;re sorry, but it looks like there are no products available
            at the moment. Please check back later.
          </p>
        </div>
      )}
    </>
  );
};

export default CheckOnHold;
