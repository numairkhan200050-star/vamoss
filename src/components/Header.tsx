import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Menu, ShoppingCart } from 'lucide-react';
import { SearchBar } from './SearchBar'; // We will build this next

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  return (
    <header className="w-full bg-white border-b-2 border-black sticky top-0 z-50">
      {/* TOP AD BAR (Naheed Style) */}
      <div className="bg-black text-white text-[10px] py-1.5 text-center font-black uppercase tracking-[0.2em]">
        🔥 FLAT 25% OFF - LIMITED TIME OFFER - ORDER NOW 🔥
      </div>

      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">Kevin11</h1>
        </div>

        {/* DYNAMIC SEARCH AREA */}
        <div className={`flex items-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'flex-grow' : 'w-10'}`}>
          {isSearchOpen ? (
            <div className="flex items-center w-full gap-2">
              <SearchBar />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 bg-gray-100 hover:bg-black hover:text-white transition-colors border border-black"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 border-2 border-black bg-white hover:bg-[#D4AF37] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Search size={20} />
            </button>
          )}
        </div>

        {/* MENU & CART icons */}
        <div className="flex items-center gap-6">
          <button className="hidden md:block font-bold uppercase text-xs hover:underline">Track Order</button>
          <div className="relative cursor-pointer">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </div>
          <Menu size={24} className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};
