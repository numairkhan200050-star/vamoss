import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, Calculator, Info } from 'lucide-react';
import type { Category, ShippingSetting } from '../lib/database.types';

export const AdminProductForm = () => {
  // 1. Basic Info State
  const [title, setTitle] = useState('');
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  
  // 2. Database Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [shippingRates, setShippingRates] = useState<ShippingSetting[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // 3. Variants State (Color Swapping Logic)
  const [variants, setVariants] = useState([{ color_name: '', variant_image_url: '' }]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: catData } = await supabase.from('categories').select('*');
    const { data: shipData } = await supabase.from('shipping_settings').select('*').order('weight_limit_grams', { ascending: true });
    if (catData) setCategories(catData);
    if (shipData) setShippingRates(shipData);
  };

  // --- KEVIN11 SMART MATH LOGIC ---
  const getShippingCost = () => {
    const rate = shippingRates.find(r => weight <= r.weight_limit_grams);
    return rate ? rate.price : (shippingRates[shippingRates.length - 1]?.price || 0);
  };

  const shippingCost = getShippingCost();
  const netProfit = sellingPrice - costPrice - shippingCost;
  const profitMargin = sellingPrice > 0 ? ((netProfit / sellingPrice) * 100).toFixed(1) : 0;

  const addVariant = () => setVariants([...variants, { color_name: '', variant_image_url: '' }]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black uppercase italic mb-8 border-b-4 border-[#D4AF37] inline-block">Add New Product</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: General Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Product Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border-2 border-black p-3 font-bold focus:bg-gray-50 outline-none" placeholder="e.g. Luxury Quartz Watch" />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full border-2 border-black p-3 font-bold outline-none bg-white">
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Cost Price (PKR)</label>
              <input type="number" value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} className="w-full border-2 border-black p-3 font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Selling Price (PKR)</label>
              <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className="w-full border-2 border-black p-3 font-bold" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Weight (Grams)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border-2 border-black p-3 font-bold" placeholder="e.g. 600" />
          </div>
        </div>

        {/* Right Side: The Smart Dashboard (Secret) */}
        <div className="bg-black p-6 text-white space-y-6">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Calculator size={20} />
            <span className="font-black uppercase italic tracking-widest text-sm">Profit Analysis</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 text-[10px] uppercase font-bold">Shipping (Leopard)</span>
              <span className="font-bold">Rs. {shippingCost}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 text-[10px] uppercase font-bold">Net Profit</span>
              <span className="font-black text-green-400 text-xl">Rs. {netProfit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-[10px] uppercase font-bold">Margin</span>
              <span className="font-black text-[#D4AF37]">{profitMargin}%</span>
            </div>
          </div>

          <div className="bg-gray-900 p-4 flex gap-3 items-start">
            <Info size={16} className="text-[#D4AF37] shrink-0 mt-1" />
            <p className="text-[10px] text-gray-400 leading-relaxed font-bold uppercase">
              This calculation includes the weight-based shipping rate you set in your dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Color Variants Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black uppercase italic text-xl tracking-tighter">Color Variants</h3>
          <button onClick={addVariant} className="bg-[#D4AF37] text-black px-4 py-2 text-xs font-black uppercase flex items-center gap-2 hover:bg-black hover:text-[#D4AF37] transition-all">
            <Plus size={14} /> Add Color
          </button>
        </div>

        <div className="space-y-4">
          {variants.map((v, index) => (
            <div key={index} className="flex gap-4 items-end bg-gray-50 p-4 border border-gray-200">
              <div className="flex-1">
                <label className="block text-[8px] font-black uppercase mb-1">Color Name</label>
                <input type="text" placeholder="Midnight Blue" className="w-full border-b border-black bg-transparent p-2 font-bold text-sm outline-none" />
              </div>
              <div className="flex-[2]">
                <label className="block text-[8px] font-black uppercase mb-1">Variant Image URL</label>
                <input type="text" placeholder="https://supabase.com/..." className="w-full border-b border-black bg-transparent p-2 font-bold text-sm outline-none" />
              </div>
              <button className="text-red-500 p-2 hover:bg-red-50 transition-all"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full mt-10 bg-black text-[#D4AF37] py-5 font-black uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 border-2 border-black">
        Upload Product to Kevin11
      </button>
    </div>
  );
};
