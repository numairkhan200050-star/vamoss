import React from 'react';
import { Truck, RotateCcw, Banknote, Headphones } from 'lucide-react';

const services = [
  {
    icon: <Truck size={28} />,
    title: "Fast Shipping",
    desc: "All Over Pakistan"
  },
  {
    icon: <RotateCcw size={28} />,
    title: "Free Returns",
    desc: "Hassle-Free 7 Days"
  },
  {
    icon: <Banknote size={28} />,
    title: "Cash On Delivery",
    desc: "Pay When You Receive"
  },
  {
    icon: <Headphones size={28} />,
    title: "24/7 Support",
    desc: "Dedicated Assistance"
  }
];

const ServiceBar = () => {
  return (
    /* We use bg-[#f2f2f2] - a slightly deeper grey for better text pop */
    <section className="w-full bg-[#f2f2f2] border-t border-gray-200 py-16 px-6">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center lg:flex-row lg:text-left gap-5 group cursor-default"
          >
            {/* ICON CONTAINER: Black fills on hover, Icon turns White */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-300 ease-in-out">
              <div className="transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
            </div>

            {/* TEXT INFO: Optimized for legibility */}
            <div className="flex flex-col">
              <h3 className="text-black font-black uppercase tracking-widest text-[13px] leading-tight mb-1">
                {service.title}
              </h3>
              {/* 1. text-gray-700: Darker grey than before for better contrast.
                2. text-[11px]: Slightly larger for readability.
                3. tracking-normal: Removed 'tighter' so letters have room to breathe.
              */}
              <p className="text-gray-700 font-bold uppercase tracking-wider text-[11px] mt-0.5">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceBar;
