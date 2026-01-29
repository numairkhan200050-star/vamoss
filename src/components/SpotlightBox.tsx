import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Requires react-router-dom
import { TrendingUp } from 'lucide-react';

const SpotlightBox = () => {
  const location = useLocation();
  
  // Data would be fetched from your 'Spotlight' collection in the Admin Portal
  const [spotlightProducts, setSpotlightProducts] = useState([
    { id: 1, name: "ONE STEP Hair Dryer Brush", price: "1,600", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=600", label: "Best Seller" },
    { id: 2, name: "Pro Grooming Kit 5-in-1", price: "3,500", image: "https://images.unsplash.com/photo-1621605815841-aa3398c89a01?q=80&w=600", label: "Top Rated" }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (spotlightProducts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [spotlightProducts]);

  // Logic: Hide on Homepage (Assuming your home path is '/')
  if (location.pathname === '/' || spotlightProducts.length === 0) {
    return null;
  }

  const activeProduct = spotlightProducts[currentIndex];

  return (
    <div className="w-full max-w-[280px] bg-white border-2 border-black rounded-[30px] overflow-hidden luxury-shadow-sm sticky top-24">
      {/* Heading Section */}
      <div className="bg-black text-white py-3 px-4 flex items-center justify-between">
        <h2 className="text-[11px] font-black uppercase tracking-widest italic flex items-center gap-2">
          <TrendingUp size={14} className="text-[#FFD700]" />
          Popular Product
        </h2>
        <span className="text-[9px] font-bold text-[#FFD700] animate-pulse">
          {activeProduct.label}
        </span>
      </div>

      {/* Product Content */}
      <div className="p-4 space-y-4">
        {/* Animated Image Wrapper */}
        <div key={activeProduct.id} className="relative aspect-square rounded-[20px] overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-700">
          <img 
            src={activeProduct.image} 
            alt={activeProduct.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="text-center space-y-1 pb-2">
          <h3 className="text-sm font-black uppercase tracking-tight text-black line-clamp-2 leading-tight">
            {activeProduct.name}
          </h3>
          <p className="text-lg font-black text-black">
            Rs.{activeProduct.price}
          </p>
        </div>

        {/* Call to Action */}
        <button className="w-full py-3 bg-[#FFD700] text-black text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black rounded-xl hover:bg-black hover:text-[#FFD700] transition-all">
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
