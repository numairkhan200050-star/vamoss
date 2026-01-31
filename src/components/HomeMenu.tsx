import React, { useState } from 'react';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';

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
    <div className="flex items-center gap-6 font-sans">
      {/* 1. UPDATED TRIGGER: White background, black lines, soft rounded */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2.5 bg-white text-black hover:bg-gray-50 transition-all border border-gray-200 rounded-xl shadow-sm group-hover:border-black"
        >
          <Menu size={22} strokeWidth={2.5} />
        </button>
        
        <a 
          href="/" 
          className="text-sm font-black uppercase tracking-widest hover:text-[#FFD700] transition-colors"
        >
          Home
        </a>
      </div>

      {/* Slide-out Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Dark Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          
          {/* Menu Panel */}
          <div className="relative w-[320px] bg-white h-full shadow-[25px_0_50px_-12px_rgba(0,0,0,0.25)] flex flex-col animate-in slide-in-from-left duration-500 ease-out">
            
            {/* Header: Premium White/Glass look */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="font-black text-black text-lg tracking-tight">KEVIN11</h2>
                <p className="text-[10px] font-bold text-[#FFD700] uppercase tracking-widest leading-none">Main Menu</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-black hover:text-white rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* 2. BRANCHING MENU CONTENT */}
            <div className="overflow-y-auto flex-1 p-6">
              <nav className="space-y-4">
                {placeholderMenuData.map((mainCat) => (
                  <div key={mainCat.id} className="relative">
                    {/* Level 1: Main Category */}
                    <button 
                      onClick={() => toggleCat(mainCat.id)}
                      className={`w-full flex justify-between items-center py-3 px-4 rounded-xl transition-all duration-300 ${
                        expandedCats.includes(mainCat.id) ? 'bg-black text-white' : 'hover:bg-gray-50 text-black border border-gray-100'
                      }`}
                    >
                      <span className="font-black text-[12px] uppercase tracking-wider">
                        {mainCat.title}
                      </span>
                      {mainCat.subCategories.length > 0 && (
                        expandedCats.includes(mainCat.id) ? <ChevronDown size={14}/> : <ChevronRight size={14}/>
                      )}
                    </button>

                    {/* BRANCHING LOGIC: Vertical Line connector */}
                    {expandedCats.includes(mainCat.id) && mainCat.subCategories.length > 0 && (
                      <div className="ml-6 mt-2 relative border-l-2 border-gray-100 pl-4 space-y-4">
                        {mainCat.subCategories.map((sub) => (
                          <div key={sub.id} className="relative">
                            {/* Horizontal Line connector from Vertical Line */}
                            <div className="absolute -left-4 top-4 w-4 h-[2px] bg-gray-100" />
                            
                            {/* Level 2: Sub Category */}
                            <div className="py-2 text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]" /> 
                              {sub.title}
                            </div>
                            
                            {/* Level 3: Sub-Sub Category (Window-folder Style) */}
                            <div className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-4">
                              {sub.items.map((item, idx) => (
                                <a 
                                  key={idx} 
                                  href="#" 
                                  className="relative block py-2 text-[13px] font-semibold text-gray-600 hover:text-black transition-colors flex items-center gap-2 group"
                                >
                                  {/* Connector for items */}
                                  <div className="w-2 h-[1px] bg-gray-200 group-hover:bg-[#FFD700] transition-colors" />
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-50">
              <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">Pakistan</span>
                <span className="text-[11px] font-bold text-black mt-1">v2.0 Premium Hub</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMenu;
