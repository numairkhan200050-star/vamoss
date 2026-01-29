import React from 'react';
import { Truck, Banknote } from 'lucide-react';

const TrustBadge = () => {
  return (
    <div className="flex items-center gap-3 bg-white border-2 border-black p-2 pr-4 luxury-shadow-sm select-none">
      {/* Icon Section */}
      <div className="bg-black text-[#FFD700] p-2">
        <Banknote size={24} strokeWidth={2.5} />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center">
        <span className="text-[11px] font-black uppercase tracking-tighter leading-none text-black">
          Cash on Delivery
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest leading-none text-gray-400 mt-1">
          Pay Upon Arrival
        </span>
      </div>
      
      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-[#FFD700]" />
    </div>
  );
};

export default TrustBadge;
