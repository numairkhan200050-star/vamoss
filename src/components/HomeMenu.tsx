import React, { useState } from 'react';
import { Menu, X, ChevronRight, ArrowLeft, Zap } from 'lucide-react';

// This data would ideally come from your Database/Admin Portal
const placeholderMenuData = [
  {
    id: 1,
    title: "Men's Grooming",
    subCategories: [
      { id: 101, title: "Gadgets", items: ["Facial Hair", "Body Hair", "Trimmers"] },
      { id: 102, title: "Skincare", items: ["Face Wash", "Moisturizers"] }
    ]
  },
  {
    id: 2,
    title: "Women's Wellness",
    subCategories: [
      { id: 201, title: "Personal Care", items: ["Epilators", "Hair Care"] }
    ]
  }
];

// SHARED CONFIG: In a real app, this comes from your useFomo hook or Supabase
const fomoConfig = {
  isActive: true, // When you turn this OFF in Admin, the Red Menu disappears
  text: "LIMITED TIME DEALS",
  buttonLink: "/collections/deals" // The Flash Sale category will auto-link here
};

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
      {/* TRIGGER */}
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setIsOpen(true)}>
        <button className="p-2.5 bg-white text-black hover:bg-gray-50 transition-all border border-gray-200 rounded-xl shadow-sm group-hover:border-black">
          <Menu size={22} />
        </button>
        <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline">Home</span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex overflow-hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeMenu} />
          
          <div className="relative flex h-full max-w-full md:max-w-4xl bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            
            {/* COLUMN 1: Main Categories */}
            <div className={`flex-shrink-0 w-full sm:w-72 bg-white h-full flex flex-col border-r border-gray-100 ${activeCat ? 'hidden sm:flex' : 'flex'}`}>
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-black text-white">
                <h2 className="font-bold text-xl italic uppercase tracking-tighter">Kevin11</h2>
                <button onClick={closeMenu} className="p-1 hover:bg-zinc-800 rounded-full"><X size={20}/></button>
              </div>

              <div className="overflow-y-auto flex-1">
                {/* --- NEW FLASH SALE CATEGORY --- */}
                {fomoConfig.isActive && (
                  <a
                    href={fomoConfig.buttonLink}
                    className="w-full flex justify-between items-center p-5 text-left border-b border-red-100 bg-red-50 hover:bg-red-100 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Zap size={18} className="text-red-600 fill-red-600 animate-pulse" />
                      <span className="font-black uppercase text-sm text-red-600 tracking-tighter">Flash Sale</span>
                    </div>
                    <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">HOT</span>
                  </a>
                )}
                {/* ------------------------------- */}

                {placeholderMenuData.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {setActiveCat(cat); setActiveSub(null);}}
                    onMouseEnter={() => { if(window.innerWidth > 768) setActiveCat(cat); }}
                    className={`w-full flex justify-between items-center p-5 text-left border-b border-gray-50 transition-all ${activeCat?.id === cat.id ? 'bg-[#FFD700] text-black pl-8' : 'hover:bg-gray-50'}`}
                  >
                    <span className="font-bold uppercase text-sm">{cat.title}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* COLUMN 2 & 3 (Logic remains same as your optimized version) */}
            {/* ... [Rest of your column logic] ... */}

          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMenu;
