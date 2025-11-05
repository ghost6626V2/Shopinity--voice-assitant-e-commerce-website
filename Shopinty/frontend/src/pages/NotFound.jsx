import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b  flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-md w-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-2xl">
        {/* 404 Text */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-blue-600 mb-4">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-8 px-2">
          The page you’re looking for doesn’t exist, was moved, or might be
          temporarily unavailable.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium sm:font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default NotFound;
