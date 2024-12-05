const AddSaleProduct = () => {
  return (
    <>
      <div className="flex flex-col border-2 border-slate-500 w-full rounded-md h-full p-5">
        <div className="flex flex-col sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full justify-evenly flex-wrap">
          {/* Child components go here */}

          {/* First Col */}
          <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-4">
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
                //   value={productData.product_name}
                //   onChange={handleChange}
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
                //   value={productData.product_name}
                //   onChange={handleChange}
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
                //   value={productData.stock_from_production}
                //   onChange={handleChange}
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
                //   value={productData.price}
                //   onChange={handleChange}
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
                //   value={productData.remarks}
                //   onChange={handleChange}
                id="remarks"
                minLength="3"
                className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the remarks"
                aria-describedby="remarks-description"
              />
            </div>
            <div className="flex gap-5 w-full shrink justify-center mt-1 mt-5">
              <button
                type="submit"
                // onClick={saveStock}
                className="px-4 py-2 w-20 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {/* {editAble ? "UPDATE" : "ADD"} */}
              </button>
              <button
                // onClick={handleCancel}
                className=" px-4 py-2 w-20 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Second Col */}
          <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-2">
            {/* Inner First col */}
            <div className="flex flex-col gap-2 sm:flex-row md:flex-row">
              <div className="flex rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-48 h-52 items-center justify-center">
                <label
                  htmlFor="upload"
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
                  <span className="text-gray-600 font-medium">Upload file</span>
                </label>
                <input id="upload" type="file" className="hidden" />
              </div>
              <div className="flex rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-48 h-52 items-center justify-center">
                <label
                  htmlFor="upload"
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
                  <span className="text-gray-600 font-medium">Upload file</span>
                </label>
                <input id="upload" type="file" className="hidden" />
              </div>
            </div>
            {/* Inner Second Col */}
            <div className="flex flex-col gap-2 sm:flex-row md:flex-row">
              <div className="flex rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-48 h-52 items-center justify-center">
                <label
                  htmlFor="upload"
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
                  <span className="text-gray-600 font-medium">Upload file</span>
                </label>
                <input id="upload" type="file" className="hidden" />
              </div>
              <div className="flex rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-48 h-52 items-center justify-center">
                <label
                  htmlFor="upload"
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
                  <span className="text-gray-600 font-medium">Upload file</span>
                </label>
                <input id="upload" type="file" className="hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSaleProduct;
