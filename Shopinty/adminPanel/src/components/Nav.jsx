import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

function Nav() {
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { getAdmin } = useContext(adminDataContext);

  const logOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(result.data);
      toast.success("Logged Out Successfully");
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout Failed");
    }
  };

  return (
    <nav
      className="
        w-full fixed top-0 left-0 h-[70px] sm:h-[80px]
        bg-gradient-to-r from-yellow-200 to-amber-400 
        flex items-center justify-between 
        px-4 sm:px-6 md:px-10 py-2 sm:py-0 
        shadow-xl 
        z-50
      "
    >
      <div
        onClick={() => navigate('/')}
        className="
          flex items-center justify-start 
          gap-2 sm:gap-3 cursor-pointer
        "
      >
        <img
          src={logo}
          alt='Shopinity Logo'
          className='w-8 h-8 sm:w-10 sm:h-10 object-contain'
        />
        <h1
          className='text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 tracking-wide drop-shadow-md font-sans'
        >
          Shopinity
        </h1>
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={logOut}
          className="
            bg-amber-100 hover:bg-red-600 hover:text-white 
            text-black px-3 py-1 sm:px-4 sm:py-2 rounded-md font-semibold text-sm sm:text-base
            transition duration-300
          "
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Nav;