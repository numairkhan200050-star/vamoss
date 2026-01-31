import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const ReviewTicker = () => {
  // Logic remains identical - Fetched from Supabase/State
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ahmed K.", text: "The 5-in-1 trimmer is absolute quality. Best purchase this year!", rating: 5 },
    { id: 2, name: "Sara Khan", text: "Fast delivery to Lahore! The packaging was very premium.", rating: 5 },
    { id: 3, name: "Zubair", text: "Kevin11 never disappoints. Highly recommend the grooming kit.", rating: 5 }
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
    <section className="w-full bg-white py-4 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-center">
        
        {/* Modern Floating Container */}
        <div 
          key={currentIndex} // Key ensures the animation triggers on every slide change
          className="flex flex-col md:flex-row items-center gap-4 md:gap-8 animate-in fade-in slide-in-from-right-4 duration-700 ease-out"
        >
          
          {/* 1. Yellow Stars Only Section */}
          <div className="flex items-center gap-1 bg-black/[0.03] px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
            {[...Array(reviews[currentIndex].rating)].map((_, i) => (
              <Star key={i} size={14} className="fill-[#FFD700] text-[#FFD700]" />
            ))}
            <span className="ml-1.5 text-[10px] font-black text-black/40">5.0</span>
          </div>

          {/* 2. Review Text Section */}
          <div className="flex items-center gap-3">
            <Quote size={16} className="text-black/10 fill-black/10 shrink-0 self-start mt-1" />
            <p className="text-[13px] md:text-sm font-bold uppercase tracking-tight text-black text-center md:text-left max-w-2xl leading-relaxed">
              {reviews[currentIndex].text}
            </p>
          </div>

          {/* 3. Modern Reviewer Badge */}
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-black/20 hidden md:block" />
            <span className="text-[10px] font-black text-black border-2 border-black px-3 py-1 rounded-full uppercase tracking-[0.15em] whitespace-nowrap bg-white shadow-sm">
              {reviews[currentIndex].name}
            </span>
            <div className="flex items-center gap-1 ml-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Verified</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReviewTicker;
