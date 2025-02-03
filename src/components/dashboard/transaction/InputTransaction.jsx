import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";

// eslint-disable-next-line react/prop-types
const InputTransaction = ({ data, editAble }) => {
  const { accessToken } = useAuth();
  const [productData, setProductData] = useState({
    sku: "",
    transaction_date: "",
    transaction_type: "",
    quantity_in: 0,
    quantity_out: 0,
    remarks: "",
  });
  const [showError, setShowError] = useState("");
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validatedValue = Math.max(0, value);

    if (
      name === "quantity_in" &&
      validatedValue > 0 &&
      productData.quantity_out > 0
    ) {
      setShowError("You can only fill Quantity In or Quantity Out, not both!");
      return;
    }

    if (
      name === "quantity_out" &&
      validatedValue > 0 &&
      productData.quantity_in > 0
    ) {
      setShowError("You can only fill Quantity In or Quantity Out, not both!");
      return;
    }

    if ((name === "quantity_out" || name === "quantity_in") && value < 0) {
      return; // Prevent updating the state
    }

    setProductData((prevData) => ({
      ...prevData,
      [name]: value, // Use the name of the field to update the specific property
    }));
  };

  const areAllFieldsValid = () => {
    for (const [key, value] of Object.entries(productData)) {
      if (key === "quantity_in" || key === "quantity_out") {
        if (value < 0) {
          setShowError("Quantities must be non-negative.");
          return false;
        }
      }

      if (key === "transaction_date") {
        const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
        if (!dateRegex.test(value)) {
          setShowError("Transaction date format must be YYYY/MM/DD");
          return false; // Invalid date format
        }
      }

      if (typeof value === "number" && value < 0) {
        setShowError("Numeric fields must be non-negative.");
        return false;
      }

      if (typeof value === "string" && value.trim().length === 0) {
        setShowError("Text fields cannot be empty.");
        return false;
      }
    }

    setShowError(""); // Clear error if all validations pass
    return true; // All fields are valid
  };

  const saveStock = async () => {
    try {
      if (!areAllFieldsValid()) {
        // Error message is already set by `setShowError` inside the function
        return;
      }

      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
      let result;

      console.log("PayLoad : ", {
        sku: productData.sku,
        transaction_date: productData.transaction_date,
        transaction_type: productData.transaction_type,
        quantity_in: productData.quantity_in,
        quantity_out: productData.quantity_out,
        remarks: productData.remarks,
      });

      // if (editAble) {
      //   result = await axios.put(
      //     `${serverDomain}/lego/stock/update/${data.id}`,
      //     {
      //       sku: productData.sku,
      //       product_name: productData.product_name,
      //       size: productData.size,
      //       color: productData.color,
      //       initial_stock: productData.initial_stock,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     }
      //   );
      // } else {
      result = await axios.post(
        `${serverDomain}/lego/transaction/inAndout`,
        {
          sku: productData.sku,
          transaction_date: productData.transaction_date,
          transaction_type: productData.transaction_type,
          quantity_in: productData.quantity_in,
          quantity_out: productData.quantity_out,
          remarks: productData.remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // }

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
      transaction_date: "",
      transaction_type: "",
      quantity_in: 0,
      quantity_out: 0,
      remarks: "", // Reset all fields to their default values
    });
    setShowError("");
  };

  useEffect(() => {
    console.log(productData);
    const timer = setTimeout(() => {
      setShowError("");
      setCode("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [showError, productData]);

  useEffect(() => {
    console.log("EditAble : ", editAble);
    console.log("Data : ", data);
    if (editAble && data) {
      setProductData({
        // eslint-disable-next-line react/prop-types
        sku: data.sku || "",
        transaction_date: "",
        transaction_type: "",
        quantity_in: 0,
        quantity_out: 0,
        remarks: "",
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
            Transaction Date
          </label>
          <input
            type="text"
            name="transaction_date"
            value={productData.transaction_date}
            onChange={handleChange}
            id="transaction_date"
            minLength="3"
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Date must be YYYY/MM/DD."
            aria-describedby="product-name-description"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="transaction_type"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            Transaction Type
          </label>
          <select
            name="transaction_type"
            id="transaction_type"
            value={productData.transaction_type}
            onChange={handleChange}
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby="transaction_type-description"
          >
            <option value="" disabled>
              Select Transaction Type
            </option>
            <option value="Buying">Buying</option>
            <option value="FromProduction">From Production</option>
            <option value="ToProduction">To Production</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="color"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            Quantity In
          </label>
          <input
            type="number"
            name="quantity_in"
            id="quantity_in"
            value={productData.quantity_in}
            onChange={handleChange}
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the quantity_in"
            aria-describedby="quantity_in-description"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="initial_stock"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            Quantity Out
          </label>
          <input
            type="number"
            name="quantity_out"
            id="quantity_out"
            value={productData.quantity_out}
            onChange={handleChange}
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the Quantity_out"
            aria-describedby="quantity_out-description"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="initial_stock"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            Remarks
          </label>
          <input
            type="text"
            name="remarks"
            id="remarks"
            value={productData.remarks}
            onChange={handleChange}
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the remarks"
            aria-describedby="remarks-description"
          />
        </div>
        <div className="flex justify-center items-center p-2 text-center w-full">
          <p
            className={`${
              code == "green" ? "text-green-500" : "text-red-500"
            } font-medium border rounded-md sm:fontsmall`}
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

export default InputTransaction;
