import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Menu, 
  Zap, 
  Save, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Settings,
  Database
} from 'lucide-react';

const NullAdminDashboard = () => {
  const comicSans = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive' };

  // --- 1. FOMO & FLASH SALE STATE ---
  // This controls the Red Category in your Menu and the Fomo Section
  const [fomoData, setFomoData] = useState({
    isActive: true,
    text: "LIMITED TIME DEALS",
    buttonLink: "/collections/flash-sale",
    expiryDate: ""
  });

  // --- 2. MENU CATEGORY STATE ---
  // This controls the 3-column data structure
  const [menuCategories, setMenuCategories] = useState([
    {
      id: 1,
      title: "New Category",
      subCategories: [
        { id: 101, title: "New Sub-Category", items: ["Sample Item"] }
      ]
    }
  ]);

  // --- HANDLERS ---
  const handleSave = () => {
    // Logic to push to your backend goes here
    console.log("Saving Configuration...", { fomoData, menuCategories });
    alert("Database Updated Successfully!");
  };

  const toggleFomo = () => setFomoData(prev => ({ ...prev, isActive: !prev.isActive }));

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800" style={comicSans}>
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-8">
          <h1 className="text-2xl font-black italic tracking-tighter text-[#FFD700]">KEVIN11</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Admin Portal v1.0</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button className="w-full flex items-center gap-3 p-4 bg-zinc-900 rounded-xl text-[#FFD700] font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 p-4 hover:bg-zinc-900 rounded-xl transition-all">
            <Menu size={20} /> Navigation Menu
          </button>
          <button className="w-full flex items-center gap-3 p-4 hover:bg-zinc-900 rounded-xl transition-all">
            <Zap size={20} /> FOMO Engine
          </button>
        </nav>

        <div className="p-6 border-t border-zinc-800">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            System Online
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col">
        
        {/* TOP BAR */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-tight">Store Management</h2>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-black text-[#FFD700] px-8 py-3 rounded-2xl font-black hover:scale-105 transition-transform active:scale-95 shadow-lg"
          >
            <Save size={18} /> SAVE ALL CHANGES
          </button>
        </header>

        <div className="p-8 space-y-8">
          
          {/* 1. FOMO CONTROL PANEL */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-lg font-black uppercase flex items-center gap-2">
                  <Zap className="text-red-600 fill-red-600" size={20} /> 
                  FOMO & Global Flash Sale
                </h3>
                <p className="text-sm text-gray-400 font-bold">This section controls the Red Menu Category and the floating popup.</p>
              </div>
              <button 
                onClick={toggleFomo}
                className={`px-6 py-2 rounded-full font-black text-xs transition-all ${fomoData.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {fomoData.isActive ? '● ACTIVE' : '○ DISABLED'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Banner Text</label>
                <input 
                  type="text" 
                  value={fomoData.text}
                  onChange={(e) => setFomoData({...fomoData, text: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-black rounded-2xl outline-none font-bold transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Target Collection (Link)</label>
                <input 
                  type="text" 
                  value={fomoData.buttonLink}
                  onChange={(e) => setFomoData({...fomoData, buttonLink: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-black rounded-2xl outline-none font-bold text-red-600 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 2. MENU CATEGORY MANAGER */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black uppercase flex items-center gap-2">
                <Menu size={20} /> Menu Structure
              </h3>
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white p-3 rounded-xl transition-all text-xs font-black">
                <Plus size={16} /> ADD MAIN CATEGORY
              </button>
            </div>

            {/* Render Categories */}
            <div className="space-y-4">
              {menuCategories.map((cat) => (
                <div key={cat.id} className="border-2 border-gray-50 rounded-2xl p-6 hover:border-gray-100 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-[#FFD700] rounded-xl flex items-center justify-center font-black">
                        {cat.id}
                      </div>
                      <input 
                        className="font-black uppercase text-lg outline-none bg-transparent focus:border-b-2 border-black" 
                        defaultValue={cat.title} 
                      />
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={20}/></button>
                      <button className="p-2 text-gray-400 hover:text-black"><ChevronRight size={20}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default NullAdminDashboard;
