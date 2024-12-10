import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";
import axios from "axios";

const AddSaleProduct = ({ data, editAble }) => {
  const { accessToken } = useAuth();
  const [showError, setShowError] = useState("");
  const [code, setCode] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [saleData, setSaleData] = useState({
    sku: "",
    product_name: "",
    stock_from_production: "",
    price: "",
    remarks: "",
  });

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the uploaded file
      const updatedImages = [...images];
      updatedImages[index] = imageUrl; // Update the specific index
      setImages(updatedImages);
    }
  };

  // Handle image reset
  const handleResetImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null; // Reset the image at the specified index
    setImages(updatedImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaleData((prevData) => ({
      ...prevData,
      [name]: value, // Use the name of the field to update the specific property
    }));
  };

  const handleCancel = () => {
    setSaleData({
      sku: "",
      product_name: "",
      stock_from_production: "",
      price: "",
      remarks: "",
    });
    setImages([null, null, null, null]);
    // setShowError("");
  };

  const saveStock = async () => {
    try {
      // if (!areAllFieldsValid()) {
      //   setShowError("All fields must be filled out and valid.");
      //   return;
      // }

      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
      let result;

      if (editAble) {
        // result = await axios.put(
        //   `${serverDomain}/lego/stock/update/${data.id}`,
        //   {
        //     sku: productData.sku,
        //     product_name: productData.product_name,
        //     size: productData.size,
        //     color: productData.color,
        //     initial_stock: productData.initial_stock,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${accessToken}`,
        //     },
        //   }
        // );
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

  useEffect(() => {
    console.log(saleData);
    // const timer = setTimeout(() => {
    //   setShowError("");
    // }, 5000);

    // return () => clearTimeout(timer);
  }, [saleData]);
  return (
    <>
      <div className="flex flex-col border-2 border-slate-500 w-full rounded-md h-full p-5 flex-wrap overflow-x-auto">
        <div className="flex flex-col sm:flex-row md:flex-row gap-1 max-w-full justify-evenly flex-wrap">
          {/* Child components go here */}

          {/* First Col */}
          <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-4 shrink">
            <div className="flex flex-col gap-1 w-48">
              <label
                htmlFor="sku"
                className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
              >
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={saleData.sku}
                onChange={handleChange}
                id="sku"
                minLength="3"
                className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the sku"
                aria-describedby="sku-description"
              />
            </div>
            <div className="flex flex-col gap-1 w-48">
              <label
                htmlFor="product_name"
                className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
              >
                Product Name
              </label>
              <input
                type="text"
                name="product_name"
                value={saleData.product_name}
                onChange={handleChange}
                id="product_name"
                minLength="3"
                className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the product name"
                aria-describedby="product-name-description"
              />
            </div>
            <div className="flex flex-col gap-1 w-48">
              <label
                htmlFor="product_name"
                className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
              >
                Stock From Production
              </label>
              <input
                type="text"
                name="stock_from_production"
                value={saleData.stock_from_production}
                onChange={handleChange}
                id="stock_from_production"
                minLength="3"
                className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the Qty"
                aria-describedby="stock_from_production-description"
              />
            </div>
            <div className="flex flex-col gap-1 w-48">
              <label
                htmlFor="price"
                className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
              >
                Price
              </label>
              <input
                type="text"
                name="price"
                value={saleData.price}
                onChange={handleChange}
                id="price"
                minLength="3"
                className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the Price"
                aria-describedby="price-description"
              />
            </div>
            <div className="flex flex-col gap-1 w-48">
              <label
                htmlFor="remarks"
                className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
              >
                Remark
              </label>
              <input
                type="text"
                name="remarks"
                value={saleData.remarks}
                onChange={handleChange}
                id="remarks"
                minLength="3"
                className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the remarks"
                aria-describedby="remarks-description"
              />
            </div>
          </div>

          {/* Second Col */}

          <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-2">
            {/* First row */}
            <div className="flex flex-col gap-2 sm:flex-row md:flex-row">
              {images.slice(0, 2).map((image, index) => (
                <div
                  key={index}
                  className="flex rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-48 h-52 items-center justify-center relative"
                >
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt={`Uploaded preview ${index + 1}`}
                        className="object-cover w-full h-full rounded-md"
                        onDoubleClick={() => handleResetImage(index)}
                      />
                      {/* <button
                        onClick={() => handleResetImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-sm"
                      >
                        ✖
                      </button> */}
                    </>
                  ) : (
                    <label
                      htmlFor={`upload-${index}`}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 fill-white stroke-indigo-500"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-gray-600 font-medium">
                        Upload file
                      </span>
                    </label>
                  )}
                  <input
                    id={`upload-${index}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, index)}
                  />
                </div>
              ))}
            </div>
            {/* Second row */}
            <div className="flex flex-col gap-2 sm:flex-row md:flex-row">
              {images.slice(2, 4).map((image, index) => (
                <div
                  key={index + 2}
                  className="flex rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-48 h-52 items-center justify-center relative"
                >
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt={`Uploaded preview ${index + 3}`}
                        className="object-cover w-full h-full rounded-md"
                        onDoubleClick={() => handleResetImage(index + 2)}
                      />
                      {/* <button
                        onClick={() => handleResetImage(index + 2)}
                        className="absolute top-2 right-2 bg-red-300 text-white rounded-full  text-xs"
                      >
                        ✖
                      </button> */}
                    </>
                  ) : (
                    <label
                      htmlFor={`upload-${index + 2}`}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 fill-white stroke-indigo-500"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-gray-600 font-medium">
                        Upload file
                      </span>
                    </label>
                  )}
                  <input
                    id={`upload-${index + 2}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, index + 2)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-5 w-full shrink justify-center mt-1 mt-5 ">
            <button
              type="submit"
              // onClick={saveStock}
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
      </div>
    </>
  );
};

export default AddSaleProduct;
