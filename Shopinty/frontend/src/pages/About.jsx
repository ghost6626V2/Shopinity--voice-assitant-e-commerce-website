import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-white pt-[100px] gap-20 px-4 md:px-10 lg:px-20'>
      <Title text1={'ABOUT'} text2={'US'} />

      <div className='w-full flex flex-col lg:flex-row items-center gap-10'>
        <div className='lg:w-1/2 w-full flex justify-center'>
          <img src={about} alt="About Us" className='lg:w-[80%] w-[90%] rounded-xl shadow-lg border border-gray-200' />
        </div>

        <div className='lg:w-1/2 w-full flex flex-col gap-6 text-gray-800'>
          <p className='text-md md:text-lg leading-relaxed'>
            Shopinity is born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, Shopinity makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='text-md md:text-lg leading-relaxed'>
            We cater to modern shoppers—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>
          <h3 className='text-xl md:text-2xl font-bold text-blue-600 mt-4'>Our Mission</h3>
          <p className='text-md md:text-lg leading-relaxed'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. Shopinity connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>

      <div className='w-full flex flex-col items-center gap-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-8'>
          <div className='lg:w-1/3 w-full p-6 flex flex-col gap-4 items-start bg-blue-50 border border-blue-200 rounded-xl hover:scale-105 transition-transform duration-300'>
            <h4 className='text-lg md:text-xl font-bold text-blue-600'>Quality Assurance</h4>
            <p className='text-sm md:text-md text-gray-700'>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>

          <div className='lg:w-1/3 w-full p-6 flex flex-col gap-4 items-start bg-blue-50 border border-blue-200 rounded-xl hover:scale-105 transition-transform duration-300'>
            <h4 className='text-lg md:text-xl font-bold text-blue-600'>Convenience</h4>
            <p className='text-sm md:text-md text-gray-700'>Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.</p>
          </div>

          <div className='lg:w-1/3 w-full p-6 flex flex-col gap-4 items-start bg-blue-50 border border-blue-200 rounded-xl hover:scale-105 transition-transform duration-300'>
            <h4 className='text-lg md:text-xl font-bold text-blue-600'>Exceptional Customer Service</h4>
            <p className='text-sm md:text-md text-gray-700'>Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.</p>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default About
