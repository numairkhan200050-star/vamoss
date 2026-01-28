import React, { useState } from 'react';
import { Menu, ShoppingBag, ChevronUp, ChevronDown, User } from 'lucide-react';
import { SearchBar } from './SearchBar';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  return (
    <header className="w-full bg-white z-50 sticky top-0 border-b-2 border-black">
      {/* 1. TOP BANNER */}
      <div className="bg-black text-[#D4AF37] text-[10px] py-2 text-center font-black uppercase tracking-[0.2em]">
        🔥 FLAT 25% OFF - LIMITED TIME OFFER - ORDER NOW 🔥
      </div>

      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* 2. HOME/MENU BUTTON (Left) */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 group p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all">
            <Menu size={24} />
            <span className="hidden md:block font-black uppercase text-[10px] tracking-widest">Categories</span>
          </button>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Kevin11</h1>
        </div>

        {/* 3. FOMO LINKS (Center) */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Gadgets', 'Beauty', 'Men\'s Care', 'New Arrivals'].map((item) => (
            <a 
              key={item} 
              href={`/collection/${item.toLowerCase().replace(' ', '-')}`}
              className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black hover:border-b-2 border-[#D4AF37] transition-all"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CART & USER (Right) */}
        <div className="flex items-center gap-5">
          <button className="hover:text-[#D4AF37] transition-colors"><User size={22} /></button>
          <div className="relative cursor-pointer group">
            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 bg-black text-[#D4AF37] text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-[#D4AF37]">
              0
            </span>
          </div>
        </div>
      </div>

      {/* 4. FLOATING SEARCH BAR (Collapsible with Chevron) */}
      <div className="max-w-3xl mx-auto px-4 pb-4">
        <div className="flex flex-col items-center">
          {isSearchOpen && (
            <div className="w-full animate-in slide-in-from-top duration-300">
              <SearchBar />
            </div>
          )}
          
          {/* THE COLLAPSE CHEVRON (Circle button from your drawing) */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="mt-[-12px] z-10 bg-white border-2 border-black rounded-full p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#D4AF37] transition-all"
          >
            {isSearchOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};
