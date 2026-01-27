import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Gadgets', 
      href: '#',
      subItems: [
        'Smart Electronics',
        'Kitchen Essentials',
        'Men\'s Care',
        'Women\'s Wellness',
        'Hair & Beauty',
        'Drinkware & Tumblers'
      ]
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
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold tracking-tight text-indigo-600 cursor-pointer">
              VAMOSS<span className="text-gray-900">.SHOP</span>
            </span>
          </div>

          {/* Desktop Menu */}
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
                  className="flex items-center text-gray-600 hover:text-indigo-600 px-1 py-2 text-sm font-semibold transition-all duration-300 ease-in-out"
                >
                  {item.name}
                  {item.subItems && <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />}
                </a>
                
                {/* Underline Animation */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>

                {/* Dropdown Menu */}
                {item.subItems && activeDropdown === item.name && (
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    {item.subItems.map((sub) => (
                      <a
                        key={sub}
                        href={`#${sub.toLowerCase().replace(/ /g, '-')}`}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-right duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                <div className="font-bold text-indigo-600 py-2 border-b border-gray-50">{item.name}</div>
                {item.subItems ? (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.subItems.map((sub) => (
                      <a key={sub} href="#" className="block py-2 text-sm text-gray-500">{sub}</a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
