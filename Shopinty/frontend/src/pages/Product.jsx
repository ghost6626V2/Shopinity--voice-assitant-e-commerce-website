import React from "react";
import LatestCollection from "../component/LatestCollection";
import BestSeller from "../component/BestSeller";

function Product() {
  return (
    <div className="w-full flex flex-col items-center justify-start py-10 font-sans px-4 sm:px-10">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-16">
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black-700 mb-6 text-center drop-shadow-md">
            LATEST COLLECTION
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-10"></div>
          <LatestCollection />
        </div>

        <div className="w-full mt-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black-700 mb-6 text-center drop-shadow-md">
            BEST SELLERS
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-10"></div>
          <BestSeller />
        </div>
      </div>
    </div>
  );
}

export default Product;
