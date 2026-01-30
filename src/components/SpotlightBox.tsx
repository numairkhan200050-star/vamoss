import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TrendingUp, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Rule: Centralized Supabase client

const SpotlightBox = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [spotlightProducts, setSpotlightProducts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Fetch live data (Objective: Admin Control via Supabase)
  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'published')
          .eq('is_spotlight', true) // Assumes this column exists in your schema
          .limit(5);

        if (data) setSpotlightProducts(data);
      } catch (err) {
        console.error("Spotlight fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotlight();
  }, []);

  // 2. Auto-rotate logic
  useEffect(() => {
    if (spotlightProducts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [spotlightProducts]);

  // Logic: Hide on Homepage and Product Detail Pages (to reduce clutter)
  const isHiddenPage = location.pathname === '/' || location.pathname.includes('/product/');
  if (isHiddenPage || spotlightProducts.length === 0) return null;

  if (loading) return null; // Silent load to avoid layout shift

  const activeProduct = spotlightProducts[currentIndex];

  return (
    <div className="w-full max-w-[280px] bg-white border-2 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-24 z-40">
      {/* Heading Section */}
      <div className="bg-black text-white py-3 px-4 flex items-center justify-between">
        <h2 className="text-[11px] font-black uppercase tracking-widest italic flex items-center gap-2">
          <TrendingUp size={14} className="text-[#FFD700]" />
          Popular Now
        </h2>
        {/* Dynamic Label from DB or fallback */}
        <span className="text-[9px] font-bold text-[#FFD700] animate-pulse uppercase">
          {activeProduct.label || "Top Pick"}
        </span>
      </div>

      {/* Product Content */}
      <div className="p-4 space-y-4">
        {/* Image - Prioritize spot_image_url for 480x480 quality */}
        <div key={activeProduct.id} className="relative aspect-square rounded-[20px] overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-700">
          <img 
            src={activeProduct.spot_image_url || activeProduct.main_image_url} 
            alt={activeProduct.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Product Info */}
        <div className="text-center space-y-1 pb-2">
          <h3 className="text-sm font-black uppercase tracking-tight text-black line-clamp-2 leading-tight">
            {activeProduct.title}
          </h3>
          <p className="text-lg font-black text-black">
            Rs. {activeProduct.price_now || activeProduct.price}
          </p>
        </div>

        {/* CTA - Rule: Ensure professional routing */}
        <button 
          onClick={() => navigate(`/product/${activeProduct.slug}`)}
          className="w-full py-3 bg-[#FFD700] text-black text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black rounded-xl hover:bg-black hover:text-[#FFD700] transition-all"
        >
          View Details
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-1.5 pb-4">
        {spotlightProducts.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-6 bg-black' : 'w-2 bg-gray-200'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default SpotlightBox;
