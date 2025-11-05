import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt, FaHome } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) { 
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Add Items", path: "/add", icon: IoIosAddCircleOutline },
    { name: "List Items", path: "/lists", icon: FaRegListAlt },
    { name: "View Orders", path: "/orders", icon: SiTicktick },
  ];

  return (
    <>
      <div 
        onClick={toggleSidebar} 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>

      <div
        className={`
          fixed top-0 left-0 
          w-64 min-h-screen 
          bg-white border-r border-gray-200 shadow-xl
          flex flex-col pt-[80px] px-4
          z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 
          md:w-64
        `}
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 768) { // Close sidebar on mobile after navigation
                    toggleSidebar();
                }
              }}
              className="
                flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer 
                bg-gray-50 hover:bg-blue-100 hover:text-blue-700
                transition duration-300 shadow-sm
              "
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-blue-700 transition" />
              <p className="font-semibold text-sm sm:text-[15px] text-gray-800">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;