import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';

function Order() {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/userorder',
        {},
        { withCredentials: true }
      );

      if (result.data) {
        let allOrdersItem = [];

        result.data.forEach((order) => {
          order.items.forEach((item) => {
            item.orderId = order._id;
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="w-screen min-h-screen bg-gray-50 pt-[120px] pb-10 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="w-full text-center mb-8">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                />

                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Size: <span className="font-medium text-gray-700">{item.size}</span> | Qty: <span className="font-medium text-gray-700">{item.quantity}</span>
                  </p>
                  <p className="text-md font-medium text-gray-700 mt-1">
                    Unit Price: <span className="font-bold">{currency}{item.price}</span>
                  </p>
                  <p className="text-xl font-bold text-blue-600 mt-2">
                    Total: {currency}{item.price * item.quantity}
                  </p>
                </div>

                <div className="sm:w-1/3 flex flex-col items-start sm:items-end space-y-2">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <p className="text-xs text-gray-500">
                    Placed On: <span className="font-medium">{formatDate(item.date)}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Payment: <span className="font-medium">{item.paymentMethod} ({item.payment ? 'Paid' : 'Unpaid'})</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Order ID: {item.orderId}
                  </p>

                  <button
                    onClick={() => alert(`Tracking order: ${item.orderId}`)}
                    className="mt-2 px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                  >
                    Track Order 🚀
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-20 p-8 bg-white rounded-xl shadow-lg">
            <p className="text-xl text-gray-600 font-medium">No orders found. Start shopping! 🛒</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => (window.location.href = '/')}
            >
              Go to Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
