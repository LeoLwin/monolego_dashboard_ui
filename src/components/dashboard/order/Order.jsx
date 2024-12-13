import { useState } from "react";

/* eslint-disable react/prop-types */
const Order = ({ data, onClose }) => {
  // eslint-disable-next-line no-unused-vars
  const [promoPercentage, setPromoPercentage] = useState(null);

  console.log("Data : ", data);
  return (
    <>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center h-full justify-center z-50 h-screen overflow-auto">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg  gap-1 max-h-full overflow-auto">
          <h2 className="text-2xl font-bold mb-4">ORDER</h2>

          {/* First Row */}
          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="sku"
                  className="text-sm decoration-solid capitalize font-bold px-1"
                >
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={data.sku}
                  // onChange={handleChange}
                  className="border-2 border-slate-500 rounded-lg p-1 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  // placeholder="Enter the sku"
                  aria-describedby="size-description"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="product_name"
                  className="text-sm decoration-solid capitalize font-bold px-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={data.product_name}
                  // onChange={handleChange}
                  className="border-2 border-slate-500 rounded-lg p-1 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  // placeholder="Enter the sku"
                  aria-describedby="size-description"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="size"
                  className="text-sm decoration-solid capitalize font-bold px-1"
                >
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  value={data.size}
                  // onChange={handleChange}
                  className="border-2 border-slate-500 rounded-lg p-1 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  // placeholder="Enter the sku"
                  aria-describedby="size-description"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="color"
                  className="text-sm decoration-solid capitalize font-bold px-1"
                >
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={data.color}
                  // onChange={handleChange}
                  className="border-2 border-slate-500 rounded-lg p-1 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  // placeholder="Enter the sku"
                  aria-describedby="size-description"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="price"
                  className="text-sm decoration-solid capitalize font-bold px-1"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={data.price}
                  // onChange={handleChange}
                  className="border-2 border-slate-500 rounded-lg p-1 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  // placeholder="Enter the sku"
                  aria-describedby="price-description"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="promoPercentage"
                  className="text-sm decoration-solid capitalize font-bold px-1"
                >
                  Promo-Percentage
                </label>
                <input
                  type="number"
                  name="price"
                  value={promoPercentage}
                  // onChange={handleChange}
                  className="border-2 border-slate-500 rounded-lg p-1 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  // placeholder="Enter the sku"
                  aria-describedby="price-description"
                />
              </div>

              <div className="flex gap-5 w-full shrink justify-start mt-1">
                <button
                  type="submit"
                  // onClick={saveStock}
                  className="px-2 w-20 h-8 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {/* {editAble ? "UPDATE" : "ADD"} */}
                  DONE
                </button>
                <button
                  onClick={onClose}
                  className=" px-2 w-20 h-8 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div>
              <img src="" alt="" />
              {/* make me image  and pdf filew */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
