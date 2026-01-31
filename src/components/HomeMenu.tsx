import React, { useState } from 'react';
import { Menu, X, ChevronRight, ArrowLeft } from 'lucide-react';

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
      {/* TRIGGER */}
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setIsOpen(true)}>
        <button className="p-2.5 bg-white text-black hover:bg-gray-50 transition-all border border-gray-200 rounded-xl shadow-sm group-hover:border-black">
          <Menu size={22} />
        </button>
        <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline">Home</span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex overflow-hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeMenu} />
          
          {/* MAIN CONTAINER: Responsive Width */}
          <div className="relative flex h-full max-w-full md:max-w-4xl bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            
            {/* COLUMN 1: Main Categories */}
            <div className={`flex-shrink-0 w-full sm:w-72 bg-white h-full flex flex-col border-r border-gray-100 ${activeCat ? 'hidden sm:flex' : 'flex'}`}>
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-black text-white">
                <h2 className="font-bold text-xl italic uppercase tracking-tighter">Kevin11</h2>
                <button onClick={closeMenu} className="p-1 hover:bg-zinc-800 rounded-full"><X size={20}/></button>
              </div>
              <div className="overflow-y-auto flex-1">
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

            {/* COLUMN 2: Sub-Categories */}
            {activeCat && (
              <div className={`flex-shrink-0 w-full sm:w-64 bg-gray-50 h-full border-r border-gray-200 flex flex-col ${activeSub ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b bg-white flex items-center gap-3 sm:block">
                  {/* Back button for Mobile */}
                  <button onClick={() => setActiveCat(null)} className="sm:hidden p-2"><ArrowLeft size={20}/></button>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">In {activeCat.title}</p>
                </div>
                <div className="overflow-y-auto flex-1">
                  {activeCat.subCategories.map((sub: any) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSub(sub)}
                      onMouseEnter={() => { if(window.innerWidth > 768) setActiveSub(sub); }}
                      className={`w-full flex justify-between items-center p-5 text-left transition-all ${activeSub?.id === sub.id ? 'bg-white text-black font-black' : 'text-gray-500 hover:text-black'}`}
                    >
                      <span className="text-sm font-bold uppercase">{sub.title}</span>
                      <ChevronRight size={14} className="opacity-40" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* COLUMN 3: Final Items */}
            {activeSub && (
              <div className="w-full sm:w-64 bg-white h-full shadow-inner flex flex-col">
                <div className="p-4 border-b flex items-center gap-3 sm:block">
                  <button onClick={() => setActiveSub(null)} className="md:hidden p-2"><ArrowLeft size={20}/></button>
                  <p className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest">Shop {activeSub.title}</p>
                </div>
                <div className="p-4 space-y-2 overflow-y-auto">
                  {activeSub.items.map((item: string, idx: number) => (
                    <a
                      key={idx}
                      href="#"
                      className="block p-4 bg-gray-50 rounded-xl text-sm font-bold text-gray-700 hover:bg-black hover:text-[#FFD700] transition-all"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMenu;
