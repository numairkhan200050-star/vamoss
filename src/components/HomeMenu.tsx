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
  const [expandedSubs, setExpandedSubs] = useState<number[]>([]);

  const toggleCat = (id: number) => {
    setExpandedCats(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSub = (id: number) => {
    setExpandedSubs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex items-center gap-6">
      {/* 1. TRIGGER: Clean White Button with Black Lines */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2.5 bg-white text-black hover:bg-gray-50 transition-all border border-gray-200 rounded-xl shadow-sm group-hover:border-black"
        >
          <Menu size={22} />
        </button>
        
        <a href="/" className="text-sm font-black uppercase tracking-widest hover:text-[#FFD700] transition-colors">
          Home
        </a>
      </div>

      {/* Slide-out Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-[300px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-500">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-black text-xl tracking-tighter">KEVIN11</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* 2. BRANCHING NAVIGATION */}
            <div className="overflow-y-auto flex-1 p-4">
              <nav className="space-y-2">
                {placeholderMenuData.map((mainCat) => (
                  <div key={mainCat.id} className="relative">
                    {/* Level 1: Main Category */}
                    <button 
                      onClick={() => toggleCat(mainCat.id)}
                      className={`w-full flex justify-between items-center py-3 px-3 rounded-lg transition-colors ${expandedCats.includes(mainCat.id) ? 'bg-black text-white' : 'hover:bg-gray-50 text-black'}`}
                    >
                      <span className="font-bold text-[13px] uppercase tracking-wider">{mainCat.title}</span>
                      {mainCat.subCategories.length > 0 && (
                        expandedCats.includes(mainCat.id) ? <ChevronDown size={14}/> : <ChevronRight size={14}/>
                      )}
                    </button>

                    {/* TREE BRANCHES START */}
                    {expandedCats.includes(mainCat.id) && mainCat.subCategories.length > 0 && (
                      <div className="ml-5 mt-2 relative border-l-2 border-gray-200 pl-4 space-y-2">
                        {mainCat.subCategories.map((sub) => (
                          <div key={sub.id} className="relative">
                            {/* Branch connector line (Horizontal) */}
                            <div className="absolute -left-[18px] top-4 w-4 h-[2px] bg-gray-200" />
                            
                            {/* Level 2: Sub Category */}
                            <button 
                              onClick={() => toggleSub(sub.id)}
                              className="w-full flex justify-between items-center py-2 text-[11px] font-black text-gray-500 uppercase tracking-widest hover:text-black"
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${expandedSubs.includes(sub.id) ? 'bg-[#FFD700]' : 'bg-gray-300'}`} />
                                {sub.title}
                              </div>
                              <ChevronRight size={12} className={`transition-transform ${expandedSubs.includes(sub.id) ? 'rotate-90' : ''}`} />
                            </button>

                            {/* Level 3: Sub-Sub Items (Deepest Branch) */}
                            {expandedSubs.includes(sub.id) && (
                              <div className="ml-4 mt-1 border-l border-gray-100 pl-4 space-y-1 py-1">
                                {sub.items.map((item, idx) => (
                                  <a 
                                    key={idx} 
                                    href="#" 
                                    className="relative flex items-center gap-3 py-2 text-[13px] font-medium text-gray-500 hover:text-black group transition-colors"
                                  >
                                    <div className="w-2 h-[1px] bg-gray-200 group-hover:bg-[#FFD700]" />
                                    {item}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="p-6 text-center border-t border-gray-50">
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Premium Collection | PK</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMenu;
