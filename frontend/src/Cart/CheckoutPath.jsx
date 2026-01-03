import React from 'react';
import { FaShippingFast } from "react-icons/fa";
import { LuCopyCheck } from "react-icons/lu";
import { CiBank } from "react-icons/ci";

function CheckoutPath({ activePath = 0 }) {
  const path = [
    {
      label: "Shipping Details",
      icon: <FaShippingFast />,
    },
    {
      label: "Confirm Order",
      icon: <LuCopyCheck />,
    },
    {
      label: "Payment",
      icon: <CiBank />,
    },
  ];

  return (
    <div className="flex justify-center items-center gap-6 py-6 bg-white shadow-md">
      {path.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col items-center text-sm font-medium ${index <= activePath
              ? "text-green-600 font-semibold"
              : "text-gray-500"
            }`}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center text-xl rounded-full border-2 ${index <= activePath
                ? "border-green-600 bg-green-100 text-green-600"
                : "border-gray-300 bg-gray-100"
              }`}
          >
            {step.icon}
          </div>
          <span className="mt-2">{step.label}</span>
        </div>
      ))}
    </div>
  );
}

export default CheckoutPath;
