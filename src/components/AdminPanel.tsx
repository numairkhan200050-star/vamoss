import React, { useState, useEffect } from 'react';
import { Settings, Package, Star, Clock, EyeOff, Eye, Plus } from 'lucide-react';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('products');
  
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-black text-white p-6 space-y-8">
        <h1 className="text-2xl font-black italic tracking-tighter text-[#D4AF37]">KEVIN11 ADMIN</h1>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 p-3 font-bold uppercase text-xs transition-all ${activeTab === 'products' ? 'bg-[#D4AF37] text-black' : 'hover:bg-gray-900'}`}>
            <Package size={18} /> Product Manager
          </button>
          <button onClick={() => setActiveTab('reviews')} className={`w-full flex items-center gap-3 p-3 font-bold uppercase text-xs transition-all ${activeTab === 'reviews' ? 'bg-[#D4AF37] text-black' : 'hover:bg-gray-900'}`}>
            <Star size={18} /> Review Control
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 p-3 font-bold uppercase text-xs transition-all ${activeTab === 'settings' ? 'bg-[#D4AF37] text-black' : 'hover:bg-gray-900'}`}>
            <Settings size={18} /> Home Page Settings
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black uppercase italic">Product Inventory</h2>
              <button className="bg-black text-white px-6 py-3 font-bold uppercase flex items-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-all luxury-shadow">
                <Plus size={20} /> Add New Product
              </button>
            </div>
            
            <div className="bg-white border-2 border-black overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b-2 border-black">
                  <tr>
                    <th className="p-4 font-black uppercase text-xs">Product</th>
                    <th className="p-4 font-black uppercase text-xs">Collection</th>
                    <th className="p-4 font-black uppercase text-xs">Spotlight?</th>
                    <th className="p-4 font-black uppercase text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Example Row */}
                  <tr className="hover:bg-yellow-50 transition-colors">
                    <td className="p-4 font-bold">Hair Dryer Brush 5-in-1</td>
                    <td className="p-4"><span className="bg-blue-100 px-2 py-1 text-[10px] font-bold rounded">New Arrivals</span></td>
                    <td className="p-4">
                      <input type="checkbox" checked className="w-5 h-5 accent-black" />
                    </td>
                    <td className="p-4"><span className="text-green-600 font-bold uppercase text-[10px]">● Live</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase italic">Customer Reviews</h2>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-6 border-2 border-black flex justify-between items-center">
                  <div>
                    <div className="flex gap-1 text-[#D4AF37] mb-2"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                    <p className="font-bold italic">"Good product but delivery was 1 day late."</p>
                    <p className="text-[10px] uppercase font-black text-gray-400 mt-2">— Customer #{i}</p>
                  </div>
                  <button className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 font-bold uppercase text-[10px] hover:bg-red-600 hover:text-white transition-all">
                    <EyeOff size={14} /> Hide from Site
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-8">
            <h2 className="text-3xl font-black uppercase italic">Global Settings</h2>
            
            <div className="bg-white p-8 border-4 border-black luxury-shadow space-y-6">
              <div>
                <label className="block font-black uppercase text-xs mb-2">Announcement Bar Text</label>
                <input type="text" className="w-full p-3 border-2 border-black outline-none font-bold" defaultValue="FLAT 25% OFF - ORDER NOW" />
              </div>
              
              <div>
                <label className="block font-black uppercase text-xs mb-2 flex items-center gap-2">
                  <Clock size={14} /> Flash Sale Duration (Minutes)
                </label>
                <input type="number" className="w-full p-3 border-2 border-black outline-none font-bold" defaultValue="45" />
              </div>

              <button className="w-full bg-black text-white py-4 font-black uppercase hover:bg-[#D4AF37] hover:text-black transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
