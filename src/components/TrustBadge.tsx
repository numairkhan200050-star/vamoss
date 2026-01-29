import React from 'react';

const TrustBadge = () => {
  return (
    <div className="bg-black px-6 py-3 flex items-center gap-4 border border-gray-800 shadow-lg">
      {/* The Cash Icon from your screenshot */}
      <div className="flex-shrink-0">
        <div className="w-10 h-7 border-2 border-[#FFD700] rounded-sm flex items-center justify-center relative">
          <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
          <div className="absolute -left-1 top-1 w-1 h-4 bg-black" />
          <div className="absolute -right-1 top-1 w-1 h-4 bg-black" />
        </div>
      </div>

      {/* The Text Section */}
      <div className="flex flex-col">
        <span className="text-[#FFD700] text-sm font-black uppercase tracking-tight leading-none">
          CASH ON DELIVERY
        </span>
        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1 leading-none">
          DELIVERY ALL OVER PAKISTAN
        </span>
      </div>
    </div>
  );
};

export default TrustBadge;
