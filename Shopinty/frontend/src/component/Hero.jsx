import React from 'react';
import { FaCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Hero({ heroData, heroCount, setHeroCount, heroDataLength = 4 }) {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/collection');
  };

  const dotIndices = Array.from({ length: heroDataLength }, (_, i) => i);

  return (
    <div className='w-full h-full relative flex flex-col items-center justify-center'>

      {/* Hero Text */}
      <div className='absolute left-4 sm:left-10 md:left-[10%] top-[20px] md:top-[100px] lg:top-[150px] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[40%]'>
        <p 
          className='text-[#ffcc00] font-bold uppercase tracking-wide mb-2 drop-shadow-lg break-words'
          style={{ fontSize: 'clamp(1rem, 4vw, 3rem)' }} // dynamic font scaling
        >
          {heroData?.text1 || ""}
        </p>
        <p 
          className='text-white font-extrabold drop-shadow-2xl leading-tight break-words'
          style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }} // dynamic font scaling
        >
          {heroData?.text2 || ""}
        </p>
      </div>

      {/* Shop Now Button and Dots */}
      <div className='absolute bottom-6 sm:bottom-12 flex flex-col items-center justify-center'>
        <button
          onClick={handleShopNowClick}
          className='mb-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-semibold text-sm md:text-base uppercase rounded-full hover:scale-105 transition-transform duration-300 shadow-xl'
        >
          Shop Now
        </button>

        <div className='flex items-center justify-center gap-3'>
          {dotIndices.map((index) => (
            <FaCircle
              key={index}
              className={`w-[14px] h-[14px] cursor-pointer ${heroCount === index ? "fill-white" : "fill-white/60"} transition-all duration-300`}
              onClick={() => setHeroCount(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
