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
  const columns = [
    // { Header: "ID", accessor: "id" },
    { Header: "SKU", accessor: "sku" },
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
        `${serverDomain}/lego/order/getOnHoldList`,
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

  useEffect(() => {
    fetchData(currentPage, rowsPerPage, status);
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <div>
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              // saveOrder();
              setShowModal(false);
            }}
          />

          <div className="flex flex-col items-center h-full shrink overflow-x-auto">
            <div className="flex justify-center items-center p-5">
              <h3 className="text-xl sm:text-3xl md:text2xl font-extrabold shrink tracking-wide">
                HOLD LIST
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
              Action={{
                detail: true,
                edit: false,
                delete: false,
                action: true,
              }}
              onActionClick={onActionClick} // Notify parent on page change
            />
          </div>
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
