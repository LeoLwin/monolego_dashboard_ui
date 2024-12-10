/* eslint-disable react/prop-types */
export const SalePrductDetail = ({ data, onClose }) => {
  console.log("SaleProductDetail : ", data);
  return (
    <>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 h-screen overflow-auto">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg  gap-1 max-h-full overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>

          {/* First Row */}
          <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full">
            <div className="flex flex-row border-2 border-slate-500 rounded-md p-1 ">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                ID :
              </label>
              <p className="ml-5">{data.id}</p>
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                SKU :
              </label>
              <p>{data.sku}</p>
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                NAME :
              </label>
              <p>{data.product_name}</p>
            </div>
          </div>
          {/* Second Row */}
          <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full">
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                From Production:
              </label>
              <p>{data.stock_from_production}</p>
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                Initial Stock :
              </label>
              <p>{data.initial_stock}</p>
            </div>
          </div>

          <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full">
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                Available :
              </label>
              <p>{data.stock_available}</p>
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                Adhustment :
              </label>
              <p>{data.stock_adjustment}</p>
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                InOrder :
              </label>
              <p>{data.stock_inorder}</p>
            </div>

            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                SoldOut :
              </label>
              <p>{data.stock_soldout}</p>
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                On Hold :
              </label>
              <p>{data.stock_onhold}</p>
            </div>
          </div>

          <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full">
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                Price :
              </label>
              <p>{data.price}</p>
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                Size :
              </label>
              <p>{data.size}</p>
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                Color :
              </label>
              <p>{data.color}</p>
            </div>

            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <label htmlFor="id" className="shrink-0 text-base font-medium">
                Remark :
              </label>
              <p>{data.remarks}</p>
            </div>
          </div>
          <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full">
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full items-center justify-center">
              <img
                src={data.img_1}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full items-center justify-center">
              <img
                src={data.img_2}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
              <img
                src={data.img_3}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full ">
              <img
                src={data.img_4}
                alt=""
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-4 py-2 w-24 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
