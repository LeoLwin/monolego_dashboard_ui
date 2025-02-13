const PasswordChange = () => {
  return (
    <>
      <div className="flex flex-col items-center h-full shrink overflow-x-auto">
        <div className="flex flex-row mt-10 w-full mb-2 w-auto sm:w-full items-start justify-start  sm:mt-10 md:mt-10 lg:mt-0"></div>
        <div className="flex justify-center items-center p-5">
          <h3 className="text-xl sm:text-3xl md:text2xl font-extrabold shrink tracking-wide">
            UPDATE PASSWORD
          </h3>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="sku"
            className="text-sm sm:text-base underline decoration-solid capitalize font-bold px-2"
          >
            EMAIL
          </label>
          <input
            type="text"
            name="sku"
            // value={productData.sku}
            // onChange={handleChange}
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
            OLD PASSWORD
          </label>
          <input
            type="password"
            name="product_name"
            // value={productData.product_name}
            // onChange={handleChange}
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
            NEW PASSWORD
          </label>
          <input
            type="password"
            name="size"
            id="size"
            // value={productData.size}
            // onChange={handleChange}
            className="border-2 border-slate-500 rounded-lg p-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the size"
            aria-describedby="size-description"
          />
        </div>      

        <div className="flex gap-5 w-full shrink justify-center mt-2">
          <button
            type="submit"
            // onClick={saveStock}
            className="px-4 py-2 w-20 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            UPDATE
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

export default PasswordChange;
