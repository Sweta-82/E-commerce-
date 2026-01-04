import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [paymentMethod, setPaymentMethod] = useState("COD"); // 'COD' or 'Online'
  const [loading, setLoading] = useState(false);

  const orderInfo = JSON.parse(sessionStorage.getItem("oderItems"));

  // Check if order info exists, else redirect
  useEffect(() => {
    if (!orderInfo) {
      navigate("/cart");
    }
  }, [navigate, orderInfo]);

  const paymentData = {
    amount: Math.round(orderInfo?.total * 100), // Razorpay expects amount in paise
  };

  const order = {
    shippingInfo: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: shippingInfo.country,
      pincode: shippingInfo.pinCode ? shippingInfo.pinCode.toString() : "",
      phoneNo: shippingInfo.phoneNumber ? parseInt(shippingInfo.phoneNumber) : 0,
    },
    orderItems: cartItems,
    itemPrice: orderInfo?.subtotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.total,
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("DEBUG ORDER PAYLOAD:", order);
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (paymentMethod === "COD") {
        order.paymentInfo = {
          id: "COD",
          status: "Not Paid",
        };

        await axios.post("/api/v1/new/order", order, config);
        setLoading(false);
        toast.success("Order Placed Successfully!");
        navigate("/success");
      } else {
        // Online Payment (Razorpay)
        const res = await loadRazorpay();
        if (!res) {
          toast.error("Razorpay SDK failed to load. Are you online?");
          setLoading(false);
          return;
        }

        const { data: { key } } = await axios.get("/api/v1/payment/apikey");
        const { data: { order: razorpayOrder } } = await axios.post(
          "/api/v1/payment/process",
          paymentData,
          config
        );

        const options = {
          key: key,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "E-Commerce App",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            try {
              order.paymentInfo = {
                id: response.razorpay_payment_id,
                status: "succeeded",
              };

              await axios.post("/api/v1/new/order", order, config);
              setLoading(false);
              toast.success("Payment Succeeded & Order Placed!");
              navigate("/success");
            } catch (error) {
              setLoading(false);
              toast.error("Order creation failed after payment. Please contact support.");
              console.error(error);
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: shippingInfo.phoneNumber,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
          theme: {
            color: "#121212",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          toast.error(response.error.description || "Payment Failed");
          setLoading(false)
        });
        rzp1.open();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong processing payment");
      console.error(error);
    }
  };

  return (
    <>
      <PageTitle title={"Payment"} />
      <Navbar />
      <CheckoutPath activePath={2} />
      <ToastContainer position="bottom-right" />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Choose Your Payment Method
        </h2>

        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
          <div className="space-y-4 mb-8">
            {/* COD Option */}
            <div
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === "COD"
                ? "border-black bg-gray-50 ring-2 ring-black"
                : "border-gray-200 hover:border-black"
                }`}
              onClick={() => setPaymentMethod("COD")}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="w-5 h-5 text-black focus:ring-black"
              />
              <span className="ml-4 text-lg font-medium text-gray-800">
                Cash on Delivery
              </span>
            </div>

            {/* Online Option */}
            <div
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === "Card"
                ? "border-black bg-gray-50 ring-2 ring-black"
                : "border-gray-200 hover:border-black"
                }`}
              onClick={() => setPaymentMethod("Card")}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={() => setPaymentMethod("Card")}
                className="w-5 h-5 text-black focus:ring-black"
              />
              <span className="ml-4 text-lg font-medium text-gray-800">
                Online (Razorpay)
              </span>
            </div>
          </div>

          <Button
            onClick={submitHandler}
            disabled={loading}
            text={loading ? "Processing..." : `Pay ₹${orderInfo?.total || 0} /-`}
            className={`w-full text-white font-semibold py-3 px-6 rounded-xl transition duration-300 border-none ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
              }`}
          />

          <Link
            to="/order/conform"
            className="block text-center text-blue-600 hover:underline mt-6"
          >
            Go Back
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
