import React, { useState } from 'react';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';

// This structure represents how your Admin Portal will send data
const placeholderMenuData = [
  {
    id: 1,
    title: "Men's Grooming",
    subCategories: [
      {
        id: 101,
        title: "Gadgets",
        items: ["Facial Hair", "Body Hair", "Trimmers"]
      },
      {
        id: 102,
        title: "Skincare",
        items: ["Face Wash", "Moisturizers"]
      }
    ]
  },
  {
    id: 2,
    title: "Women's Wellness",
    subCategories: []
  }
];

const HomeMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState<number[]>([]);

  const toggleCat = (id: number) => {
    setExpandedCats(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex items-center gap-6">
      {/* Home Button & Hamburger Wrapper */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-black text-white hover:bg-[#FFD700] hover:text-black transition-all border-2 border-black"
        >
          <Menu size={24} />
        </button>
        
        <a 
          href="/" 
          className="text-lg font-black uppercase tracking-tighter hover:text-[#FFD700] transition-colors"
        >
          Home
        </a>
      </div>

      {/* Slide-out Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Dark Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          {/* Menu Panel */}
          <div className="relative w-80 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b-2 border-black flex justify-between items-center bg-black text-white">
              <h2 className="font-black italic text-xl tracking-tighter">KEVIN11 MENU</h2>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4">
              <nav className="space-y-2">
                {placeholderMenuData.map((mainCat) => (
                  <div key={mainCat.id} className="border-b border-gray-100 pb-2">
                    {/* Level 1: Main Category */}
                    <button 
                      onClick={() => toggleCat(mainCat.id)}
                      className="w-full flex justify-between items-center py-3 px-2 hover:bg-gray-50 text-left group"
                    >
                      <span className="font-bold text-sm uppercase tracking-widest group-hover:text-[#FFD700]">
                        {mainCat.title}
                      </span>
                      {mainCat.subCategories.length > 0 && (
                        expandedCats.includes(mainCat.id) ? <ChevronDown size={16}/> : <ChevronRight size={16}/>
                      )}
                    </button>

                    {/* Level 2: Sub Category */}
                    {expandedCats.includes(mainCat.id) && mainCat.subCategories.map((sub) => (
                      <div key={sub.id} className="ml-4 mt-1 space-y-1">
                        <div className="py-2 px-2 text-xs font-black text-gray-400 uppercase tracking-tight flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#FFD700] rounded-full" /> {sub.title}
                        </div>
                        
                        {/* Level 3: Sub-Sub Category */}
                        <div className="ml-4 space-y-1 border-l-2 border-gray-100">
                          {sub.items.map((item, idx) => (
                            <a 
                              key={idx} 
                              href="#" 
                              className="block py-2 px-4 text-[13px] font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </nav>
            </div>

            <div className="p-6 bg-gray-50 text-[10px] font-bold text-center text-gray-400 uppercase tracking-widest">
              Premium Collection | Pakistan
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMenu;
