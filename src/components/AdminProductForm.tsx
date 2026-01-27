import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, Calculator, Save, Globe } from 'lucide-react';
import type { Category, ShippingSetting } from '../lib/database.types';

// THE SLUG MACHINE: Turns "My Watch!" into "my-watch"
const slugify = (text: string) => {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')     
    .replace(/[^\w-]+/g, '')  
    .replace(/--+/g, '-');    
};

export const AdminProductForm = () => {
  // --- FORM STATES ---
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // --- DATABASE STATES ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [shippingRates, setShippingRates] = useState<ShippingSetting[]>([]);
  const [variants, setVariants] = useState([{ color_name: '', variant_image_url: '' }]);

  // Load Categories and Shipping Rates from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: cat } = await supabase.from('categories').select('*');
      const { data: ship } = await supabase.from('shipping_settings').select('*');
      if (cat) setCategories(cat);
      if (ship) setShippingRates(ship);
    };
    fetchData();
  }, []);

  // AUTO-SLUG LOGIC: Updates whenever title changes
  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  // --- SMART MATH LOGIC ---
  const shippingCost = shippingRates.find(r => weight <= r.weight_limit_grams)?.price || 0;
  const netProfit = sellingPrice - costPrice - shippingCost;

  // --- SAVE TO DATABASE ---
  const handleSaveProduct = async () => {
    if (!title || !selectedCategory) return alert("Please fill Title and Category");

    const { data: product, error } = await supabase.from('products').insert([{
      title, slug, description, main_image_url: mainImage,
      category_id: selectedCategory, price_now: sellingPrice,
      cost_price: costPrice, weight_grams: weight
    }]).select().single();

    if (product) {
      // Save variants if they have data
      const variantsToSave = variants.filter(v => v.color_name).map(v => ({
        ...v, product_id: product.id
      }));
      if (variantsToSave.length > 0) {
        await supabase.from('product_variants').insert(variantsToSave);
      }
      alert("Product successfully added to Kevin11!");
    } else {
      console.error(error);
      alert("Error saving product.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">
        <h1 className="text-4xl font-black uppercase italic mb-8">Add New Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMN 1: BASIC INFO */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-4 bg-gray-50 border-2 border-black">
              <label className="block text-xs font-black uppercase mb-2">Product Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} 
                className="w-full p-3 border-2 border-black font-bold outline-none" placeholder="Enter product name..." />
              
              <div className="mt-4 flex items-center gap-2 text-blue-600 bg-blue-50 p-2 border border-blue-200">
                <Globe size={14} />
                <span className="text-[10px] font-bold uppercase">URL: vamoss.shop/product/{slug}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-2 border-black">
              <label className="block text-xs font-black uppercase mb-2">Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border-2 border-black font-bold bg-white">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="p-4 bg-gray-50 border-2 border-black">
              <label className="block text-xs font-black uppercase mb-2">Color Variants</label>
              {variants.map((v, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input placeholder="Color" className="w-1/3 p-2 border-2 border-black" 
                    onChange={(e) => {
                      const newV = [...variants];
                      newV[i].color_name = e.target.value;
                      setVariants(newV);
                    }} />
                  <input placeholder="Image URL" className="w-2/3 p-2 border-2 border-black" 
                    onChange={(e) => {
                      const newV = [...variants];
                      newV[i].variant_image_url = e.target.value;
                      setVariants(newV);
                    }} />
                </div>
              ))}
              <button onClick={() => setVariants([...variants, { color_name: '', variant_image_url: '' }])}
                className="text-[10px] font-black uppercase flex items-center gap-1 mt-2 underline">
                <Plus size={12} /> Add Another Color
              </button>
            </div>
          </div>

          {/* COLUMN 2: THE SECRET MATH BOX */}
          <div className="bg-black text-white p-6 h-fit sticky top-6 border-4 border-[#D4AF37]">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4 text-[#D4AF37]">
              <Calculator size={24} />
              <h2 className="font-black uppercase tracking-widest">Admin Dashboard</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">Cost Price</label>
                <input type="number" value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-gray-600 p-2 font-black text-xl text-white outline-none" />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">Selling Price</label>
                <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-gray-600 p-2 font-black text-xl text-white outline-none" />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">Weight (Grams)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-gray-600 p-2 font-black text-xl text-white outline-none" />
              </div>

              <div className="pt-6 border-t border-gray-700 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 uppercase font-bold">Shipping Fee:</span>
                  <span className="font-black">Rs. {shippingCost}</span>
                </div>
                <div className="flex justify-between items-center bg-[#D4AF37] p-3 text-black rounded-sm">
                  <span className="text-[10px] font-black uppercase">Net Profit:</span>
                  <span className="text-2xl font-black">Rs. {netProfit}</span>
                </div>
              </div>
            </div>

            <button onClick={handleSaveProduct}
              className="w-full mt-8 bg-white text-black py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-colors">
              <Save size={18} /> Publish Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
