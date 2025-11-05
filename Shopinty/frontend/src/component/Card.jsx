import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function Card({ name, price, image, id }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-[200px] sm:max-w-[220px] bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer
                 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300" // Added max-width to allow full width on very small screens if needed
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Product Image */}
      <div className="w-full h-[180px] md:h-[220px] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-gray-900 font-semibold text-base md:text-lg truncate hover:text-blue-600 transition-colors">
          {name}
        </h3>
        <p className="text-blue-600 font-bold text-lg md:text-xl tracking-wide">
          {currency} {price}
        </p>
      </div>
    </div>
  );
}

export default Card;