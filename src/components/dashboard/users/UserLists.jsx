import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";
import axios from "axios";
import Table from "../../../Table";

const UserLists = () => {
  const { accessToken } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); // Current page

  const columns = [
    // { Header: "ID", accessor: "id" },
    // { Header: "SKU", accessor: "sku" },
    { Header: "Name", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "OrderDate", accessor: "created_at" },
  ];

  const fetchData = async () => {
    try {
      // console.log("Page : ", page, "And Limit : ", limit);
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

      const result = await axios.get(
        `${serverDomain}/lego/user/list/${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the token in the request headers
          },
        }
      );
      console.log("Result :", result.data.data);
      console.log("Total : ", result.data.data.total);
      if (result.data.code != 200) {
        setData(result.data.data);
        return;
      }
      setData(result.data.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = () => {};
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  return (
    <>
      <div className="flex flex-col items-center h-full shrink overflow-x-auto">
        <div className="flex flex-row mt-10 w-full mb-2 w-auto sm:w-full items-start justify-start  sm:mt-10 md:mt-10 lg:mt-0"></div>
        <div className="flex justify-center items-center p-5">
          <h3 className="text-xl sm:text-3xl md:text2xl font-extrabold shrink tracking-wide">
            USER LIST
          </h3>
        </div>

        <Table
          columns={columns}
          data={data}
          rowsPerPage={1}
          initialPage={currentPage}
          totalData={currentPage}
          onPageChange={handlePageChange}
          Action={{ detail: false, edit: false, delete: false, action: false }}
          // onActionClick={onActionClick} // Notify parent on page change
        />
      </div>
    </>
  );
};

export default UserLists;
