import { useEffect, useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    sku: "",
    product_name: "",
    size: "",
    color: "",
    initial_stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value, // Use the name of the field to update the specific property
    }));
  };

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <>
      <div className="flex flex-col overflow-x-auto justify-evenly items-center space:evenly h-screen w-80 border-2 border-slate-500 rounded-lg shrink">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="sku"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            id="sku"
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a unique SKU code"
            aria-describedby="sku-description"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="product_name"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            Product Name
          </label>
          <input
            type="text"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            id="product_name"
            minLength="3"
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the product name"
            aria-describedby="product-name-description"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="size"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            Size
          </label>
          <input
            type="text"
            name="size"
            id="size"
            value={productData.size}
            onChange={handleChange}
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the size"
            aria-describedby="size-description"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="color"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            Color
          </label>
          <input
            type="text"
            name="color"
            id="color"
            value={productData.color}
            onChange={handleChange}
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the color"
            aria-describedby="color-description"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="initial_stock"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            Initial Stock
          </label>
          <input
            type="number"
            name="initial_stock"
            id="initial_stock"
            value={productData.initial_stock}
            onChange={handleChange}
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the Initial_Stock"
            aria-describedby="initial_stock-description"
          />
        </div>
        <div className="flex gap-5 w-full shrink justify-center mt-1">
          <button
            type="submit"
            // onClick={loginToggle}
            className="px-4 py-2 w-20 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ADD
          </button>
          <button
            // onClick={handleCancel}
            className=" px-4 py-2 w-20 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
