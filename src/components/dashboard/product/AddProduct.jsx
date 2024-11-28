/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";

const AddProduct = ({ data, editAble }) => {
  const { accessToken } = useAuth();
  const [productData, setProductData] = useState({
    sku: "",
    product_name: "",
    size: "",
    color: "",
    initial_stock: 0,
  });
  const [showError, setShowError] = useState("");
  const [code, setCode] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value, // Use the name of the field to update the specific property
    }));
  };

  const areAllFieldsValid = () => {
    return Object.values(productData).every((value) => {
      if (typeof value === "number") {
        return value > 0; // Check for positive numbers (like stock).
      }
      return value.trim().length > 0; // Check for non-empty strings.
    });
  };

  const saveStock = async () => {
    try {
      if (!areAllFieldsValid()) {
        setShowError("All fields must be filled out and valid.");
        return;
      }

      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
      let result;

      if (editAble) {
        result = await axios.put(
          `${serverDomain}/lego/stock/update/${data.id}`,
          {
            sku: productData.sku,
            product_name: productData.product_name,
            size: productData.size,
            color: productData.color,
            initial_stock: productData.initial_stock,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        result = await axios.post(
          `${serverDomain}/lego/stock/create`,
          {
            sku: productData.sku,
            product_name: productData.product_name,
            size: productData.size,
            color: productData.color,
            initial_stock: productData.initial_stock,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      console.log("Result :", result.data);
      console.log("Result :", result.data.code);
      if (result.data.code == "200") {
        setCode("green");
        handleCancel();
      } else {
        setCode("red");
      }
      setShowError(result.data.message);

      // editAble = false;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setProductData({
      sku: "",
      product_name: "",
      size: "",
      color: "",
      initial_stock: 0, // Reset all fields to their default values
    });
    setShowError("");
  };

  useEffect(() => {
    console.log(productData);
    const timer = setTimeout(() => {
      setShowError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [showError, productData]);

  useEffect(() => {
    if (editAble && data) {
      setProductData({
        sku: data.sku || "",
        product_name: data.product_name || "",
        size: data.size || "",
        color: data.color || "",
        initial_stock: data.initial_stock || 0,
      });
    }
  }, [editAble, data]);

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
        <div className="flex justify-center items-center p-2">
          <p
            className={`${
              code == "green" ? "text-green-500" : "text-red-500"
            } font-medium border rounded-md`}
          >
            {showError}
          </p>
        </div>

        <div className="flex gap-5 w-full shrink justify-center mt-1">
          <button
            type="submit"
            onClick={saveStock}
            className="px-4 py-2 w-20 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editAble ? "UPDATE" : "ADD"}
          </button>
          <button
            onClick={handleCancel}

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
