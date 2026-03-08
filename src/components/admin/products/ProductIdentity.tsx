// src/components/admin/products/ProductIdentity.tsx
import React, { useEffect, useState } from 'react';
// FIX: Removed 'LayoutText' and ensured 'FileText' is used instead
import { Globe, FileText, Search, Type, FolderTree } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ProductIdentityProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  categoryId: string | null;
  setCategoryId: (val: string) => void;
}

export const ProductIdentity: React.FC<ProductIdentityProps> = ({
  title, setTitle,
  description, setDescription,
  slug, setSlug,
  metaTitle, setMetaTitle,
  metaDescription, setMetaDescription,
  categoryId, setCategoryId
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase
        .from('categories')
        .select('id, name, parent_id')
        .order('name', { ascending: true });
      if (data) setCategories(data);
    };
    fetchCats();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 style={comicSansBold} className="text-xl uppercase mb-4 flex items-center gap-2 border-b-4 border-black pb-2">
          {/* FIX: Changed LayoutText to FileText */}
          <FileText size={20} /> Storefront Display
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400">Public Product Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full p-4 border-4 border-black font-bold text-xl outline-none focus:bg-yellow-50"
                placeholder="e.g. Vintage Denim Jacket"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-gray-400">Description</label>
              <div className="border-4 border-black">
                <div className="bg-gray-100 border-b-2 border-black p-2 flex gap-4 text-xs font-black italic">
                  <span>BOLD</span> <span>ITALIC</span> <span>🚀 EMOJI</span>
                </div>
                <textarea 
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 outline-none font-medium text-sm leading-relaxed"
                  placeholder="Fabric, fit, and style details..."
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-1 bg-yellow-50 border-4 border-black p-4">
            <label className="text-[10px] font-black uppercase flex items-center gap-1 mb-2">
              <FolderTree size={14} /> Assign Category
            </label>
            <select 
              value={categoryId || ''}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-3 border-2 border-black font-bold text-xs bg-white cursor-pointer uppercase"
            >
              <option value="">-- No Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.parent_id ? `↳ ${cat.name}` : cat.name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(255,215,0,1)]">
        <h2 style={comicSansBold} className="text-xl uppercase mb-4 text-[#FFD700] flex items-center gap-2 border-b-2 border-[#FFD700] pb-2">
          <Search size={20} /> SEO & Google Meta
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-[#FFD700]">Meta Title</label>
              <input 
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full p-2 bg-zinc-900 border-2 border-[#FFD700] text-white outline-none focus:bg-zinc-800"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#FFD700]">URL Slug</label>
              <input 
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-2 bg-zinc-900 border-2 border-gray-600 text-gray-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-[#FFD700]">Meta Description</label>
            <textarea 
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full p-2 bg-zinc-900 border-2 border-[#FFD700] text-white outline-none text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
