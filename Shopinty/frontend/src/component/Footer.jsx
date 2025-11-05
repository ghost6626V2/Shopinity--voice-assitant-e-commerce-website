import React from 'react';
import logo from '../assets/logo.png';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <div className="w-full bg-gray-900 text-gray-100 px-6 sm:px-20 py-12">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="flex flex-col gap-4">
          <img src={logo} alt="OneCart Logo" className="w-20 h-20 object-contain"/>
          <h2 className="text-xl font-bold">Shopinity</h2>
          <p className="text-gray-400 text-sm">
            Shopinity is your all-in-one online shopping destination. Quality products, unbeatable deals, and fast delivery—all backed by trusted service.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <span className="hover:text-blue-500 cursor-pointer">Home</span>
          <span className="hover:text-blue-500 cursor-pointer">About Us</span>
          <span className="hover:text-blue-500 cursor-pointer">Delivery</span>
          <span className="hover:text-blue-500 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-blue-500 cursor-pointer">Contact</span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
          <div className="flex items-center gap-2">
            <FaPhone className="text-blue-500" />
            <span>+91-7701999189</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <span>contact@shopinity.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-blue-500 hidden md:block" />
            <span className="hidden md:block">+1-123-456-7890</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500 hidden md:block" />
            <span className="hidden md:block">admin@onecart.com</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-gray-300">
            <FaFacebook className="hover:text-blue-500 cursor-pointer text-xl" />
            <FaTwitter className="hover:text-blue-500 cursor-pointer text-xl" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer text-xl" />
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; 2025 Shopinity. All Rights Reserved. Designed by Karan Tripathi.
      </div>
    </div>
  );
}

export default Footer;
