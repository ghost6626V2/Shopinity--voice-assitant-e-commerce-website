import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartSummary";
import razorpay from "../assets/Razorpay.jpg";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        const { data } = await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          response,
          { withCredentials: true }
        );
        if (data) {
          navigate("/order");
          setCartItem({});
          toast.success("Payment Successful 🎉");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          );
          if (result.data) {
            setCartItem({});
            toast.success("Order placed successfully! 🎉");
            navigate("/order");
          } else {
            toast.error("Order placement failed ❌");
          }
          setLoading(false);
          break;

        case "razorpay":
          const resultRazorpay = await axios.post(
            serverUrl + "/api/order/razorpay",
            orderData,
            { withCredentials: true }
          );
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data);
            toast.success("Redirecting to Razorpay 💳");
          }
          setLoading(false);
          break;

        default:
          setLoading(false);
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong 😞");
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen w-full bg-gray-50 flex flex-col items-center py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 mt-6"
      >
        {/* Delivery Information */}
        <div className="flex-1 bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-black mb-4">
            Delivery Information
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Enter your details below to complete the order.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
              required
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
              required
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email Address"
            required
            className="border p-3 rounded-lg w-full mt-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder="Street"
            required
            className="border p-3 rounded-lg w-full mt-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              required
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              required
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={onChangeHandler}
              placeholder="Pincode"
              required
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              required
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder="Phone Number"
            required
            className="border p-3 rounded-lg w-full mt-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Order Summary & Payment */}
        <div className="flex-1 flex flex-col items-center">
          <CartTotal />
          <div className="w-full bg-white p-8 rounded-3xl shadow-lg mt-6">
            <h2 className="text-3xl font-extrabold text-black mb-4">
              Payment Method
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Choose your preferred payment option.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                type="button"
                onClick={() => setMethod("razorpay")}
                className={`flex items-center justify-center gap-3 border-2 rounded-lg px-6 py-3 text-sm font-semibold transition
                ${
                  method === "razorpay"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <img src={razorpay} alt="razorpay" className="w-8 h-8" />
                Razorpay
              </button>

              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`flex items-center justify-center gap-3 border-2 rounded-lg px-6 py-3

                ${
                  method === "cod"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                💵 Cash on Delivery
              </button>
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition"
            >
              {loading ? <Loading /> : "Place Order"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-3">
              🔒 Secure Checkout • Fast Delivery • 24/7 Support
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
