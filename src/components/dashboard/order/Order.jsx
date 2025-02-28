import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import ConfirmationModal from "../../models/ConfirmationModal";

/* eslint-disable react/prop-types */
const Order = ({ data, onClose, order, head, promotion, isReturn }) => {
  const { accessToken, userData } = useAuth();
  const [showError, setShowError] = useState("");
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({
    id: "",
    qty: "",
    order: order,
    promoPercentage: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "qty" && value < 0) return; // Prevent negative values
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDoneClick = () => {
    setShowModal(true); // Open the modal
  };

  const saveOrder = async () => {
    try {
      // if (!areAllFieldsValid()) {
      //   setShowError("All fields must be filled out and valid.");
      //   return;
      // }

      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
      let result;

      if (isReturn) {
        console.log("data : ",data);
        console.log("IsReturn : ", isReturn);
        console.log("PayLoad : ", {
          spId: data.sp_id,
          qty: orderData.qty,
        },)
        // return
        // order/holdReturn
        result = await axios.post(
          `${serverDomain}/lego/order/holdReturn`,
          {
            id: data.sp_id,
            qty: orderData.qty,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Result :", result.data);
        console.log("Result :", result.data.code);
        if (result.data.code == "200") {
          setCode("green");
          setShowError(result.data.message);
          setOrderData({
            qty: "",
            order: order,
            promoPercentage: 0,
          });
        } else {
          setCode("red");
          setShowError(result.data.message);
        }
        setShowError(result.data.message);
        return;
      }
      // return

      result = await axios.post(
        `${serverDomain}/lego/order/order`,
        {
          id: data.id || data.sp_id,
          qty: orderData.qty,
          order: order,
          promoPercentage: orderData.promoPercentage,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Result :", result.data);
      console.log("Result :", result.data.code);
      if (result.data.code == "200") {
        setCode("green");
        if (order) {
          downloadAsImage();
        }
        setShowError(result.data.message);
        setOrderData({
          qty: "",
          order: order,
          promoPercentage: 0,
        });
      } else {
        setCode("red");
        setShowError(result.data.message);
      }
      setShowError(result.data.message);

      // editAble = false;
    } catch (error) {
      console.log(error);
    }
  };

  const downloadAsImage = () => {
    console.log("DownloadAsImage");
    const element = document.getElementById("voucher-div");
    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "voucher.png";
      link.click();
    });
  };

  // eslint-disable-next-line no-unused-vars
  const downloadAsPDF = () => {
    const element = document.getElementById("voucher-div");
    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(image, "PNG", 0, 0, width, height);
      pdf.save("voucher.pdf");
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
      setShowError("");
    }, 5000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center h-full justify-center z-50 h-screen overflow-auto">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg  gap-1 max-h-full overflow-auto">
          <h2 className="text-2xl font-bold mb-4">{head}</h2>
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              saveOrder();
              setShowModal(false);
            }}
          />

          {/* First Row */}
          <div className="flex sm:flex-row gap-2 flex-col">
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
                />
              </div>
              {promotion && (
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
                    readOnly
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="promoPercentage"
                  className="text-sm decoration-solid capitalize font-bold px-1"
                >
                  Qty
                </label>
                <input
                  type="number"
                  name="qty"
                  value={orderData.qty}
                  onChange={handleChange}
                  className="border-2 border-slate-500 rounded-lg p-1 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  // placeholder="Enter the sku"
                />
              </div>

              {promotion && (
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="promoPercentage"
                    className="text-sm decoration-solid capitalize font-bold px-1"
                  >
                    Promo-Percentage
                  </label>
                  <input
                    type="number"
                    name="promoPercentage"
                    value={orderData.promoPercentage}
                    onChange={handleChange}
                    className="border-2 border-slate-500 rounded-lg p-1 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    // placeholder="Enter the sku"
                  />
                </div>
              )}

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

              <div className="flex gap-5 w-full shrink justify-start mt-1">
                <button
                  type="submit"
                  onClick={handleDoneClick}
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

            {order && (
              <div>
                <div className="flex flex-col items-center space-y-4 p-6">
                  {/* Voucher Div */}
                  <div
                    id="voucher-div"
                    className="w-80 p-6 bg-white rounded-lg shadow-md border border-gray-200 "
                  >
                    <div className="flex flex-row  justify-center items-center">
                      <h2 className="text-1xl w-full font-bold text-gray-700">
                        APK <br />T SHIRT
                      </h2>
                      <h2 className="text-4xl w-full font-bold text-gray-700">
                        VOUCHER
                      </h2>
                    </div>
                    <div className="flex flex-col justify-start">
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          SKU :{" "}
                        </span>
                        {data.sku}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          Product_Name :{" "}
                        </span>
                        {data.product_name}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          Price :{" "}
                        </span>
                        {Number(data.price).toLocaleString()}/Ks
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          Size :{" "}
                        </span>
                        {data.size}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          Color :{" "}
                        </span>
                        {data.color}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          Qty :{" "}
                        </span>
                        {orderData.qty || 0}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          Total :{" "}
                        </span>
                        {Number(orderData.qty * data.price).toLocaleString()}/Ks
                        {/* Show 0 if qty is undefined */}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          PromoPercentage:
                        </span>
                        {orderData.promoPercentage}%
                        {/* Show 0 if qty is undefined */}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          Actual Total Price:{" "}
                        </span>
                        {(
                          Number(orderData.qty) *
                          Number(data.price) *
                          (1 - Number(orderData.promoPercentage || 0) / 100)
                        ).toLocaleString()}
                        /Ks
                      </p>

                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-bold text-indigo-500">
                          Order By <br />
                        </span>
                        {userData.name}
                        <br />
                        <span className="font-bold text-indigo-500">
                          Date <br />
                        </span>
                        <span className="font-bold text-indigo-500">
                          {new Date().toLocaleDateString()} &nbsp;{" "}
                          {new Date().toLocaleTimeString("en-US", {
                            hour12: false,
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* make me image  and pdf filew */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
