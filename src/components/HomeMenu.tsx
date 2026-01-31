import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

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
    subCategories: [
      {
        id: 201,
        title: "Personal Care",
        items: ["Epilators", "Hair Care"]
      }
    ]
  }
];

const HomeMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<any>(null);
  const [activeSub, setActiveSub] = useState<any>(null);

  const comicSans = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive' };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveCat(null);
    setActiveSub(null);
  };

  return (
    <div className="flex items-center gap-6" style={comicSans}>
      {/* 1. TRIGGER: Clean White Button */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2.5 bg-white text-black hover:bg-gray-50 transition-all border border-gray-200 rounded-xl shadow-sm group-hover:border-black"
        >
          <Menu size={22} />
        </button>
        <a href="/" className="text-sm font-bold uppercase tracking-widest">Home</a>
      </div>

      {/* Slide-out Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu} />
          
          {/* Main Menu Panel (Column 1) */}
          <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-black text-white">
              <h2 className="font-bold text-xl italic uppercase">Kevin11</h2>
              <button onClick={closeMenu} className="p-1 hover:rotate-90 transition-transform"><X size={20}/></button>
            </div>

            <div className="overflow-y-auto flex-1">
              {placeholderMenuData.map((cat) => (
                <button
                  key={cat.id}
                  onMouseEnter={() => {setActiveCat(cat); setActiveSub(null);}}
                  onClick={() => {setActiveCat(cat); setActiveSub(null);}}
                  className={`w-full flex justify-between items-center p-5 text-left border-b border-gray-50 transition-colors ${activeCat?.id === cat.id ? 'bg-[#FFD700] text-black' : 'hover:bg-gray-50'}`}
                >
                  <span className="font-bold uppercase text-sm tracking-tighter">{cat.title}</span>
                  <ChevronRight size={16} className={activeCat?.id === cat.id ? 'opacity-100' : 'opacity-20'} />
                </button>
              ))}
            </div>
          </div>

          {/* 2nd COLUMN: Sub Categories (Opens to the right) */}
          {activeCat && activeCat.subCategories.length > 0 && (
            <div className="relative w-64 bg-gray-50 h-full border-l border-gray-200 shadow-xl animate-in slide-in-from-left-5 duration-300">
              <div className="p-6 border-b border-gray-200">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Select Category</p>
              </div>
              <div className="overflow-y-auto h-full">
                {activeCat.subCategories.map((sub: any) => (
                  <button
                    key={sub.id}
                    onMouseEnter={() => setActiveSub(sub)}
                    onClick={() => setActiveSub(sub)}
                    className={`w-full flex justify-between items-center p-5 text-left transition-colors ${activeSub?.id === sub.id ? 'bg-white text-black font-black' : 'text-gray-500'}`}
                  >
                    <span className="text-sm font-bold uppercase">{sub.title}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${activeSub?.id === sub.id ? 'bg-[#FFD700]' : 'transparent'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3rd COLUMN: Items (The Final Branch) */}
          {activeSub && (
            <div className="relative w-64 bg-white h-full border-l border-gray-200 shadow-2xl animate-in slide-in-from-left-5 duration-300">
              <div className="p-6 border-b border-gray-100 bg-white">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Available Now</p>
              </div>
              <div className="p-4 space-y-2">
                {activeSub.items.map((item: string, idx: number) => (
                  <a
                    key={idx}
                    href="#"
                    className="block p-4 bg-gray-50 rounded-xl text-sm font-bold text-gray-600 hover:bg-black hover:text-[#FFD700] transition-all transform hover:translate-x-2"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeMenu;
