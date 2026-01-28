import React, { useState, useEffect } from 'react';
import { Settings, Package, Star, Clock, EyeOff, Eye, Plus, Layout, Zap } from 'lucide-react';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('products');
  
  // New State for the Dynamic Layout Controls (Spotlights & Reviews)
  const [layoutSettings, setLayoutSettings] = useState({
    announcementText: "FLAT 25% OFF - ORDER NOW",
    flashSaleMinutes: 45,
    homeSpotlightCollection: 'summer-sale', // Links to Spotlight 1 (4 Boxes)
    innerSpotlightCollection: 'july-deals', // Links to Spotlight 2 (Inner Page Rotator)
    showReviewSlider: false, // Control for the Review Slider above shipping
  });

  const handleSettingChange = (key: string, value: any) => {
    setLayoutSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* --- SIDEBAR NAVIGATION --- */}
      <div className="w-64 bg-black text-white p-6 space-y-8 sticky top-0 h-screen">
        <h1 className="text-2xl font-black italic tracking-tighter text-[#D4AF37]">KEVIN11 ADMIN</h1>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 p-3 font-bold uppercase text-xs transition-all ${activeTab === 'products' ? 'bg-[#D4AF37] text-black' : 'hover:bg-gray-900'}`}>
            <Package size={18} /> Product Manager
          </button>
          <button onClick={() => setActiveTab('reviews')} className={`w-full flex items-center gap-3 p-3 font-bold uppercase text-xs transition-all ${activeTab === 'reviews' ? 'bg-[#D4AF37] text-black' : 'hover:bg-gray-900'}`}>
            <Star size={18} /> Review Control
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 p-3 font-bold uppercase text-xs transition-all ${activeTab === 'settings' ? 'bg-[#D4AF37] text-black' : 'hover:bg-gray-900'}`}>
            <Settings size={18} /> Master Settings
          </button>
        </nav>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 p-10">
        
        {/* 1. PRODUCT INVENTORY (KEPT AS IS) */}
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
                    <th className="p-4 font-black uppercase text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-yellow-50 transition-colors">
                    <td className="p-4 font-bold">Hair Dryer Brush 5-in-1</td>
                    <td className="p-4"><span className="bg-blue-100 px-2 py-1 text-[10px] font-bold rounded">New Arrivals</span></td>
                    <td className="p-4"><span className="text-green-600 font-bold uppercase text-[10px]">● Live</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. REVIEW CONTROL (KEPT AS IS) */}
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

        {/* 3. MASTER SETTINGS (INTEGRATED WITH NEW CONTROLS) */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-8">
            <h2 className="text-3xl font-black uppercase italic">Global Store Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Basic Announcements */}
              <div className="bg-white p-8 border-4 border-black luxury-shadow space-y-6">
                <h3 className="font-black uppercase flex items-center gap-2 border-b-2 border-black pb-2">
                  <Zap size={18} /> Promotions
                </h3>
                <div>
                  <label className="block font-black uppercase text-xs mb-2">Announcement Bar Text</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border-2 border-black outline-none font-bold" 
                    value={layoutSettings.announcementText}
                    onChange={(e) => handleSettingChange('announcementText', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-xs mb-2 flex items-center gap-2">
                    <Clock size={14} /> Flash Sale Duration (Minutes)
                  </label>
                  <input 
                    type="number" 
                    className="w-full p-3 border-2 border-black outline-none font-bold" 
                    value={layoutSettings.flashSaleMinutes}
                    onChange={(e) => handleSettingChange('flashSaleMinutes', e.target.value)}
                  />
                </div>
              </div>

              {/* Spotlight & Collection Links (THE NEW STUFF) */}
              <div className="bg-white p-8 border-4 border-black luxury-shadow space-y-6">
                <h3 className="font-black uppercase flex items-center gap-2 border-b-2 border-black pb-2">
                  <Layout size={18} /> Marketing Layout
                </h3>
                
                {/* Spotlight 1 Link */}
                <div>
                  <label className="block font-black uppercase text-[10px] mb-2">Spotlight 1: Home Grid (Collection Slug)</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border-2 border-[#D4AF37] outline-none font-bold bg-yellow-50" 
                    value={layoutSettings.homeSpotlightCollection}
                    onChange={(e) => handleSettingChange('homeSpotlightCollection', e.target.value)}
                  />
                </div>

                {/* Spotlight 2 Link */}
                <div>
                  <label className="block font-black uppercase text-[10px] mb-2">Spotlight 2: Inner Sidebar (Collection Slug)</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border-2 border-[#D4AF37] outline-none font-bold bg-yellow-50" 
                    value={layoutSettings.innerSpotlightCollection}
                    onChange={(e) => handleSettingChange('innerSpotlightCollection', e.target.value)}
                  />
                </div>

                {/* Review Slider Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-100 border-2 border-black">
                  <label className="font-black uppercase text-xs">Enable Review Slider</label>
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 accent-black"
                    checked={layoutSettings.showReviewSlider}
                    onChange={(e) => handleSettingChange('showReviewSlider', e.target.checked)}
                  />
                </div>
              </div>

            </div>

            <button className="w-full bg-black text-white py-6 font-black uppercase tracking-widest text-xl hover:bg-[#D4AF37] hover:text-black transition-all">
              Save All Master Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
