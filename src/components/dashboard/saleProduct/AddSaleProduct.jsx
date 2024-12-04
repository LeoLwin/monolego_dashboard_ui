const AddSaleProduct = () => {
  return (
    <>
      <div className="flex flex-col border-2 border-slate-500 w-full rounded-md h-full p-5">
        <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full w:3/4">
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
        </div>
      </div>
    </>
  );
};

export default AddSaleProduct;
