// src/components/admin/AdminGeneralSettings.tsx
import React, { useState } from 'react';
import { 
  Layout, Settings2, Images, Layers, 
  Menu as MenuIcon, Target, Zap, Anchor, MessageSquare // Added icon
} from 'lucide-react';

import AdminTopBannerSettings from './AdminTopBannerSettings';
import AdminHeroSliderSettings from './AdminHeroSliderSettings';
import AdminCategorySettings from './AdminCategorySettings';
import AdminMenuSettings from './AdminMenuSettings';
import AdminSpotlightSettings from './AdminSpotlightSettings';
import AdminFomoSettings from './AdminFomoSettings';
import AdminFooterSettings from './AdminFooterSettings';
import AdminReviewSettings from './AdminReviewSettings'; // NEW COMPONENT

type TabKey = 'topBanner' | 'hero' | 'categories' | 'menu' | 'spotlight' | 'fomo' | 'footer' | 'reviews';

export const AdminGeneralSettings = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('topBanner');
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'topBanner', label: 'Top Banner', icon: <Layout size={16} /> },
    { key: 'hero', label: 'Hero Slider', icon: <Images size={16} /> },
    { key: 'categories', label: 'Categories', icon: <Layers size={16} /> },
    { key: 'menu', label: 'Menu Nav', icon: <MenuIcon size={16} /> },
    { key: 'spotlight', label: 'Spotlight', icon: <Target size={16} /> },
    { key: 'fomo', label: 'FOMO Engine', icon: <Zap size={16} /> },
    { key: 'reviews', label: 'Customer Reviews', icon: <MessageSquare size={16} /> }, // NEW TAB
    { key: 'footer', label: 'Footer Settings', icon: <Anchor size={16} /> },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'topBanner': return <AdminTopBannerSettings />;
      case 'hero':      return <AdminHeroSliderSettings />;
      case 'categories':return <AdminCategorySettings />;
      case 'menu':      return <AdminMenuSettings />;
      case 'spotlight': return <AdminSpotlightSettings />;
      case 'fomo':      return <AdminFomoSettings />;
      case 'footer':    return <AdminFooterSettings />;
      case 'reviews':   return <AdminReviewSettings />; // NEW
      default:          return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(255,215,0,1)]">
            <Settings2 className="text-[#FFD700]" size={32} />
          </div>
          <div>
            <h1 style={comicSansBold} className="text-4xl uppercase italic tracking-tighter text-black">General Settings</h1>
            <p className="text-gray-500 font-medium uppercase text-[10px] tracking-widest">Kevin11 Command Center</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-8 border-b-4 border-black pb-4">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={comicSansBold}
              className={`flex items-center gap-2 px-5 py-3 transition-all uppercase text-xs border-2 border-black
                ${activeTab === tab.key
                  ? 'bg-black text-[#FFD700] shadow-[4px_4px_0px_0px_rgba(255,215,0,1)] translate-y-[-2px]'
                  : 'bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px]'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminGeneralSettings;
