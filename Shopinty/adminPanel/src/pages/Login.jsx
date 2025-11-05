import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading'; 

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const AdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Admin login successful!");
      getAdmin();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-sans flex flex-col items-center justify-center relative
                     bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-100
                     animate-gradient-x overflow-auto p-4 sm:p-8">

      <div className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105">
        <img src={logo} alt="Shopinity Logo" className="w-10 h-10 sm:w-14 sm:h-14" />
        <h1 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 tracking-wide">
          Shopinity
        </h1>
      </div>

      <div className="w-full max-w-sm sm:max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl 
                      p-8 sm:p-10 flex flex-col items-center border border-white/30 my-20">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 tracking-wide">Admin Login</h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">Enter your credentials to access the dashboard</p>

        <form onSubmit={AdminLogin} className="flex flex-col w-full gap-4 sm:gap-5">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
                       focus:ring-purple-500 shadow-sm placeholder-gray-400 text-gray-900 transition duration-300"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
                         focus:ring-purple-500 shadow-sm placeholder-gray-400 text-gray-900 transition duration-300"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show ? (
              <IoEyeOutline
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition w-5 h-5"
                onClick={() => setShow(true)}
              />
            ) : (
              <IoEye
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition w-5 h-5"
                onClick={() => setShow(false)}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 sm:py-4 rounded-full 
                       font-semibold shadow-lg hover:scale-[1.02] transform transition duration-300 mt-3
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loading /> : "Login"}
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-xs sm:text-sm text-center">
          &copy; 2025 Shopinity. All rights reserved.
        </p>
      </div>

      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 10s ease infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Login;
