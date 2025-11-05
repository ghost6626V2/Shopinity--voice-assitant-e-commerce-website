import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Title from "../component/Title";
import { FaTrash } from "react-icons/fa";
import CartTotal from "../component/CartSummary";

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (let productId in cartItem) {
      for (let size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItem[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  const handleQuantityChange = (id, size, qty) => {
    if (qty < 1) return;
    updateQuantity(id, size, qty);
  };

  const handleRemove = (id, size) => {
    updateQuantity(id, size, 0);
  };

  const totalAmount = cartData.reduce((acc, item) => {
    const product = products.find((p) => p._id === item._id);
    return product ? acc + product.price * item.quantity : acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 pt-[120px] px-4 md:px-12 lg:px-20 py-10">
      <div className="text-center mb-8">
        <Title text1="Your" text2="Cart" />
        <p className="text-gray-500 text-sm sm:text-base">
          Review your selected items and proceed to checkout securely.
        </p>
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-20 text-gray-600 text-lg sm:text-xl font-medium">
          Your cart is empty.{" "}
          <button
            onClick={() => navigate("/collection")}
            className="text-blue-600 underline hover:text-blue-800 ml-1"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 justify-between">
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-5">
            {cartData.map((item, idx) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-200 pb-5"
                >
                  <div
                    className="w-24 h-24 sm:w-36 sm:h-36 flex-shrink-0 cursor-pointer"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-md hover:scale-105 transition"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Size: <span className="font-medium">{item.size}</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                      Price:{" "}
                      <span className="font-medium">
                        {currency}
                        {product.price}
                      </span>
                    </p>

                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.size, item.quantity - 1)
                        }
                        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.size, item.quantity + 1)
                        }
                        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item._id, item.size)}
                        className="text-red-500 hover:text-red-700 transition ml-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full lg:w-[35%] flex flex-col items-center">
            <CartTotal totalAmount={totalAmount} currency={currency} />
            <button
              onClick={() => navigate("/placeorder")}
              className="mt-8 w-full max-w-full lg:max-w-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-800 transition"
            >
              Proceed to Checkout
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              🔒 Secure checkout powered by trusted payment gateways
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
