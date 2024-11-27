// import { data } from "../../hello";

import { useEffect, useState } from "react";
import { data } from "../../data";
import Table from "../../Table";
import AddProduct from "./AddProduct";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const Product = () => {
  const { accessToken } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(10); // Rows per page
  // const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [codeStatus, setCodeStatus] = useState("");
  const [showError, setShowError] = useState("");
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
    console.log("Page : ", page);
    setCurrentPage(page); // Update current page when Table notifies
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "SKU", accessor: "sku" },
    { Header: "Product Name", accessor: "product_name" },
    { Header: "Size", accessor: "size" },
    { Header: "Color", accessor: "color" },
    { Header: "Initial_stock", accessor: "initial_stock" },
    { Header: "Created_at", accessor: "created_at" },
    { Header: "Updated_at", accessor: "updated_at" },
  ];

  const fetchData = async (page = currentPage, limit = rowsPerPage) => {
    try {
      // console.log("Page : ", page, "And Limit : ", limit);
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
      const result = await axios.post(
        `${serverDomain}/lego/stock/list`,
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
      setData(result.data.data.by);
    } catch (error) {
      console.log(error);
    }
  };

  // const productDelete = async (id) => {
  //   try {
  //     const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  //     const result = await axios.delete(
  //       `${serverDomain}/lego/stock/delete/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`, // Use the token in the request headers
  //         },
  //       }
  //     );
  //     if (result.data.code == "200") {
  //       setCodeStatus("green");
  //     } else {
  //       setIsError(true);
  //       setCodeStatus("red");
  //     }
  //     setShowError(result.data.message);
  //     console.log("Result :", result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const productEdit = async (data) => {
  //   console.log("ProductEdit data  : ", data);
  //   setEditData(data);
  //   setShowAdd(true);
  //   setEditAble(true);
  // };

  const onActionClick = async (row, actionType) => {
    //   try {
    //     // console.log("Data : ", row);
    //     // console.log("ActionType : ", actionType);
    //     if (actionType == "delete") {
    //       await productDelete(row.id);
    //     } else if (actionType == "edit") {
    //       productEdit(row);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
  };
  useEffect(() => {
    // fetchData(currentPage, rowsPerPage);
    const timer = setTimeout(() => {
      setIsError(false);
      setShowError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentPage, rowsPerPage, isError]);

  return (
    <>
      <div className="flex flex-col items-center h-full shrink">
        <h3 className="text-xl sm:text-3xl md:text2xl font-extrabold shrink tracking-wide">
          {showAdd ? "ADD PRODUCT" : "PRODUCT LIST"}
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
        {showAdd ? (
          <AddProduct data={editData} editAble={editAble} />
        ) : (
          <Table
            columns={columns}
            data={data}
            rowsPerPage={rowsPerPage}
            initialPage={currentPage}
            onPageChange={handlePageChange}
            onActionClick={onActionClick} // Notify parent on page change
          />
        )}
      </div>
    </>
  );
};

export default Product;
