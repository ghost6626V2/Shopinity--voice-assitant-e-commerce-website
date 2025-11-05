import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-white pt-[100px] gap-20 px-4 md:px-10 lg:px-20'>
      <Title text1={'CONTACT'} text2={'US'} />

      <div className='w-full flex flex-col lg:flex-row items-center gap-10'>
        <div className='lg:w-1/2 w-full flex justify-center'>
          <img src={contact} alt="Contact Us" className='lg:w-[75%] w-[90%] rounded-xl shadow-lg border border-gray-200' />
        </div>

        <div className='lg:w-1/2 w-full flex flex-col gap-8'>
          <div className='bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-200'>
            <h3 className='text-xl md:text-2xl font-bold text-blue-600 mb-2'>Our Store</h3>
            <p className='text-md md:text-lg leading-relaxed text-gray-800'>
              Unit 502, Peninsula Business Park
              <br />
              Senapati Bapat Marg, Lower Parel
              Mumbai, Maharashtra 400013, India
            </p>
            <p className='text-md md:text-lg leading-relaxed text-gray-800 mt-2'>
              Tel: +91-7701999189<br />
              Email: admin@shopinity.com
            </p>
          </div>

          <div className='bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-lg border border-yellow-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-200'>
            <h3 className='text-xl md:text-2xl font-bold text-yellow-600 mb-2'>Careers at Shopinity</h3>
            <p className='text-md md:text-lg leading-relaxed text-gray-800'>
              Learn more about our teams and job openings. Join a dynamic and customer-focused team to redefine online shopping.
            </p>
            <button className='mt-4 px-6 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition duration-300 w-max'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default Contact
