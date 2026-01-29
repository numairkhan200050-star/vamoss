import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronDown, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';

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
      <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black">New Arrivals</h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase mt-2 tracking-widest">
            Showing {Math.min(displayLimit, products.length)} of {products.length} Luxury Items
          </p>
        </div>
      </div>

      {/* FIXED GRID: Added -space-y-20 and gap-2 to handle the 0.7x scale cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 -space-y-20">
        {products.slice(0, displayLimit).map((product, index) => (
          <React.Fragment key={product.id}>
            {index === 4 && (
              <div className="col-span-2 block md:hidden scale-[0.8]">
                <SpotlightBox />
              </div>
            )}

            {/* Container wrapper with fixed height to keep rows aligned */}
            <div className="flex justify-center h-[340px]">
              <ProductCard 
                name={product.title}
                price={product.price_now}
                originalPrice={product.price_was}
                image={product.main_image_url}
                isSale={product.price_was > product.price_now}
              />
            </div>
          </React.Fragment>
        ))}

        {products.length > 5 && (
          <div className="hidden lg:block lg:col-span-2 self-center scale-[0.8] origin-left">
            <SpotlightBox />
          </div>
        )}
      </div>

      {displayLimit < products.length && (
        <div className="mt-10 flex flex-col items-center gap-6">
          <button 
            onClick={() => setDisplayLimit(prev => Math.min(prev + 10, 20))}
            className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
          >
            See More Products <ChevronDown size={18} />
          </button>
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
