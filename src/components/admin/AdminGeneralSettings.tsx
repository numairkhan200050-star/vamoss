import React, { useState } from 'react';

// IMPORT EXISTING SETTINGS COMPONENTS
import { AdminTopBannerSettings } from './AdminTopBannerSettings';
import { AdminHeroSliderSettings } from './AdminHeroSliderSettings';
import { AdminCategorySettings } from './AdminCategorySettings';
import { AdminMenuSettings } from './AdminMenuSettings';
import { AdminSpotlightSettings } from './AdminSpotlightSettings';
import { AdminFooterSettings } from './AdminFooterSettings';
import { FomoSettings } from './FomoSettings';

type TabKey =
  | 'topBanner'
  | 'hero'
  | 'categories'
  | 'menu'
  | 'spotlight'
  | 'fomo'
  | 'footer';

export const AdminGeneralSettings = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('topBanner');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'topBanner', label: 'Top Banner' },
    { key: 'hero', label: 'Hero Slider' },
    { key: 'categories', label: 'Category Row' },
    { key: 'menu', label: 'Menu' },
    { key: 'spotlight', label: 'Spotlight' },
    { key: 'fomo', label: 'FOMO / Flash Sale' },
    { key: 'footer', label: 'Footer' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'topBanner':
        return <AdminTopBannerSettings />;
      case 'hero':
        return <AdminHeroSliderSettings />;
      case 'categories':
        return <AdminCategorySettings />;
      case 'menu':
        return <AdminMenuSettings />;
      case 'spotlight':
        return <AdminSpotlightSettings />;
      case 'fomo':
        return <FomoSettings />;
      case 'footer':
        return <AdminFooterSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-black uppercase">General Settings</h1>

      {/* TAB NAVIGATION */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-bold rounded-md transition
              ${
                activeTab === tab.key
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTIVE CONTENT */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        {renderActiveTab()}
      </div>
    </div>
  );
};
