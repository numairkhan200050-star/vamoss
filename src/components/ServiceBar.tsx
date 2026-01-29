import React from 'react';
import { Truck, RotateCcw, Banknote, Headphones } from 'lucide-react';

const services = [
  {
    icon: <Truck size={32} />,
    title: "Fast Shipping",
    desc: "All Over Pakistan"
  },
  {
    icon: <RotateCcw size={32} />,
    title: "Free Returns",
    desc: "Hassle-Free 7 Days"
  },
  {
    icon: <Banknote size={32} />,
    title: "Cash On Delivery",
    desc: "Pay When You Receive"
  },
  {
    icon: <Headphones size={32} />,
    title: "24/7 Support",
    desc: "Dedicated Assistance"
  }
];

const ServiceBar = () => {
  return (
    /* Changed bg-black to a deep charcoal gray bg-[#1a1a1a] */
    <section className="w-full bg-[#121212] border-t border-gray-800 py-12 px-6">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex items-center gap-5 group cursor-default transition-all duration-300"
          >
            {/* Icon Circle Logic:
               1. Default: Gold border, Gold icon.
               2. Hover: Bg becomes Gold, Icon becomes Black.
               3. The "Glow": Added drop-shadow-white to the icon container on hover.
            */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-[#FFD700] flex items-center justify-center text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-black group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-500 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
              {service.icon}
            </div>

            {/* Text Information */}
            <div className="flex flex-col">
              <h3 className="text-gray-100 font-black uppercase tracking-widest text-sm leading-tight group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 font-bold uppercase tracking-tighter text-[10px] mt-1 group-hover:text-gray-400 transition-colors">
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
