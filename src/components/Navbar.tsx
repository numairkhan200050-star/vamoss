import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ['Smart Electronics', 'Kitchen Essentials', 'Men\'s Care', 'Women\'s Wellness', 'Hair & Beauty'];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 smooth-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group">
            <img src="/logo-transparent.png" alt="Kevin11" className="h-12 w-auto transition-transform group-hover:scale-105" />
          </div>

          {/* Horizontal Desktop Categories - Naheed Style */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="text-black hover:text-[#FFD700] text-sm font-bold uppercase tracking-widest">Home</a>
            {categories.map((cat) => (
              <a key={cat} href={`#${cat.toLowerCase().replace(/ /g, '-')}`} className="text-black hover:text-[#FFD700] text-[11px] font-black uppercase tracking-tighter transition-colors">
                {cat}
              </a>
            ))}
          </div>

          {/* Cart & Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-black hover:text-[#FFD700] relative">
              <ShoppingBag size={24} />
              <span className="absolute top-1 right-1 bg-black text-[#FFD700] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
