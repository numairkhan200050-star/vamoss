import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutGrid, List, ChevronDown, Sparkles } from 'lucide-react';

export const ProductListingPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(10); // Start with 10

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Fetch latest 20 products, newest first
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Spotlight Logic: We define it here to "inject" it into the middle of the mobile list
  const SpotlightBox = () => (
    <div className="bg-black text-white p-6 border-4 border-[#FFD700] rounded-[30px] shadow-[8px_8px_0px_0px_rgba(255,215,0,0.3)] my-6">
      <div className="flex items-center gap-2 text-[#FFD700] mb-2">
        <Sparkles size={18} />
        <span className="text-[10px] font-black uppercase tracking-widest">Kevin11 Spotlight</span>
      </div>
      <h3 className="text-xl font-black uppercase italic italic">Hottest Seller This Week</h3>
      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Limited Stock in Pakistan</p>
      <button className="mt-4 w-full bg-[#FFD700] text-black py-2 font-black uppercase text-xs italic">View Offer</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      {/* HEADER & FILTER BAR */}
      <div className="flex justify-between items-end mb-10 border-b-4 border-black pb-6">
        <div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">New Arrivals</h1>
          <p className="text-xs font-bold text-gray-500 uppercase mt-2">Showing {Math.min(displayLimit, products.length)} of {products.length} Luxury Items</p>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.slice(0, displayLimit).map((product, index) => (
          <React.Fragment key={product.id}>
            {/* MOBILE SPOTLIGHT: Injects after the 4th product on mobile only */}
            {index === 4 && (
              <div className="col-span-2 block md:hidden">
                <SpotlightBox />
              </div>
            )}

            {/* PRODUCT CARD */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] border-2 border-black rounded-[32px] overflow-hidden mb-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                {product.price_was > product.price_now && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full z-10 uppercase italic">
                    Sale
                  </div>
                )}
                <img src={product.main_image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="text-[11px] font-black uppercase line-clamp-1 mb-1">{product.title}</h4>
              <div className="flex gap-2 items-baseline">
                <span className="font-black text-lg">Rs. {product.price_now}</span>
                {product.price_was > 0 && (
                  <span className="text-[10px] font-bold text-gray-400 line-through">Rs. {product.price_was}</span>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* DESKTOP SPOTLIGHT: Shows as a card in the grid after 10 products */}
        {products.length > 5 && (
          <div className="hidden md:block md:col-span-2 lg:col-span-2 self-center">
            <SpotlightBox />
          </div>
        )}
      </div>

      {/* PAGINATION / SEE MORE */}
      {displayLimit < products.length && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <button 
            onClick={() => setDisplayLimit(prev => Math.min(prev + 10, 20))}
            className="group flex items-center gap-3 bg-white border-4 border-black px-12 py-4 font-black uppercase italic shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            See More Products <ChevronDown className="group-hover:rotate-180 transition-transform" />
          </button>
          
          <div className="flex gap-2 mt-4">
            <span className="w-8 h-8 flex items-center justify-center border-2 border-black font-black bg-black text-white">1</span>
            <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-200 font-black text-gray-400 hover:border-black hover:text-black cursor-pointer">2</span>
          </div>
        </div>
      )}

      {loading && <div className="text-center py-20 font-black uppercase animate-pulse">Scanning Warehouse...</div>}
    </div>
  );
};
