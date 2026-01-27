import React, { useState } from 'react';
import { ChevronDown, Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Gadgets', 
      href: '#',
      subItems: ['Smart Electronics', 'Kitchen Essentials', 'Men\'s Care', 'Women\'s Wellness', 'Hair & Beauty', 'Drinkware & Tumblers']
    },
    { 
      name: 'Wearables', 
      href: '#',
      subItems: ['Premium Abayas']
    },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Container */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group">
            <img 
              src="/logo-transparent.png" 
              alt="Kevin11 Logo" 
              className="h-10 w-auto md:h-12 object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </div>

          {/* Desktop Menu - No Blue anymore! */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center text-black hover:text-[#D4AF37] px-1 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                >
                  {item.name}
                  {item.subItems && (
                    <ChevronDown 
                      size={14} 
                      className={`ml-1 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180 text-[#D4AF37]' : ''}`} 
                    />
                  )}
                </a>
                
                {/* Gold Underline Animation */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${activeDropdown === item.name ? 'w-full' : 'w-0'}`}></div>

                {/* Dropdown Menu */}
                {item.subItems && activeDropdown === item.name && (
                  <div className="absolute left-0 mt-0 w-64 bg-white border border-gray-100 shadow-2xl rounded-none py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.subItems.map((sub) => (
                      <a
                        key={sub}
                        href={`#${sub.toLowerCase().replace(/ /g, '-')}`}
                        className="block px-6 py-3 text-sm text-black hover:bg-gray-50 hover:text-[#D4AF37] hover:pl-8 transition-all font-bold border-l-4 border-transparent hover:border-[#D4AF37]"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-black hover:text-[#D4AF37] transition-colors relative">
              <ShoppingBag size={24} />
              <span className="absolute top-1 right-1 bg-black text-[#D4AF37] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-[#D4AF37]">
                0
              </span>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black hover:text-[#D4AF37]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-right duration-300">
          <div className="px-6 py-8 space-y-6">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-gray-50 pb-4">
                <div className="text-sm font-black text-[#D4AF37] uppercase tracking-widest mb-3">{item.name}</div>
                {item.subItems && (
                  <div className="grid grid-cols-1 gap-3 pl-4">
                    {item.subItems.map((sub) => (
                      <a key={sub} href="#" className="text-gray-800 text-base font-bold hover:text-[#D4AF37]">
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
