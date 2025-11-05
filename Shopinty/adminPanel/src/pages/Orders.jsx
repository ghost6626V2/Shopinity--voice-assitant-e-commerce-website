import React, { useState, useEffect, useContext } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { FaBoxOpen, FaBars } from "react-icons/fa";
import { authDataContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700 border-green-400';
      case 'Shipped':
      case 'Out for delivery':
        return 'bg-blue-100 text-blue-700 border-blue-400';
      case 'Packing':
      case 'Order Placed':
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-400';
    }
  };

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );
      setOrders(result.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { withCredentials: true }
      );
      if (result.data) {
        toast.success("Order status updated");
        fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 font-sans flex">
      <Nav />
      
      <div className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className={`flex-1 flex flex-col transition-all duration-300 md:ml-64`}>
        <button
          className="fixed top-[80px] left-4 z-50 bg-gray-800 p-3 rounded-full shadow-xl hover:bg-gray-700 transition duration-300 md:hidden"
          onClick={toggleSidebar}
        >
          <FaBars className="text-white text-xl" />
        </button>

        <div className={`pt-[100px] px-4 sm:px-6 md:px-8 py-8 transition-all duration-300`}>
          <div className="w-full bg-gradient-to-r bg-black rounded-2xl py-4 sm:py-6 px-4 mb-8 shadow-lg text-center sticky top-[80px] z-30">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Customer Orders
            </h1>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 animate-pulse text-lg py-10">
              Loading Orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-10">
              No orders found.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="w-full bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300
                            p-4 sm:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-start"
                >
                  <div className="flex items-start justify-between md:flex-col md:justify-start md:col-span-1 border-b md:border-b-0 pb-3 md:pb-0 border-gray-100">
                    <FaBoxOpen className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 flex-shrink-0" />
                    <span className="text-xs text-gray-500 truncate mt-2 md:mt-4 md:order-last">ID: {order._id.slice(-8)}</span>
                    <span className="text-xs text-gray-500 mt-1 md:hidden">{new Date(order.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex flex-col text-gray-700 text-sm sm:text-base gap-1 md:col-span-1 min-w-0">
                    <p className='font-bold text-gray-900 mb-1'>Items ({order.items.length}):</p>
                    {order.items.map((item, idx) => (
                      <p key={idx} className='truncate'>
                        <span className="font-medium text-blue-600">{item.name}</span> × {item.quantity}{' '}
                        <span className="text-gray-500 text-xs">({item.size})</span>
                      </p>
                    ))}
                  </div>

                  <div className="text-xs sm:text-sm text-gray-600 leading-snug md:col-span-1 w-full">
                    <p className='font-bold text-gray-900 mb-1'>Shipping:</p>
                    <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
                    <p>{order.address.street},</p>
                    <p>
                      {order.address.city}, {order.address.state}, {order.address.pinCode}
                    </p>
                    <p className="mt-1">📞 {order.address.phone}</p>
                  </div>

                  <div className="text-sm text-gray-700 md:col-span-1 w-full">
                    <p className='font-bold text-gray-900 mb-1'>Summary:</p>
                    <p className='hidden md:block text-xs'>Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p>Method: <span className='font-medium text-amber-600'>{order.paymentMethod}</span></p>
                    <p>
                      Payment:{' '}
                      <span className={`${order.payment ? 'text-green-500' : 'text-red-500'} font-bold`}>
                        {order.payment ? 'Done' : 'Pending'}
                      </span>
                    </p>
                    <p className="text-xl text-blue-600 font-extrabold mt-2">₹ {order.amount}</p>
                  </div>

                  <div className="flex flex-col items-start gap-2 md:col-span-1 w-full md:w-auto">
                    <p className='font-bold text-gray-900 mb-1'>Status:</p>
                    <select
                      value={order.status}
                      onChange={(e) => statusHandler(e, order._id)}
                      className={`w-full px-3 py-2 rounded-lg text-sm border-2 font-semibold transition-all duration-200 ${getStatusColor(order.status)}`}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
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

export default Orders;
