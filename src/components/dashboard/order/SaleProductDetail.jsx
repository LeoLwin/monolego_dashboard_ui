import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../models/ConfirmationModal";

/* eslint-disable react/prop-types */
export const SaleProductDetail = ({ data, onClose, check, order = null }) => {
  console.log("Is order : ", order);
  const { accessToken, userData } = useAuth();
  const [showError, setShowError] = useState("");
  const [isError, setIsError] = useState(false);
  const [code, setCode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionStatus, setActionStatus] = useState(false);
  // console.log("UserData : ", userData);
  // console.log("Data : ", data);
  // console.log("data.approveBy : ", data.approveBy);
  // console.log("serData.id : ", userData.id);
  // console.log("data.holdBy : ", data.holdBy);
  // console.log("userData.id == data.holdBy : ", userData.user_id == data.holdBy);
  // console.log("action :", order);

  const action = async (order_status) => {
    console.log("order Staus : ", order_status);
    console.log("Order Status === true", order_status == true);
    if (typeof order_status !== "boolean") {
      setShowError("Invalid input: order_status must be a boolean.");
      setIsError(true);
    }

    const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
    let result;
    if (order) {
      console.log("Order");
      console.log("PayLoad : ", {
        id: data.id,
        order: order_status,
      });

      result = await axios.post(
        `${serverDomain}/lego/order/action`,
        {
          id: data.id,
          order: order_status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } else {
      console.log("Hold");
      console.log("PayLoad : ", {
        id: data.id,
        status: order_status,
      });
      result = await axios.post(
        `${serverDomain}/lego/order/holdAction`,
        {
          id: data.id,
          status: order_status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
    console.log("reuslt : ", result);

    if (result.data.code != "200") {
      setShowError(result.data.message);
      setIsError(true);
      setCode("green");
    }
    setCode("red");
    setShowError(result.data.message);
    setCode(result.data.code);
  };

  const handleDoneClick = () => {
    setShowModal(true); // Open the modal
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
      setShowError("");
      setCode(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showError, isError]);

  return (
    <>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center h-full justify-center z-50 overflow-auto">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg  gap-1 max-h-full overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>

          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              action(actionStatus);
              setShowModal(false);
            }}
          />

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
          {check === true ? (
            ""
          ) : (
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
          )}

          {/*Third Row*/}
          {check === true ? (
            ""
          ) : (
            <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full">
              <div className="flex flex-row flex-wrap border-2 border-green-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full bg-green-500 ">
                <label htmlFor="id" className="shrink-0 text-base font-medium">
                  Available :
                </label>
                <p>{data.stock_available}</p>
              </div>
              <div className="flex flex-row flex-wrap border-2 border-slate-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full bg-slate-500 text-white">
                <label htmlFor="id" className="shrink-0 text-base font-medium">
                  Adjustment :
                </label>
                <p>{data.stock_adjustment}</p>
              </div>
              <div className="flex flex-row flex-wrap border-2 border-yellow-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full bg-yellow-500 ">
                <label htmlFor="id" className="shrink-0 text-base font-medium">
                  InOrder :
                </label>
                <p> {data.stock_inorder}</p>
              </div>

              <div className="flex flex-row flex-wrap border-2 border-red-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full bg-red-500 text-white">
                <label htmlFor="id" className="shrink-0 text-base font-medium">
                  SoldOut :
                </label>
                <p>{data.stock_soldout}</p>
              </div>
              <div className="flex flex-row flex-wrap border-2 border-amber-500 rounded-md p-1 shrink-0 overflow-hidden max-w-full bg-amber-500">
                <label htmlFor="id" className="shrink-0 text-base font-medium">
                  On Hold :
                </label>
                <p>{data.stock_onhold}</p>
              </div>
            </div>
          )}

          {/*Fourth Row*/}

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

          {check === true ? (
            <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full">
              <div className="flex flex-row flex-wrap bg-yellow-300 border border-yellow-400 rounded-md p-1 shrink-0 overflow-hidden max-w-full">
                <label htmlFor="id" className="shrink-0 text-base font-medium">
                  OrderBy :
                </label>
                <p>{data.user}</p>
              </div>
              {data.approveBy == null ? (
                ""
              ) : (
                <div
                  className={`flex flex-row flex-wrap ${
                    data.status == "reject" ? "bg-red-300" : "bg-green-300"
                  } border border-green-400 rounded-md p-1 shrink-0 overflow-hidden max-w-full`}
                >
                  <label
                    htmlFor="id"
                    className="shrink-0 text-base font-medium"
                  >
                    Action By :
                  </label>
                  <p>{data.approve_user}</p>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col flex-wrap sm:flex-row md:flex-row gap-1 shrink-0 overflow-hidden max-w-full">
            <div className="flex rounded-md border border-indigo-500 bg-gray-50 p-1 shadow-md w-48 h-52 items-center justify-center relative">
              <img
                src={data.img_1}
                alt=""
                className="w-full h-full object-cover border-2 border-slate-200 rounded-md"
              />
            </div>
            <div className="flex rounded-md border border-indigo-500 bg-gray-50 p-1 shadow-md w-48 h-52 items-center justify-center relative">
              <img
                src={data.img_2}
                alt=""
                className="w-full h-full object-cover border-2 border-slate-200 rounded-md"
              />
            </div>
            <div className="flex rounded-md border border-indigo-500 bg-gray-50 p-1 shadow-md w-48 h-52 items-center justify-center relative">
              <img
                src={data.img_3}
                alt=""
                className="w-full h-full object-cover border-2 border-slate-200 rounded-md"
              />
            </div>

            <div className="flex rounded-md border border-indigo-500 bg-gray-50 p-1 shadow-md w-48 h-52 items-center justify-center relative">
              <img
                src={data.img_4}
                alt=""
                className="w-full h-full object-cover border-2 border-slate-200 rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-center items-center p-2">
            <p
              className={`${
                isError == "" ? "hide" : "block"
              } font-medium border rounded-md ${
                code == "green"
                  ? "text-green-500 bg-green-100"
                  : "text-red-500 bg-red-100"
              }`}
            >
              {showError}
            </p>
          </div>

          {check === true &&
          data.approveBy == null &&
          userData.role_name === "admin" ? (
            <div className="flex flex-row gap-2">
              <button
                onClick={() => {
                  // action(true);
                  setActionStatus(true);
                  handleDoneClick();
                }}
                className="mt-4 bg-green-600 text-white px-4 py-2 w-auto text-xl text-semibold rounded hover:bg-green-800"
              >
                <i className="fa-solid fa-check"></i>
              </button>
              <button
                onClick={() => {
                  // action(false);
                  setActionStatus(false);
                  handleDoneClick();
                }}
                className="mt-4 bg-red-400 text-white px-4 py-2 w-auto text-xl text-semibold rounded hover:bg-red-600"
              >
                <i className="fa-solid fa-x"></i>
              </button>
              <button
                onClick={onClose}
                className="mt-4 bg-blue-500 text-white px-4 py-2 w-auto rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="mt-4 bg-blue-500 text-white px-4 py-2 w-24 rounded hover:bg-blue-600"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </>
  );
};
