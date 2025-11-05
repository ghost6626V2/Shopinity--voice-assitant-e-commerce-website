import React, { useEffect, useState, useRef } from "react";
import Backgound from "../component/Backgound";
import Hero from "../component/Hero";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import NewLetterBox from "../component/NewLetterBox";
import Footer from "../component/Footer";

function Home() {
  const [heroCount, setHeroCount] = useState(0);
  const productRef = useRef(null);

  const heroData = [];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) =>
        prevCount === heroData.length - 1 ? 0 : prevCount + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [heroData.length]);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-white">
      <div className="h-[70px] sm:h-[80px] w-full" />

      <Backgound heroCount={heroCount} />

      <div className="absolute top-[70px] sm:top-[80px] w-full flex flex-col items-center justify-center text-center h-[60vh] sm:h-[70vh] z-10">
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>

      <div ref={productRef} className="w-full mt-6 sm:mt-10">
        <Product />
      </div>

      <div className="mt-16">
        <OurPolicy />
      </div>

      <div className="mt-16">
        <NewLetterBox />
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
