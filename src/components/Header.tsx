import React, { useState } from 'react';
import { Menu, X, ShoppingBag, ChevronUp, ChevronDown, User, Search } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { CategoryDropdown } from './CategoryDropdown';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white z-[110] sticky top-0 border-b-2 border-black">
      {/* 1. TOP AD BANNER */}
      <div className="bg-black text-[#D4AF37] text-[10px] py-2 text-center font-black uppercase tracking-[0.2em] relative z-[120]">
        🔥 FLAT 25% OFF - LIMITED TIME OFFER - ORDER NOW 🔥
      </div>

      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative">
        {/* 2. CATEGORY MENU BUTTON (LEFT) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-2 p-2 border-2 transition-all duration-300 ${
              isMenuOpen ? 'bg-black text-white border-black' : 'border-transparent hover:border-black'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="hidden md:block font-black uppercase text-[11px] tracking-widest">
              {isMenuOpen ? 'Close' : 'Categories'}
            </span>
          </button>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Kevin11
          </h1>
        </div>

        {/* 3. FOMO NAVIGATION (CENTER) */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Smart Gadgets', 'Beauty', 'Best Sellers', 'New Arrivals'].map((item) => (
            <a 
              key={item} 
              href={`/collection/${item.toLowerCase().replace(' ', '-')}`}
              className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* USER & CART (RIGHT) */}
        <div className="flex items-center gap-5">
          <button className="hover:text-[#D4AF37] transition-colors">
            <User size={22} />
          </button>
          <div className="relative cursor-pointer group">
            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 bg-black text-[#D4AF37] text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-[#D4AF37]">
              0
            </span>
          </div>
        </div>

        {/* DYNAMIC DROPDOWN COMPONENT */}
        <CategoryDropdown isOpen={isMenuOpen} />
      </div>

      {/* 4. FLOATING SEARCH BAR AREA (BELOW) */}
      <div className="max-w-3xl mx-auto px-4 pb-4">
        <div className="flex flex-col items-center">
          {isSearchOpen && (
            <div className="w-full transform transition-all duration-300 ease-out origin-top">
              <SearchBar />
            </div>
          )}
          
          {/* THE NAVIGATIONAL CHEVRON (COLLAPSE BUTTON) */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="mt-[-14px] z-[120] bg-white border-2 border-black rounded-full p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#D4AF37] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            {isSearchOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};
