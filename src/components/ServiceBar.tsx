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
    /* BG: bg-[#f4f4f4] provides that soft transition from White content to Black footer */
    <section className="w-full bg-[#f4f4f4] border-t border-gray-200 py-16 px-6">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center lg:flex-row lg:text-left gap-5 group cursor-default"
          >
            {/* ICON LOGIC:
               - Default: Transparent bg, Black border, Black icon.
               - Hover: Black bg, Black border, White icon (Invisible Truck becomes White).
            */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-300 ease-in-out">
              <div className="transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
            </div>

            {/* Text Information */}
            <div className="flex flex-col">
              <h3 className="text-black font-black uppercase tracking-widest text-xs leading-tight mb-1">
                {service.title}
              </h3>
              <p className="text-gray-500 font-bold uppercase tracking-tighter text-[9px]">
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
