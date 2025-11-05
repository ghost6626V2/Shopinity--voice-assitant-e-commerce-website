import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="w-full text-center px-4 md:px-10">
      <p className="text-gray-600 text-sm md:text-base mt-2 max-w-[700px] mx-auto mb-8">
        Step into style – Explore our newest products dropping this season. Exclusive designs, premium quality, and modern innovation await.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {latestProducts.map((item, index) => (
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

export default LatestCollection;
