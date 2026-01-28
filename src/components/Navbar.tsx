import React, { useState, useEffect } from 'react';
import { Menu, ShoppingBag, Search, ChevronUp, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [placeholder, setPlaceholder] = useState('');
  const fullText = "Search for Premium Gadgets...";

  // Typing Animation Logic
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full z-50 sticky top-0">
      {/* 1. TOP ADVERTISING BANNER */}
      <div className="bg-black text-[#FFD700] text-center py-2 text-[10px] font-black uppercase tracking-[0.3em]">
        Free Delivery on orders over Rs. 5000 | Limited Time Offer
      </div>

      {/* 2 & 3. MAIN NAV BAR */}
      <nav className="bg-white border-b border-gray-100 h-16 flex items-center px-4 md:px-8 justify-between retail-shadow">
        <div className="flex items-center gap-6">
          {/* 2. MENU BUTTON (3 Lines) */}
          <button className="flex items-center gap-2 group">
            <Menu className="text-black group-hover:text-[#FFD700] transition-colors" />
            <span className="text-xs font-black uppercase tracking-widest hidden md:inline">Categories</span>
          </button>
          
          <img src="/logo-transparent.png" className="h-8 w-auto" alt="Kevin11" />
        </div>

        {/* 3. FOMO CATEGORIES (Horizontal) */}
        <div className="hidden lg:flex items-center gap-8">
          {['Smart Electronics', 'Kitchen Essentials', 'Men\'s Care', 'Hair & Beauty'].map((item) => (
            <a key={item} href="#" className="text-[11px] font-black uppercase tracking-tighter text-gray-400 hover:text-black transition-colors border-b-2 border-transparent hover:border-[#FFD700]">
              {item}
            </a>
          ))}
        </div>

        <button className="relative p-2">
          <ShoppingBag size={22} />
          <span className="absolute top-0 right-0 bg-[#FFD700] text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
        </button>
      </nav>

      {/* 4. FLOATING SEARCH BAR WITH COLLAPSE */}
      <div className="flex justify-center mt-4">
        <div className={`transition-all duration-500 ease-in-out bg-white retail-shadow border border-gray-100 flex items-center px-4 overflow-hidden ${isSearchOpen ? 'w-[90%] max-w-2xl h-12 opacity-100' : 'w-12 h-12 rounded-full opacity-80'}`}>
          <Search size={18} className="text-gray-400 shrink-0" />
          <input 
            type="text" 
            placeholder={placeholder}
            className={`flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium px-4 transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* THE COLLAPSE BUTTON (Circle Icon from your screenshot) */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isSearchOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
