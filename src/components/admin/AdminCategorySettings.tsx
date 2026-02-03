// src/components/admin/AdminCategorySettings.tsx
import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Save, 
  Link2, 
  Tag, 
  ImageIcon 
} from 'lucide-react';

// Using your existing ImageUploader laborer
import { ImageUploader } from '../ImageUploader';

interface Category {
  id: number;
  title: string;
  image: string;
  linkType: 'collection' | 'page' | 'product';
  linkTarget: string;
}

const AdminCategorySettings = () => {
  // Signature Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: 'Gadgets', image: '', linkType: 'collection', linkTarget: 'gadgets' },
    { id: 2, title: 'Men Grooming', image: '', linkType: 'collection', linkTarget: 'men-grooming' },
  ]);

  const addCategory = () => {
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, title: '', image: '', linkType: 'collection', linkTarget: '' }]);
  };

  const updateCategory = (id: number, key: keyof Category, value: any) => {
    const updated = categories.map(cat => cat.id === id ? { ...cat, [key]: value } : cat);
    setCategories(updated);
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const saveCategories = () => {
    // NOTE 5: Sync the entire categories array to Supabase
    alert('Category Map Synchronized with Storefront!');
    console.log(categories);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic text-black flex items-center gap-3">
            <Layers className="text-[#FFD700]" /> CATEGORY SUPERVISOR
          </h2>
          <p style={comicSansRegular} className="text-gray-500">Organize your store layout and main navigation blocks.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={addCategory}
            className="flex items-center gap-2 bg-white text-black border-2 border-black px-6 py-3 hover:bg-gray-100 transition-all"
            style={comicSansBold}
          >
            <Plus size={20} /> ADD NEW
          </button>
          <button 
            onClick={saveCategories}
            className="flex items-center gap-2 bg-black text-[#FFD700] border-2 border-[#FFD700] px-8 py-3 hover:bg-[#FFD700] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            style={comicSansBold}
          >
            <Save size={20} /> SAVE ALL
          </button>
        </div>
      </div>

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-1 gap-6">
        {categories.map((cat, index) => (
          <div key={cat.id} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row">
            
            {/* Left: Image Picker */}
            <div className="w-full md:w-64 bg-gray-50 p-6 border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col items-center justify-center gap-4">
              <span style={comicSansBold} className="text-[10px] uppercase text-gray-400">Category Cover</span>
              {cat.image ? (
                <div className="relative w-32 h-32 border-2 border-black">
                  <img src={cat.image} alt="Cat" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => updateCategory(cat.id, 'image', '')}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full border border-black"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <ImageUploader onUploadSuccess={(url) => updateCategory(cat.id, 'image', url)} />
                </div>
              )}
            </div>

            {/* Right: Settings */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <label style={comicSansBold} className="text-[10px] uppercase block mb-1">Category Title</label>
                  <input 
                    value={cat.title}
                    onChange={(e) => updateCategory(cat.id, 'title', e.target.value)}
                    className="w-full text-xl font-bold border-b-2 border-black outline-none focus:border-[#FFD700] py-1"
                    placeholder="Enter Title..."
                    style={comicSansBold}
                  />
                </div>
                <button 
                  onClick={() => deleteCategory(cat.id)}
                  className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label style={comicSansBold} className="text-[10px] uppercase flex items-center gap-2">
                    <Link2 size={12} /> Link Type
                  </label>
                  <select 
                    value={cat.linkType}
                    onChange={(e) => updateCategory(cat.id, 'linkType', e.target.value)}
                    className="w-full border-2 border-black p-2 bg-white"
                    style={comicSansRegular}
                  >
                    <option value="collection">Collection</option>
                    <option value="page">Custom Page</option>
                    <option value="product">Single Product</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label style={comicSansBold} className="text-[10px] uppercase flex items-center gap-2">
                    <Tag size={12} /> Target ID / Slug
                  </label>
                  <input 
                    value={cat.linkTarget}
                    onChange={(e) => updateCategory(cat.id, 'linkTarget', e.target.value)}
                    className="w-full border-2 border-black p-2 outline-none focus:bg-yellow-50"
                    placeholder="e.g. winter-collection"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-20 bg-gray-100 border-4 border-dashed border-gray-300">
          <p style={comicSansBold} className="text-gray-400">NO CATEGORIES FOUND. CLICK "ADD NEW" TO START.</p>
        </div>
      )}
    </div>
  );
};

export default AdminCategorySettings;
