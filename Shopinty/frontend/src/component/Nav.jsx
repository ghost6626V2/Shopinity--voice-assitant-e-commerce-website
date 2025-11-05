import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { userDataContext } from "../context/UserContext";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  const { userData, setUserData } = useContext(userDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setUserData(null);
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ to, text }) => (
    <span
      className="cursor-pointer text-black hover:text-[#333333] transition-all duration-300 relative group"
      onClick={() => {
        navigate(to);
        setMenuOpen(false);
      }}
    >
      {text}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300"></span>
    </span>
  );

  return (
    <nav className="w-full fixed top-0 left-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-400 backdrop-blur-md shadow-md flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-10 py-3 z-[9999] transition-all duration-300">
      <div
        className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-md"
        />
        <h1 className="text-2xl sm:text-4xl font-extrabold text-black tracking-wide drop-shadow-sm">
          Shopinity
        </h1>
      </div>

      {!showSearch && (
        <div className="hidden sm:flex gap-8 text-black text-base sm:text-lg font-semibold">
          <NavLink to="/" text="Home" />
          <NavLink to="/collection" text="Collections" />
          {userData && <NavLink to="/order" text="My Orders" />}
          <NavLink to="/about" text="About Us" />
          <NavLink to="/contact" text="Contact Us" />
        </div>
      )}

      {showSearch && (
        <div className="flex-1 flex justify-center relative mt-2 sm:mt-0 px-2 sm:px-0">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-3/5 md:w-1/2 lg:w-1/3 p-2 sm:p-3 rounded-full border-2 border-black bg-[#FFF8DC] text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition duration-300 shadow-md"
            autoFocus
          />
          {search && (
            <FaTimes
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-black hover:text-red-600 transition duration-300"
              onClick={() => setSearch("")}
            />
          )}
        </div>
      )}

      <div className="flex items-center gap-4 sm:gap-6 relative text-black text-lg sm:text-xl">
        <FaSearch
          className="cursor-pointer hover:text-[#333333] transition-all duration-300 text-xl sm:text-2xl"
          onClick={() => {
            setShowSearch((prev) => !prev);
            navigate("/collection");
          }}
        />

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className="hover:text-[#333333] transition duration-300 text-xl sm:text-2xl" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#B71C1C] text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-sm">
              {getCartCount()}
            </span>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold cursor-pointer shadow-md hover:scale-105 transition-transform duration-300"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {userData ? userData.name.charAt(0).toUpperCase() : <FaUserCircle />}
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 sm:w-36 bg-[#FFFDE7] border border-yellow-400 rounded-xl shadow-lg py-2 z-50 animate-fadeIn">
              {!userData ? (
                <button
                  className="w-full text-left px-4 py-2 text-black hover:bg-yellow-100 text-sm sm:text-base transition duration-200"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              ) : (
                <button
                  className="w-full text-left px-4 py-2 text-black hover:bg-yellow-100 text-sm sm:text-base transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>

        {!showSearch && (
          <div
            className="sm:hidden text-2xl cursor-pointer ml-2 hover:text-[#333333] transition duration-300"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        )}
      </div>

      {!showSearch && menuOpen && (
        <div className="sm:hidden flex flex-col w-full bg-[#FFFDE7] rounded-md shadow-lg py-3 text-black font-semibold text-center animate-slideDown">
          <span
            className="py-2 hover:text-[#333333] cursor-pointer"
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            Home
          </span>
          <span
            className="py-2 hover:text-[#333333] cursor-pointer"
            onClick={() => {
              navigate("/collection");
              setMenuOpen(false);
            }}
          >
            Collections
          </span>
          {userData && (
            <span
              className="py-2 hover:text-[#333333] cursor-pointer"
              onClick={() => {
                navigate("/order");
                setMenuOpen(false);
              }}
            >
              My Orders
            </span>
          )}
          <span
            className="py-2 hover:text-[#333333] cursor-pointer"
            onClick={() => {
              navigate("/about");
              setMenuOpen(false);
            }}
          >
            About Us
          </span>
          <span
            className="py-2 hover:text-[#333333] cursor-pointer"
            onClick={() => {
              navigate("/contact");
              setMenuOpen(false);
            }}
          >
            Contact Us
          </span>
        </div>
      )}
    </nav>
  );
}

export default Nav;
