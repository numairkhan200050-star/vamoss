// src/components/admin/AdminMenuSettings.tsx
import React, { useState } from 'react';
import { 
  Menu as MenuIcon, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Save, 
  Zap, 
  Link2, 
  Type,
  Layers
} from 'lucide-react';

type LinkType = 'page' | 'collection' | 'none';

interface MenuItem {
  id: number;
  title: string;
  linkType: LinkType;
  linkTarget: string;
  subCategories?: MenuItem[];
}

const AdminMenuSettings = () => {
  // Signature Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  const [menu, setMenu] = useState<MenuItem[]>([
    {
      id: 1,
      title: "Men's Grooming",
      linkType: 'none',
      linkTarget: '',
      subCategories: [
        { id: 101, title: 'Gadgets', linkType: 'collection', linkTarget: 'trimmers', subCategories: [] },
      ]
    }
  ]);

  const [fomoActive, setFomoActive] = useState(true);

  // --- LOGIC HELPERS ---
  const generateId = () => Math.floor(Math.random() * 1000000);

  const updateMenuItem = (id: number, key: keyof MenuItem, value: any, items = menu): MenuItem[] => {
    return items.map(item => {
      if (item.id === id) return { ...item, [key]: value };
      if (item.subCategories) {
        return { ...item, subCategories: updateMenuItem(id, key, value, item.subCategories) };
      }
      return item;
    });
  };

  const deleteMenuItem = (id: number, items = menu): MenuItem[] => {
    return items
      .filter(item => item.id !== id)
      .map(item => ({
        ...item,
        subCategories: item.subCategories ? deleteMenuItem(id, item.subCategories) : []
      }));
  };

  const addLevel = (parentId?: number) => {
    const newItem: MenuItem = { id: generateId(), title: 'New Item', linkType: 'none', linkTarget: '', subCategories: [] };
    if (!parentId) {
      setMenu([...menu, newItem]);
    } else {
      const updated = menu.map(item => {
        if (item.id === parentId) return { ...item, subCategories: [...(item.subCategories || []), newItem] };
        if (item.subCategories) return { ...item, subCategories: updateMenuItem(parentId, 'subCategories', [...(item.subCategories || []), newItem], item.subCategories) };
        return item;
      });
      setMenu(updated);
    }
  };

  // --- RECURSIVE RENDERER ---
  const renderItems = (items: MenuItem[], level = 0) => (
    <div className={`space-y-4 ${level > 0 ? 'ml-8 mt-4 border-l-2 border-dashed border-gray-200 pl-4' : ''}`}>
      {items.map(item => (
        <div key={item.id} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <Type size={12} className="text-gray-400"/>
                <span style={comicSansBold} className="text-[10px] uppercase">Title</span>
              </div>
              <input 
                value={item.title}
                onChange={e => setMenu(updateMenuItem(item.id, 'title', e.target.value))}
                className="w-full border-b border-black outline-none focus:border-[#FFD700] bg-transparent"
                style={comicSansBold}
              />
            </div>

            <div className="w-40">
              <span style={comicSansBold} className="text-[10px] uppercase block mb-1">Links To</span>
              <select 
                value={item.linkType}
                onChange={e => setMenu(updateMenuItem(item.id, 'linkType', e.target.value))}
                className="w-full text-xs border border-gray-300 p-1"
              >
                <option value="none">Folder (No Link)</option>
                <option value="collection">Collection</option>
                <option value="page">Page</option>
              </select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <span style={comicSansBold} className="text-[10px] uppercase block mb-1">Target ID/Slug</span>
              <input 
                value={item.linkTarget}
                onChange={e => setMenu(updateMenuItem(item.id, 'linkTarget', e.target.value))}
                className="w-full border border-gray-300 p-1 text-xs"
                placeholder="e.g. gadgets-id"
                disabled={item.linkType === 'none'}
              />
            </div>

            <div className="flex gap-2">
              {level < 2 && (
                <button 
                  onClick={() => addLevel(item.id)}
                  className="p-2 bg-black text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors"
                  title="Add Sub-item"
                >
                  <Plus size={16} />
                </button>
              )}
              <button 
                onClick={() => setMenu(deleteMenuItem(item.id))}
                className="p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {item.subCategories && item.subCategories.length > 0 && renderItems(item.subCategories, level + 1)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic text-black flex items-center gap-3">
            <MenuIcon size={28} className="text-[#FFD700]" /> MENU SUPERVISOR
          </h2>
          <p style={comicSansRegular} className="text-gray-500">Design your 3-level store navigation and Flash Sale visibility.</p>
        </div>
        <button 
          onClick={() => { alert("Settings Saved!"); console.log(menu, fomoActive); }}
          className="flex items-center gap-2 bg-[#FFD700] text-black border-2 border-black px-8 py-3 hover:bg-black hover:text-[#FFD700] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={comicSansBold}
        >
          <Save size={20} /> SAVE NAVIGATION
        </button>
      </div>

      {/* FLASH SALE TOGGLE */}
      <section className="bg-red-50 border-4 border-red-600 p-6 flex items-center justify-between shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-2 text-white animate-pulse">
            <Zap size={24} fill="white" />
          </div>
          <div>
            <h3 style={comicSansBold} className="text-red-600 uppercase">Flash Sale Menu Item</h3>
            <p className="text-xs text-red-400">Turn on/off the red "Flash Sale" tab in the home menu.</p>
          </div>
        </div>
        <button 
          onClick={() => setFomoActive(!fomoActive)}
          className={`w-16 h-8 rounded-full relative transition-colors ${fomoActive ? 'bg-red-600' : 'bg-gray-300'}`}
        >
          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${fomoActive ? 'right-1' : 'left-1'}`} />
        </button>
      </section>

      {/* MENU BUILDER */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 style={comicSansBold} className="text-lg flex items-center gap-2 uppercase">
            <Layers size={18} className="text-[#FFD700]"/> Structure
          </h3>
          <button 
            onClick={() => addLevel()}
            className="text-xs bg-black text-white px-4 py-2 uppercase"
            style={comicSansBold}
          >
            + Add Root Category
          </button>
        </div>

        {renderItems(menu)}
      </section>
    </div>
  );
};

export default AdminMenuSettings;
