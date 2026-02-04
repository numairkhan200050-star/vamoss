import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Import Supabase

const ReviewTicker = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_visible', true);
      if (data && data.length > 0) setReviews(data);
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div key={currentIndex} className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-[#2c3e50]">Customer Reviews</h2>
          <div className="flex items-center gap-1">
            {[...Array(reviews[currentIndex].rating)].map((_, i) => (
              <Star key={i} size={18} className="fill-[#FFD700] text-[#FFD700]" />
            ))}
          </div>
          <p className="text-sm md:text-base font-medium text-gray-600 max-w-2xl leading-relaxed italic">
            "{reviews[currentIndex].text}"
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-black">{reviews[currentIndex].name}</span>
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
