import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";

function CartSummary() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);

  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  return (
    <div
      className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg mx-auto text-center"
      aria-label="Order summary"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">
            {currency} {subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-medium">
            {currency} {delivery_fee}
          </span>
        </div>

        <div className="border-t pt-3 flex justify-between items-center font-semibold text-lg">
          <span>Total</span>
          <span>
            {currency} {subtotal === 0 ? 0 : total}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
