import React from "react";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  const policies = [
    {
      title: "Easy Exchange Policy",
      description:
        "Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.",
      icon: <RiExchangeFundsLine className="text-white text-3xl" />,
      color: "bg-blue-500",
    },
    {
      title: "7 Days Return Policy",
      description: "Shop with Confidence – 7 Days Easy Return Guarantee.",
      icon: <TbRosetteDiscountCheckFilled className="text-white text-3xl" />,
      color: "bg-purple-500",
    },
    {
      title: "Best Customer Support",
      description: "Trusted Customer Support – Your Satisfaction Is Our Priority.",
      icon: <BiSupport className="text-white text-3xl" />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-50 px-6 sm:px-10 py-20">
      <div className="text-center mb-12">
     <h1 className="text-3xl sm:text-4xl font-extrabold text-black-700 mb-4 text-center drop-shadow-md">
  OUR POLICY
</h1>

        <p className="text-gray-700 text-lg sm:text-xl">
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 bg-white"
          >
            <div
              className={`${policy.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md`}
            >
              {policy.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {policy.title}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurPolicy;
