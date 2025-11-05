import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  }

  return (
    <div className="w-full flex justify-center mt-20 px-6 sm:px-20">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-10 sm:p-16 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full opacity-30 animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Subscribe now & get 20% off
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl mb-8 max-w-2xl">
            Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
          </p>

          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 w-full max-w-lg"
          >
            <div className="relative flex-1">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400 transition duration-300 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold rounded-full px-8 py-4 shadow-lg transform transition duration-300 hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewLetterBox;
