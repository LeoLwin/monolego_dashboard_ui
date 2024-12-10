import { useEffect, useState } from "react";
// import { data } from "../../data";
import Table from "../../../Table";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { SalePrductDetail } from "./SalePrductDetail";
import AddSaleProduct from "./AddSaleProduct";

const SaleProduct = () => {
  const { accessToken } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(10); // Rows per page
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [codeStatus, setCodeStatus] = useState("");
  const [showError, setShowError] = useState("");
  const [detailsData, setDetailsData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isError, setIsError] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editAble, setEditAble] = useState(false);

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
    { Header: "SKU", accessor: "sku" },
    { Header: "Product Name", accessor: "product_name" },
    { Header: "Stock From Production", accessor: "stock_from_production" },
    { Header: "Initial Stock", accessor: "initial_stock" },
    { Header: "Stock Available", accessor: "stock_available" },
    { Header: "Stock Adjustment", accessor: "stock_adjustment" },

    { Header: "Remark", accessor: "remarks" },
    { Header: "Created_at", accessor: "created_at" },
  ];

  const fetchData = async (page = currentPage, limit = rowsPerPage) => {
    try {
      // console.log("Page : ", page, "And Limit : ", limit);
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
      const result = await axios.post(
        `${serverDomain}/lego/saleProducts/filterSaleableList`,
        {
          current: page,
          limit,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the token in the request headers
          },
        }
      );
      console.log("Result :", result.data.data);
      if (result.data.code != 200) {
        setShowError(result.data.message);
        return;
      }
      setData(result.data.data.by);
      setTotalData(result.data.data.pagination.total);
    } catch (error) {
      console.log(error);
    }
  };

  const productEdit = async (data) => {
    console.log("ProductEdit data  : ", data);
    setEditData(data);
    setShowAdd(true);
    setEditAble(true);
  };

  const onActionClick = async (row, actionType) => {
    try {
      // console.log("Data : ", row);
      // console.log("ActionType : ", actionType);
      if (actionType == "details") {
        setDetailsData(row); // Set the data for the details component
        setShowDetails(true); // Show the details component
      } else if (actionType == "edit") {
        productEdit(row);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeDetails = () => {
    setDetailsData(null);
    setShowDetails(false);
  };

  useEffect(() => {
    fetchData(currentPage, rowsPerPage);
    const timer = setTimeout(() => {
      setIsError(false);
      setShowError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentPage, rowsPerPage, isError]);
  return (
    <div className="flex flex-col items-center h-full shrink">
      <h3 className="text-xl sm:text-3xl md:text2xl font-extrabold shrink tracking-wide">
        {showAdd ? "ADD SALEABLE PRODUCT" : "SALEABLE PRODUCT LIST"}
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
              <i className="fa-solid fa-plus"></i>
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
      {showDetails && detailsData && (
        <SalePrductDetail data={detailsData} onClose={closeDetails} />
      )}

      {showAdd ? (
        <AddSaleProduct data={editData} editAble={editAble} />
      ) : (
        <Table
          columns={columns}
          data={data}
          rowsPerPage={rowsPerPage}
          initialPage={currentPage}
          onPageChange={handlePageChange}
          totalData={totalData}
          Action={{ detail: true, edit: false, delete: false, action: true }}
          onActionClick={onActionClick} // Notify parent on page change
        />
      )}
    </div>
  );
};

export default SaleProduct;
