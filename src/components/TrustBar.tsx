import React from 'react';
import { Truck, RotateCcw, Banknote, Headphones } from 'lucide-react';

export const TrustBar = () => {
  const features = [
    {
      icon: <Truck size={32} className="text-gray-700" />,
      title: "Fast Shipping",
      desc: "Shipped In 1-3 Days"
    },
    {
      icon: <RotateCcw size={32} className="text-gray-700" />,
      title: "Free Returns",
      desc: "Free 7 Days Return"
    },
    {
      icon: <Banknote size={32} className="text-gray-700" />,
      title: "Payment On Delivery",
      desc: "Cash On Delivery Option"
    },
    {
      icon: <Headphones size={32} className="text-gray-700" />,
      title: "Customer Support",
      desc: "Phone and Email"
    }
  ];

  return (
    <div className="w-full bg-white border-t-2 border-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div key={index} className="flex items-center justify-center gap-4 text-center md:text-left border-b md:border-b-0 md:border-r last:border-0 border-gray-100 pb-6 md:pb-0 md:pr-4">
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h4 className="font-black text-sm uppercase text-gray-900 leading-tight">{item.title}</h4>
              <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
