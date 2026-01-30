import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ShoppingCart, Star, Truck, ShieldCheck, 
  ChevronLeft, ChevronRight, CheckCircle2, 
  Package, Timer, Share2 
} from 'lucide-react';
import ProductCard from './ProductCard'; // Rule: Reuse existing components

export const ProductDetailPage = () => {
  const { slug } = useParams(); // Using slug for SEO as per AdminProductForm
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<any>(null);
  const [variants, setVariants] = useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      // 1. Get Product Details by Slug
      const { data: prod } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (prod) {
        setProduct(prod);
        setActiveImage(prod.main_image_url);
        
        // 2. Get Variants (Colors/Sizes)
        const { data: vars } = await supabase
          .from('product_variants')
          .select('*')
          .eq('product_id', prod.id);
        setVariants(vars || []);

        // 3. Get Related Products (Same Category)
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', prod.category_id)
          .neq('id', prod.id)
          .limit(8);
        setRelatedProducts(related || []);
      }
      setLoading(false);
    };
    fetchProductData();
  }, [slug]);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-black border-t-[#FFD700] rounded-full animate-spin" />
      <p className="font-black uppercase italic text-sm tracking-widest">Loading Premium Gear...</p>
    </div>
  );

  if (!product) return <div className="p-20 text-center font-black uppercase">Product Not Found</div>;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 font-sans text-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: IMAGE GALLERY (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-square border-[3px] border-black rounded-[40px] overflow-hidden bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group">
            <img 
              src={activeImage} 
              alt={product.title} 
              className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" 
            />
            {product.price_was > product.price_now && (
              <div className="absolute top-8 left-8 bg-red-600 text-white px-4 py-1 rounded-full font-black uppercase text-xs animate-bounce">
                Save Rs. {product.price_was - product.price_now}
              </div>
            )}
          </div>

          {/* Thumbnails Grid */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <button 
              onClick={() => setActiveImage(product.main_image_url)}
              className={`flex-shrink-0 w-24 h-24 border-2 rounded-2xl overflow-hidden transition-all ${activeImage === product.main_image_url ? 'border-black scale-95 shadow-inner' : 'border-gray-100 opacity-60'}`}
            >
              <img src={product.main_image_url} className="w-full h-full object-cover" />
            </button>
            {variants.map((v) => (
              <button 
                key={v.id}
                onClick={() => { setActiveImage(v.image_url); setSelectedVariant(v.color_name); }}
                className={`flex-shrink-0 w-24 h-24 border-2 rounded-2xl overflow-hidden transition-all ${activeImage === v.image_url ? 'border-black scale-95' : 'border-gray-100 opacity-60'}`}
              >
                <img src={v.image_url} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO (Col 5) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="bg-black text-[#FFD700] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">In Stock</span>
               <div className="flex text-[#FFD700]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor"/>)}
               </div>
               <span className="text-[10px] font-bold uppercase text-gray-400">Verified Quality</span>
            </div>
            
            <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-[0.9] text-black">
              {product.title}
            </h1>
            
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              {product.description || "Premium quality product sourced and tested by Kevin11. Built for durability and style."}
            </p>
          </div>

          <div className="flex items-center gap-6 bg-gray-50 p-6 border-l-8 border-[#FFD700] rounded-r-2xl">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price Now</p>
              <span className="text-4xl font-black text-black leading-none">Rs. {product.price_now}</span>
            </div>
            {product.price_was > 0 && (
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 line-through">Was</p>
                <span className="text-xl font-bold text-gray-300 line-through leading-none">Rs. {product.price_was}</span>
              </div>
            )}
          </div>

          {/* VARIANTS SELECTION */}
          {variants.length > 0 && (
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                Style / Color: <span className="text-[#FFD700]">{selectedVariant || "Select Option"}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {variants.map((v) => (
                  <button 
                    key={v.id}
                    onClick={() => { setActiveImage(v.image_url); setSelectedVariant(v.color_name); }}
                    className={`px-6 py-3 border-2 font-black text-[10px] uppercase tracking-widest transition-all rounded-xl ${selectedVariant === v.color_name ? 'bg-black text-white border-black shadow-lg' : 'bg-white border-gray-200 hover:border-black'}`}
                  >
                    {v.color_name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA SECTION */}
          <div className="space-y-4">
            <button className="w-full bg-[#FFD700] border-[3px] border-black py-6 font-black uppercase italic text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4">
              <ShoppingCart size={28} /> Confirm Order (COD)
            </button>
            <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-tighter">
              Clicking above will open your order summary. No credit card required.
            </p>
          </div>

          {/* TRUST BADGES GRID */}
          <div className="grid grid-cols-2 gap-px bg-gray-200 border-2 border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-white p-4 flex items-center gap-3">
              <Truck size={20} className="text-[#FFD700]" />
              <div className="flex flex-col"><span className="text-[9px] font-black uppercase leading-none">Fast Delivery</span><span className="text-[8px] text-gray-400 uppercase font-bold">2-4 Days</span></div>
            </div>
            <div className="bg-white p-4 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#FFD700]" />
              <div className="flex flex-col"><span className="text-[9px] font-black uppercase leading-none">Genuine Gear</span><span className="text-[8px] text-gray-400 uppercase font-bold">100% Authentic</span></div>
            </div>
            <div className="bg-white p-4 flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#FFD700]" />
              <div className="flex flex-col"><span className="text-[9px] font-black uppercase leading-none">7 Day Warranty</span><span className="text-[8px] text-gray-400 uppercase font-bold">Easy Returns</span></div>
            </div>
            <div className="bg-white p-4 flex items-center gap-3">
              <Package size={20} className="text-[#FFD700]" />
              <div className="flex flex-col"><span className="text-[9px] font-black uppercase leading-none">Open Parcel</span><span className="text-[8px] text-gray-400 uppercase font-bold">Check then Pay</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-24">
        <div className="flex items-center gap-4 mb-12">
           <div className="h-[3px] w-12 bg-[#FFD700]" />
           <h3 className="text-3xl font-black uppercase italic tracking-tighter">Voice of Customers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "Ahmed K.", city: "Lahore", text: "The quality is better than what I saw in the pictures. Highly recommend K11." },
             { name: "Sara M.", city: "Karachi", text: "Got my hair dryer within 2 days. Packaging was very professional." },
             { name: "Zubair", city: "Islamabad", text: "Finally a reliable tech store in Pakistan. The warranty claim is also real." }
           ].map((rev, i) => (
             <div key={i} className="p-8 border-2 border-black rounded-[30px] bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] relative">
                <Star className="absolute top-6 right-8 text-[#FFD700] fill-[#FFD700]" size={16} />
                <p className="text-sm font-bold italic mb-6">"{rev.text}"</p>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-[#FFD700] font-black text-[10px]">{rev.name[0]}</div>
                   <div>
                     <p className="text-[10px] font-black uppercase">{rev.name}</p>
                     <p className="text-[8px] font-bold text-gray-400 uppercase">{rev.city}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* RELATED PRODUCTS - Using Rule: Consistent Horizontal Scroll */}
      <div className="mt-24">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
             <div className="h-1 w-10 bg-[#FFD700]" />
             <h3 className="text-3xl font-black uppercase italic tracking-tighter">Complete Your Set</h3>
          </div>
          <div className="flex gap-2">
            <button className="p-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"><ChevronLeft size={20}/></button>
            <button className="p-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"><ChevronRight size={20}/></button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-12 no-scrollbar snap-x snap-mandatory">
          {relatedProducts.map((rp) => (
            <div key={rp.id} className="snap-start">
              <ProductCard 
                name={rp.title}
                price={rp.price_now}
                originalPrice={rp.price_was}
                image={rp.spot_image_url || rp.main_image_url}
                isSale={rp.price_was > rp.price_now}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
