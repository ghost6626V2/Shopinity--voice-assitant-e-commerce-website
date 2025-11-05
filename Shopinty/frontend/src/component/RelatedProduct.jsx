import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';
import Card from './Card';

function RelatedProduct({ category, subCategory, currentProductId }) {
  const { products } = useContext(shopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let filteredProducts = products.filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item._id !== currentProductId
      );
      setRelated(filteredProducts.slice(0, 4)); // Take only first 4 related products
    }
  }, [products, category, subCategory, currentProductId]);

  if (related.length === 0) return null;

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 my-16">
      <Title text1="RELATED" text2="PRODUCTS" />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
        {related.map((item) => (
          <div
            key={item._id}
            className="w-full max-w-[220px] bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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

export default RelatedProduct;
