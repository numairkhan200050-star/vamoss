import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, Calculator, Save, Globe, Eye, EyeOff, FileText } from 'lucide-react';
import type { Category, ShippingSetting } from '../lib/database.types';

const slugify = (text: string) => {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')     
    .replace(/[^\w-]+/g, '')  
    .replace(/--+/g, '-');    
};

export const AdminProductForm = () => {
  // --- CORE STATES ---
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState(''); // Rich Text Content
  const [status, setStatus] = useState<'published' | 'draft' | 'deactive'>('draft');
  
  // --- SEO STATES ---
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // --- PRICING & LOGISTICS ---
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0); // The "Was" price for Sale
  const [weight, setWeight] = useState(0);
  
  // --- ORGANIZATION ---
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [shippingRates, setShippingRates] = useState<ShippingSetting[]>([]);
  const [variants, setVariants] = useState([{ color_name: '', variant_image_url: '', price_override: 0 }]);

  // Load Database Settings
  useEffect(() => {
    const fetchData = async () => {
      const { data: cat } = await supabase.from('categories').select('*');
      const { data: ship } = await supabase.from('shipping_settings').select('*');
      if (cat) setCategories(cat);
      if (ship) setShippingRates(ship);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  // --- BUSINESS MATH ---
  const shippingCost = shippingRates.find(r => weight <= r.weight_limit_grams)?.price || 0;
  const netProfit = sellingPrice - costPrice - shippingCost;
  const margin = sellingPrice > 0 ? ((netProfit / sellingPrice) * 100).toFixed(1) : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Product Engine</h1>
        <div className="flex gap-4">
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value as any)}
            className="p-2 border-2 border-black font-bold uppercase text-xs bg-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="deactive">Deactive</option>
          </select>
          <button className="bg-[#FFD700] border-4 border-black px-8 py-2 font-black uppercase italic flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Save size={20} /> Save Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION 1: IDENTITY & SEO */}
          <div className="bg-white border-4 border-black p-6 space-y-4">
            <h2 className="font-black uppercase text-sm border-b-2 border-black pb-2 flex items-center gap-2">
              <Globe size={18} /> SEO & Identity
            </h2>
            <input 
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border-2 border-black font-bold text-xl outline-none" 
              placeholder="Product Title..." 
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                className="p-3 border-2 border-gray-200 font-medium text-xs outline-none" 
                placeholder="Meta Title (Google Search Title)" 
              />
              <input 
                type="text" readOnly value={`/product/${slug}`}
                className="p-3 border-2 border-gray-100 font-mono text-[10px] bg-gray-50 text-blue-600" 
              />
            </div>
            <textarea 
              value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 text-xs font-medium" 
              placeholder="Meta Description (Short summary for Google results)"
            />
          </div>

          {/* SECTION 2: RICH DESCRIPTION */}
          <div className="bg-white border-4 border-black p-6 space-y-4">
            <h2 className="font-black uppercase text-sm border-b-2 border-black pb-2 flex items-center gap-2">
              <FileText size={18} /> Product Details
            </h2>
            <div className="flex gap-2 border-b-2 border-gray-100 pb-2 mb-2">
               <button className="px-3 py-1 border border-black font-black text-xs">B</button>
               <button className="px-3 py-1 border border-black italic text-xs">I</button>
               <button className="px-3 py-1 border border-black font-bold text-xs">List •</button>
            </div>
            <textarea 
              value={description} onChange={(e) => setDescription(e.target.value)}
              rows={8} className="w-full p-4 border-2 border-gray-100 outline-none font-medium"
              placeholder="Write your bullet points and bold features here..."
            />
          </div>

          {/* SECTION 3: VARIANTS (COLOR & PRICE) */}
          <div className="bg-white border-4 border-black p-6 space-y-4">
            <h2 className="font-black uppercase text-sm border-b-2 border-black pb-2">Color Variants & Specific Images</h2>
            {variants.map((v, i) => (
              <div key={i} className="flex gap-2 items-end border-b border-gray-100 pb-4">
                <div className="w-1/4">
                  <label className="text-[9px] font-black uppercase text-gray-400">Color Name</label>
                  <input className="w-full p-2 border-2 border-black text-sm font-bold" placeholder="Red" />
                </div>
                <div className="flex-1">
                  <label className="text-[9px] font-black uppercase text-gray-400">Variant Image URL</label>
                  <input className="w-full p-2 border-2 border-black text-sm" placeholder="https://..." />
                </div>
                <div className="w-1/4">
                  <label className="text-[9px] font-black uppercase text-gray-400">Price Override (Optional)</label>
                  <input className="w-full p-2 border-2 border-black text-sm font-black" placeholder="1800" />
                </div>
              </div>
            ))}
            <button onClick={() => setVariants([...variants, { color_name: '', variant_image_url: '', price_override: 0 }])}
              className="flex items-center gap-2 text-xs font-black uppercase underline mt-2">
              <Plus size={14} /> Add Color Option
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: THE BRAIN */}
        <div className="space-y-6">
          <div className="bg-black text-white p-6 border-4 border-[#FFD700] sticky top-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-6 text-[#FFD700]">
              <Calculator size={24} />
              <h2 className="font-black uppercase tracking-widest italic">Profit Logic</h2>
            </div>
            
            <div className="space-y-5">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Cost Price</label>
                    <input type="number" value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))}
                      className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-white outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Sale Price (Now)</label>
                    <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))}
                      className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-[#FFD700] text-xl outline-none" />
                  </div>
               </div>

               <div>
                 <label className="text-[10px] text-gray-500 font-bold uppercase">Weight (Grams for Leopard)</label>
                 <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                   className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-white outline-none" />
               </div>

               <div className="bg-zinc-900 p-4 space-y-2 border border-zinc-800">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-gray-500 uppercase">Leopard Shipping:</span>
                    <span>Rs. {shippingCost}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-black uppercase text-[#FFD700]">Net Profit:</span>
                    <div className="text-right">
                      <p className="text-2xl font-black italic">Rs. {netProfit}</p>
                      <p className="text-[10px] font-bold text-green-500">{margin}% Margin</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6">
             <label className="block text-[10px] font-black uppercase mb-4">Category Assignment</label>
             <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
               className="w-full p-3 border-2 border-black font-black bg-white uppercase text-xs cursor-pointer">
               <option value="">Choose Category</option>
               {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
             </select>
          </div>
        </div>
      </div>
    </div>
  );
};
