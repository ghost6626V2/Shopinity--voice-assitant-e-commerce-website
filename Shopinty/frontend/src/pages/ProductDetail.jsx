import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt, FaHeadset } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import Loading from "../component/Loading";

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addtoCart, loading } = useContext(shopDataContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setMainImage(foundProduct.image1);
      }
    }
  }, [products, productId]);

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pt-24 md:pt-28 font-sans">
      <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex flex-col lg:flex-row items-center gap-6 w-full lg:w-1/2 order-1 lg:order-1">
          <div className="flex lg:flex-col flex-row gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 mb-4 lg:mb-0 w-full lg:w-auto">
            {[productData.image1, productData.image2, productData.image3, productData.image4]
              .filter(Boolean)
              .map((img, idx) => (
                <div
                  key={idx}
                  className="min-w-[70px] h-20 md:w-24 md:h-24 border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-transform bg-white"
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>

          <div className="w-full border border-gray-200 rounded-2xl shadow-xl overflow-hidden bg-white">
            <img
              src={mainImage}
              alt="main-product"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col justify-start gap-6 w-full lg:w-1/2 order-2 lg:order-2 pt-6 lg:pt-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-black mt-4 lg:mt-0">
            {productData.name}
          </h1>

          <div className="flex items-center gap-2 text-yellow-400">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
            <span className="text-gray-500 text-sm ml-2">(124 Reviews)</span>
          </div>

          <p className="text-3xl font-bold text-blue-600">
            {currency} {productData.price}
          </p>

          <p className="text-gray-700 text-base md:text-lg italic leading-relaxed border-l-4 border-amber-300 pl-4">
            {productData.description || "Stylish, breathable cotton shirt with modern fit — comfort meets elegance."}
          </p>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-black">Select Size</h3>
            <div className="flex gap-3 flex-wrap">
              {(productData.sizes || []).map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 text-sm sm:text-base rounded-lg border transition duration-300 ${
                    s === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 hover:bg-blue-50 border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-6 w-full sm:w-2/3 md:w-1/2 bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:-translate-y-1"
            onClick={() => addtoCart(productData._id, size)}
          >
            {loading ? <Loading /> : "Add to Cart"}
          </button>

          <div className="border-t border-gray-200 my-6"></div>
          <div className="text-gray-600 text-sm space-y-1">
            <p>✅ 100% Original Product</p>
            <p>💸 Cash on delivery available</p>
            <p>🔁 Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-16 bg-white py-10 shadow-inner">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center hover:text-blue-600 transition-all p-4">
            <h3 className="text-lg font-semibold mb-2 text-black">Payment Options</h3>
            <div className="flex gap-4 text-3xl">
              <GiCash className="text-green-600" />
              <FaCreditCard className="text-blue-600" />
            </div>
            <p className="text-gray-500 text-sm mt-2">Pay securely with Cash, Card, or UPI</p>
          </div>

          <div className="flex flex-col items-center text-center hover:text-blue-600 transition-all p-4">
            <h3 className="text-lg font-semibold mb-2 text-black flex items-center gap-2">
              <RiArrowGoBackLine /> Easy Returns
            </h3>
            <p className="text-gray-500 text-sm">Hassle-free 7-day return and exchange</p>
          </div>

          <div className="flex flex-col items-center text-center hover:text-blue-600 transition-all p-4">
            <h3 className="text-lg font-semibold mb-2 text-black flex items-center gap-2">
              <FaHeadset /> 24/7 Support
            </h3>
            <p className="text-gray-500 text-sm">Always available to help with your order</p>
          </div>
        </div>
      </div>

      <div className="w-full py-12 bg-white">
        <div className="container mx-auto px-4">
          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData._id}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
