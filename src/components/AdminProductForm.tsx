import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ImageUploader } from './ImageUploader'; // Import your separate component
import { Plus, Calculator, Save, Globe, FileText, AlertCircle } from 'lucide-react';

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
  const [status, setStatus] = useState('published');
  
  // --- SEO META STATES ---
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // --- PRICING & LOGISTICS ---
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0); 
  const [weight, setWeight] = useState(0);
  
  // --- DATABASE DATA ---
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [variants, setVariants] = useState([{ color_name: '', image_url: '' }]);

  // Load Categories & Leopard Shipping Rates
  useEffect(() => {
    const fetchData = async () => {
      const { data: cat } = await supabase.from('categories').select('*');
      const { data: ship } = await supabase.from('shipping_settings').select('*');
      if (cat) setCategories(cat);
      if (ship) setShippingRates(ship);
    };
    fetchData();
  }, []);

  // Auto-generate URL Slug
  useEffect(() => { setSlug(slugify(title)); }, [title]);

  // --- BUSINESS LOGIC (LEOPARD MATH) ---
  const shippingCost = shippingRates.find(r => weight <= r.weight_limit_grams)?.price || 0;
  const netProfit = sellingPrice - costPrice - shippingCost;
  const margin = sellingPrice > 0 ? ((netProfit / sellingPrice) * 100).toFixed(1) : 0;

  // --- SAVE ACTION ---
  const handleSave = async () => {
    if (!title || !selectedCategory || !mainImage) {
      return alert("Missing Data: Please ensure Title, Category, and Main Image are set.");
    }

    const { data: product, error } = await supabase.from('products').insert([{
      title, slug, description, main_image_url: mainImage,
      category_id: selectedCategory, price_now: sellingPrice,
      price_was: oldPrice, cost_price: costPrice, 
      weight_grams: weight, status, meta_title: metaTitle, 
      meta_description: metaDescription
    }]).select().single();

    if (product) {
      const variantsToSave = variants.filter(v => v.color_name && v.image_url).map(v => ({
        ...v, product_id: product.id
      }));
      if (variantsToSave.length > 0) {
        await supabase.from('product_variants').insert(variantsToSave);
      }
      alert("Success! Product is now live on KEVIN11.");
    } else {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-black bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Product Engine</h1>
          <div className="flex gap-2 items-center mt-1">
             <span className={`h-2 w-2 rounded-full ${status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
             <select value={status} onChange={(e) => setStatus(e.target.value)} className="text-[10px] font-bold uppercase bg-transparent outline-none cursor-pointer">
               <option value="published">Status: Published</option>
               <option value="draft">Status: Draft</option>
               <option value="deactive">Status: Deactive</option>
             </select>
          </div>
        </div>
        <button onClick={handleSave} className="bg-[#FFD700] border-4 border-black px-10 py-3 font-black uppercase italic hover:bg-black hover:text-[#FFD700] transition-all">
          <Save className="inline mr-2" /> Publish Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SEO & IDENTITY CARD */}
          <div className="bg-white border-4 border-black p-6 space-y-4">
            <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2"><Globe size={14}/> SEO & Identity</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 border-2 border-black font-bold text-xl outline-none" placeholder="Product Name..." />
            
            <div className="grid grid-cols-2 gap-4">
               <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="p-3 border-2 border-gray-100 text-xs font-bold outline-none" placeholder="SEO Title (Google Display)" />
               <div className="bg-blue-50 p-3 text-[10px] font-mono text-blue-600 border border-blue-100 truncate">URL: /product/{slug}</div>
            </div>
            
            <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="w-full p-3 border-2 border-gray-100 text-xs" placeholder="Meta Description (SEO Summary)" />
            
            {/* Modular Main Image Uploader */}
            <div className="pt-4 border-t border-gray-100">
               <ImageUploader label="Primary Product Photo" onUploadSuccess={(url) => setMainImage(url)} />
            </div>
          </div>

          {/* DESCRIPTION CARD */}
          <div className="bg-white border-4 border-black p-6 space-y-4">
            <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2"><FileText size={14}/> Product Description</h2>
            <textarea rows={6} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-4 border-2 border-gray-100 font-medium outline-none" placeholder="Bold points, features, and details..." />
          </div>

          {/* VARIANTS CARD */}
          <div className="bg-white border-4 border-black p-6 space-y-4">
            <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 italic">Color Options & Media</h2>
            {variants.map((v, i) => (
              <div key={i} className="grid grid-cols-2 gap-6 pb-6 border-b border-gray-100 items-center">
                <input placeholder="Color Name" className="p-3 border-2 border-black font-bold uppercase text-xs h-fit" onChange={(e) => {
                  const newV = [...variants]; newV[i].color_name = e.target.value; setVariants(newV);
                }} />
                {/* Modular Variant Uploader */}
                <ImageUploader label={`Photo for ${v.color_name || 'Variant'}`} onUploadSuccess={(url) => {
                  const newV = [...variants]; newV[i].image_url = url; setVariants(newV);
                }} />
              </div>
            ))}
            <button onClick={() => setVariants([...variants, { color_name: '', image_url: '' }])} className="text-[10px] font-black uppercase underline decoration-2 decoration-[#FFD700]">+ Add Color Variant</button>
          </div>
        </div>

        {/* RIGHT COLUMN: THE BRAIN */}
        <div className="space-y-6">
          <div className="bg-black text-white p-6 border-4 border-[#FFD700] sticky top-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-black uppercase mb-6 text-[#FFD700] flex items-center gap-2 italic underline decoration-white"><Calculator /> Profit Logic</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                 <div><label className="text-[10px] text-gray-400 font-bold uppercase">Cost (PKR)</label><input type="number" value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-white outline-none" /></div>
                 <div><label className="text-[10px] text-gray-400 font-bold uppercase">Selling (PKR)</label><input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-[#FFD700] text-xl outline-none" /></div>
              </div>
              
              <div><label className="text-[10px] text-gray-400 font-bold uppercase">Old Price (For Sale Label)</label><input type="number" value={oldPrice} onChange={(e) => setOldPrice(Number(e.target.value))} className="w-full bg-transparent border-b border-gray-700 p-2 font-bold text-gray-500 outline-none" /></div>

              <div><label className="text-[10px] text-gray-400 font-bold uppercase">Weight (Grams)</label><input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-white outline-none" /></div>

              <div className="bg-zinc-900 p-4 border-l-4 border-[#FFD700]">
                <div className="flex justify-between text-[10px] mb-2 font-bold">
                  <span className="text-gray-500 uppercase">Leopard Shipping:</span>
                  <span>Rs. {shippingCost}</span>
                </div>
                <div className="flex justify-between items-center text-[#FFD700]">
                  <span className="text-xs font-black uppercase">Net Profit:</span>
                  <div className="text-right">
                    <p className="text-2xl font-black italic leading-none">Rs. {netProfit}</p>
                    <p className="text-[9px] font-bold text-green-500 mt-1 uppercase">{margin}% Margin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6 space-y-4">
            <label className="text-[10px] font-black uppercase block border-b-2 border-black pb-1">Primary Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-3 border-2 border-black font-black bg-white uppercase text-xs cursor-pointer">
              <option value="">Select...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
