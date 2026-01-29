import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronDown, Sparkles, ShoppingCart } from 'lucide-react';

export const ProductListingPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
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

  // Updated Spotlight: Removed Windows 98 borders, used modern rounding and soft shadow
  const SpotlightBox = () => (
    <div className="bg-black text-white p-6 rounded-2xl shadow-xl my-6 border border-gray-800 relative overflow-hidden">
      <div className="flex items-center gap-2 text-[#FFD700] mb-2">
        <Sparkles size={18} />
        <span className="text-[10px] font-black uppercase tracking-widest">Kevin11 Spotlight</span>
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight">Hottest Seller This Week</h3>
      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Limited Stock in Pakistan</p>
      <button className="mt-4 w-full bg-[#FFD700] text-black py-2.5 rounded-lg font-black uppercase text-xs transition-transform active:scale-95">
        View Offer
      </button>
    </div>
  );

  return (
    <div className="max-w-[1360px] mx-auto px-4 py-12 font-sans bg-[#fbfbfb]">
      {/* HEADER: Cleaned up the borders */}
      <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black">New Arrivals</h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase mt-2 tracking-widest">
            Showing {Math.min(displayLimit, products.length)} of {products.length} Luxury Items
          </p>
        </div>
      </div>

      {/* PRODUCT GRID: Modern 5-column layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.slice(0, displayLimit).map((product, index) => (
          <React.Fragment key={product.id}>
            {/* MOBILE SPOTLIGHT */}
            {index === 4 && (
              <div className="col-span-2 block md:hidden">
                <SpotlightBox />
              </div>
            )}

            {/* MODERN PRODUCT CARD: No more heavy borders/elongation */}
            <div className="group bg-white p-3 rounded-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
              {/* Square Image Container */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#f9f9f9] mb-4">
                {product.price_was > product.price_now && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm z-10 uppercase">
                    Sale
                  </div>
                )}
                <img 
                  src={product.main_image_url} 
                  alt={product.title} 
                  className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700" 
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col flex-grow">
                <h4 className="text-[12px] font-bold uppercase text-gray-800 line-clamp-2 leading-tight h-8 tracking-tight mb-2">
                  {product.title}
                </h4>
                
                <div className="mt-auto">
                  <div className="flex gap-2 items-baseline mb-3">
                    <span className="font-black text-lg text-black">Rs. {product.price_now}</span>
                    {product.price_was > 0 && (
                      <span className="text-[10px] font-bold text-gray-400 line-through">Rs. {product.price_was}</span>
                    )}
                  </div>

                  {/* YOUR SELECTED "GHOST" BUTTON */}
                  <button className="w-full bg-transparent border-2 border-black text-black hover:bg-black hover:text-white py-2 rounded-lg font-black text-[10px] flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest">
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* DESKTOP SPOTLIGHT */}
        {products.length > 5 && (
          <div className="hidden lg:block lg:col-span-2 self-center">
            <SpotlightBox />
          </div>
        )}
      </div>

      {/* PAGINATION: Modernized with "Ghost" style buttons */}
      {displayLimit < products.length && (
        <div className="mt-20 flex flex-col items-center gap-6">
          <button 
            onClick={() => setDisplayLimit(prev => Math.min(prev + 10, 20))}
            className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
          >
            See More Products <ChevronDown size={18} />
          </button>
          
          <div className="flex gap-3 mt-4">
            <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black font-black bg-black text-white text-sm cursor-default">1</span>
            <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 font-black text-gray-400 hover:border-black hover:text-black cursor-pointer text-sm transition-colors">2</span>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="font-black uppercase tracking-[0.3em] animate-pulse text-black">Updating Warehouse...</div>
        </div>
      )}
    </div>
  );
};
