// import { data } from "../../hello";

import { data } from "../../data";
import Table from "../../Table";

const Product = () => {
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "SKU", accessor: "sku" },
    { Header: "Product Name", accessor: "product_name" },
    { Header: "Size", accessor: "size" },
    { Header: "color", accessor: "color" },
    { Header: "initial_stock", accessor: "initial_stock" },
    { Header: "created_at", accessor: "created_at" },
    { Header: "updated_at", accessor: "updated_at" },
  ];

  // const data = [
  //   { name: "John Doe", age: 30, country: "USA" },
  //   { name: "Jane Smith", age: 25, country: "Canada" },
  //   { name: "Alice Johnson", age: 28, country: "Australia" },
  //   { name: "Bob Brown", age: 32, country: "UK" },
  //   { name: "Charlie Davis", age: 27, country: "Germany" },
  //   { name: "David Clark", age: 33, country: "France" },
  //   { name: "Eva Adams", age: 26, country: "Italy" },
  //   { name: "Fayla Lee", age: 29, country: "Spain" },
  //   { name: "George Green", age: 24, country: "Japan" },
  //   { name: "Hannah Moore", age: 31, country: "Brazil" },
  // ];
  return (
    <>
      <div className="flex flex-col items-center h-full ">
        <h3 className="text-xl sm:text-4xl md:text3xl font-extrabold shrink tracking-widest">
          PRODUCT LIST
        </h3>

        <Table columns={columns} data={data} rowsPerPage={10} />
      </div>
    </>
  );
};

export default Product;
