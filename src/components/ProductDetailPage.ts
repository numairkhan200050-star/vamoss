import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ShoppingCart, Star, Truck, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductDetailPage = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<any>(null);
  const [variants, setVariants] = useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      // 1. Get Product Details
      const { data: prod } = await supabase.from('products').select('*').eq('id', productId).single();
      if (prod) {
        setProduct(prod);
        setActiveImage(prod.main_image_url);
        
        // 2. Get Variants (Colors)
        const { data: vars } = await supabase.from('product_variants').select('*').eq('product_id', productId);
        setVariants(vars || []);

        // 3. Get Related Products (Same Category)
        const { data: related } = await supabase.from('products')
          .select('*')
          .eq('category_id', prod.category_id)
          .neq('id', productId) // Don't show the current product
          .limit(10);
        setRelatedProducts(related || []);
      }
    };
    fetchProductData();
  }, [productId]);

  if (!product) return <div className="p-20 text-center font-black uppercase">Loading Luxury...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="space-y-4">
          <div className="aspect-square border-4 border-black rounded-[40px] overflow-hidden bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <img src={activeImage} alt={product.title} className="w-full h-full object-cover" />
          </div>
          {/* Variant Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            <img 
              src={product.main_image_url} 
              onClick={() => setActiveImage(product.main_image_url)}
              className={`w-20 h-20 border-2 rounded-xl cursor-pointer object-cover ${activeImage === product.main_image_url ? 'border-black' : 'border-transparent'}`}
            />
            {variants.map((v) => (
              <img 
                key={v.id}
                src={v.image_url} 
                onClick={() => {
                  setActiveImage(v.image_url);
                  setSelectedVariant(v.color_name);
                }}
                className={`w-20 h-20 border-2 rounded-xl cursor-pointer object-cover ${activeImage === v.image_url ? 'border-black' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{product.title}</h1>
            <div className="flex items-center gap-2">
              <div className="flex text-[#FFD700]"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <span className="text-[10px] font-bold uppercase text-gray-400">(48 Reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-black text-black">Rs. {product.price_now}</span>
            {product.price_was > 0 && (
              <span className="text-xl font-bold text-gray-400 line-through">Rs. {product.price_was}</span>
            )}
          </div>

          {/* COLOR SELECTOR */}
          {variants.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-black uppercase">Select Color: <span className="text-[#FFD700]">{selectedVariant}</span></p>
              <div className="flex gap-3">
                {variants.map((v) => (
                  <button 
                    key={v.id}
                    onClick={() => { setActiveImage(v.image_url); setSelectedVariant(v.color_name); }}
                    className={`px-4 py-2 border-2 font-bold text-[10px] uppercase transition-all ${selectedVariant === v.color_name ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
                  >
                    {v.color_name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="w-full bg-[#FFD700] border-4 border-black py-5 font-black uppercase italic text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
            <ShoppingCart /> Order via Cash on Delivery
          </button>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase"><Truck size={16} className="text-[#FFD700]"/> Fast Delivery</div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase"><ShieldCheck size={16} className="text-[#FFD700]"/> 7 Days Warranty</div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-20 border-t-4 border-black pt-10">
        <h3 className="text-2xl font-black uppercase italic mb-8">Customer Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-gray-50 p-6 rounded-2xl border-2 border-black italic">
              <p className="text-sm font-bold">"Best quality product I found in Pakistan. Delivery was super fast via Leopard. Recommended!"</p>
              <p className="mt-4 text-[10px] font-black uppercase">— Ahmed K. from Lahore</p>
           </div>
           {/* More reviews would be mapped here from database */}
        </div>
      </div>

      {/* RELEVANT CAROUSEL */}
      <div className="mt-20">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-2xl font-black uppercase italic">You May Also Like</h3>
          <div className="flex gap-2">
            <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><ChevronLeft size={20}/></button>
            <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><ChevronRight size={20}/></button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {relatedProducts.map((rp) => (
            <div key={rp.id} className="min-w-[200px] group cursor-pointer">
              <div className="aspect-square border-2 border-black rounded-3xl overflow-hidden mb-3">
                <img src={rp.main_image_url} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
              </div>
              <p className="text-[10px] font-black uppercase line-clamp-1">{rp.title}</p>
              <p className="text-sm font-bold">Rs. {rp.price_now}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
