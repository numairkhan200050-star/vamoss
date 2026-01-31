import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const ReviewTicker = () => {
  // Logic remains identical - Fetched from Supabase/State
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ahmed K.", text: "The 5-in-1 trimmer is absolute quality. Best purchase this year!", rating: 5 },
    { id: 2, name: "Sara Khan", text: "Fast delivery to Lahore! The packaging was very premium.", rating: 5 },
    { id: 3, name: "Ammar", text: "I bought the T9 trimmer, the quality is really good. Recommended seller", rating: 5 }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdminEnabled, setIsAdminEnabled] = useState(true); 

  useEffect(() => {
    if (!isAdminEnabled || reviews.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000); 

    return () => clearInterval(timer);
  }, [reviews.length, isAdminEnabled]);

  if (!isAdminEnabled || reviews.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Main Content Wrapper - Centered like your image */}
        <div 
          key={currentIndex} 
          className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
        >
          
          {/* 1. Header: Customer Reviews */}
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-[#2c3e50]">
            Customer Reviews
          </h2>

          {/* 2. Yellow Stars - Only Yellow Element */}
          <div className="flex items-center gap-1">
            {[...Array(reviews[currentIndex].rating)].map((_, i) => (
              <Star key={i} size={18} className="fill-[#FFD700] text-[#FFD700]" />
            ))}
          </div>

          {/* 3. Review Text - Minimal & Clean like image */}
          <p className="text-sm md:text-base font-medium text-gray-600 max-w-2xl leading-relaxed italic">
            "{reviews[currentIndex].text}"
          </p>

          {/* 4. Reviewer Name - Bold & Centered */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-black">
              {reviews[currentIndex].name}
            </span>
            {/* Verified Badge */}
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Verified Buyer</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReviewTicker;
