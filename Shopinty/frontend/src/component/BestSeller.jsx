import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter((item) => item.bestseller);
    setBestSeller(filteredProducts.slice(0, 4));
  }, [products]);

  return (
    <div className="w-full text-center mt-6 px-4 md:px-10">
      {/* Description */}
      <p className="text-gray-600 text-sm md:text-base mt-2 max-w-[700px] mx-auto mb-8">
        Tried, Tested, Loved! Discover our all-time best sellers that customers keep coming back for.
      </p>

      {/* Cards Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {bestSeller.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-[240px] bg-white rounded-3xl shadow-md overflow-hidden cursor-pointer
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <Card
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
