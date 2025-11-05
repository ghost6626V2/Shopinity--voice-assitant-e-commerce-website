import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { FaBars } from "react-icons/fa";

function Lists() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchList = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true,
      });
      setList(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeList = async (id) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );
      if (result.data) {
        fetchList();
      } else {
        console.log("Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-50 text-gray-900 overflow-x-hidden flex">
      <div
        className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
        <Nav />

        <button
          className="fixed top-[80px] left-4 z-50 bg-gray-800 p-3 rounded-full shadow-xl hover:bg-gray-700 transition duration-300 md:hidden"
          onClick={toggleSidebar}
        >
          <FaBars className="text-white text-xl" />
        </button>

        <div className="pt-[100px] px-4 sm:px-6 md:px-8 py-6 transition-all duration-300">
          <div className="w-full bg-gradient-to-r bg-black rounded-2xl py-4 sm:py-6 px-4 mb-8 shadow-md text-center sticky top-[80px] z-30">
            <h1 className="text-xl sm:text-3xl font-bold text-white">
              All Listed Products
            </h1>
          </div>

          {loading ? (
            <div className="w-full flex justify-center items-center py-16 sm:py-20">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-500">
                Loading products...
              </h2>
            </div>
          ) : list?.length === 0 ? (
            <div className="w-full flex justify-center items-center py-16 sm:py-20">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-500 text-center">
                No products listed yet.
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {list.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="w-full rounded-lg mb-4 flex items-center justify-center bg-gray-100 p-2 overflow-hidden aspect-square">
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>

                  <div className="text-center flex flex-col flex-grow justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate px-2">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base mt-1">
                        {item.category}
                      </p>
                      <p className="text-amber-600 font-bold mt-2 text-xl sm:text-2xl">
                        ₹ {item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => removeList(item._id)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 self-stretch text-sm sm:text-base"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lists;
