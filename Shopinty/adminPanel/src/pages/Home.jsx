import React, { useState, useEffect, useContext } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      setTotalProducts(products.data.length);

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      <div className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className={`flex-1 flex flex-col transition-all duration-300 md:ml-64`}>
        <Nav />

        <button
          className="fixed top-[80px] left-4 z-50 bg-gray-800 p-3 rounded-full shadow-xl hover:bg-gray-700 transition duration-300 md:hidden"
          onClick={toggleSidebar}
        >
          <FaBars className="text-white text-xl" />
        </button>

        <div className={`pt-[100px] px-4 sm:px-6 md:px-8 transition-all duration-300`}>
          <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome to Shopinity Dashboard
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Track your store activity and overview below.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-yellow-300 to-amber-400 text-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">Total Products</h2>
                <p className="text-4xl sm:text-5xl font-bold">{totalProducts}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">Total Orders</h2>
                <p className="text-4xl sm:text-5xl font-bold">{totalOrders}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
