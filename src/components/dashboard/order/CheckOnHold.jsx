import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";
import axios from "axios";
import Table from "../../../Table";
import { SaleProductDetail } from "./SaleProductDetail";

const CheckOnHold = () => {
  const { accessToken, userData } = useAuth();
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(10); // Rows per page
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [totalPages, setTotalPages] = useState(1); // Total pages
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(null);
  const columns = [
    // { Header: "ID", accessor: "id" },
    { Header: "SKU", accessor: "sku" },
    { Header: "Name", accessor: "product_name" },
    { Header: "Price", accessor: "price" },
    { Header: "Size", accessor: "size" },
    { Header: "Color", accessor: "color" },
    { Header: "Qty", accessor: "qty" },
    { Header: "HoldBy   ", accessor: "user" },
    { Header: "Status", accessor: "status" },
    { Header: "OrderDate", accessor: "created_at" },
  ];

  const fetchData = async (page = currentPage, limit = rowsPerPage, status) => {
    try {
      // console.log("Page : ", page, "And Limit : ", limit);
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

      const payload = {
        current: page,
        limit,
        status,
      };
      const result = await axios.post(
        `${serverDomain}/lego/order/getOrderList`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the token in the request headers
          },
        }
      );
      // console.log("Result :", result.data.data);
      // console.log("Code : ", result.data.code);
      // console.log("Total : ", result.data.data.pagination.total);
      if (result.data.code != 200) {
        // setData(result.data.data);

        // console.log("Total : ", result.data.data.pagination.total);
        // setIsError(true);
        // setShowError(result.data.message);
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

  useEffect(() => {
    fetchData(currentPage, rowsPerPage, status);
  }, []);

  return (
    <>
      {userData.role === "admin" && (
        <div className="flex flex-col items-center h-full shrink">
          <div className="flex justify-center items-center p-5">
            <h3 className="text-xl sm:text-3xl md:text2xl font-extrabold shrink tracking-wide">
              ORDER LIST
            </h3>
          </div>
          {showDetails && detailsData && (
            <SaleProductDetail
              data={detailsData}
              onClose={closeDetails}
              check={true}
            />
          )}
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
        </div>
      )}
    </>
  );
};

export default CheckOnHold;
