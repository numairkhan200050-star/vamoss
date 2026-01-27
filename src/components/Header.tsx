import React from 'react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center tracking-tighter">
              <span className="text-6xl font-black italic text-black uppercase">Kevin</span>
              <span className="text-6xl font-black text-[#D4AF37] inline-block transform -rotate-12 ml-2 hover:rotate-0 transition-transform duration-500 cursor-default">11</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-0.5 w-10 bg-[#D4AF37]"></div>
              <p className="text-black font-bold uppercase tracking-[0.3em] text-xs">Premium Collection | Pakistan</p>
            </div>
          </div>

          {/* Value Proposition Badge */}
          <div className="bg-black px-10 py-6 border border-black flex items-center gap-5 shadow-xl group hover:bg-[#D4AF37] transition-colors duration-300">
            <div className="text-left">
              <p className="text-[#D4AF37] group-hover:text-black font-black leading-tight uppercase text-sm tracking-widest transition-colors">Cash on Delivery</p>
              <p className="text-gray-400 group-hover:text-black text-xs font-medium mt-1 uppercase transition-colors">Delivery All Over Pakistan</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
