import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const ReviewTicker = () => {
  // These would be fetched from your Supabase 'reviews' table
  // filtered by 'is_featured === true'
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ahmed K.", text: "The 5-in-1 trimmer is absolute quality. Best purchase this year!", rating: 5 },
    { id: 2, name: "Sara Khan", text: "Fast delivery to Lahore! The packaging was very premium.", rating: 5 },
    { id: 3, name: "Zubair", text: "Kevin11 never disappoints. Highly recommend the grooming kit.", rating: 5 }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdminEnabled, setIsAdminEnabled] = useState(true); // Master toggle from Admin

  useEffect(() => {
    if (!isAdminEnabled || reviews.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000); // Changes review every 4 seconds

    return () => clearInterval(timer);
  }, [reviews.length, isAdminEnabled]);

  // If Admin turned it off OR there are no reviews, show nothing
  if (!isAdminEnabled || reviews.length === 0) return null;

  return (
    <section className="w-full bg-[#FFD700] py-3 border-y-2 border-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative flex items-center justify-center">
        
        {/* The Animated Review Container */}
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
          <Quote size={18} className="text-black fill-black opacity-20" />
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            {/* Stars */}
            <div className="flex gap-0.5">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-black text-black" />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-sm font-black italic uppercase tracking-tight text-black text-center">
              "{reviews[currentIndex].text}"
            </p>

            {/* Reviewer Name */}
            <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-full uppercase tracking-widest">
              {reviews[currentIndex].name}
            </span>
          </div>

          <Quote size={18} className="text-black fill-black opacity-20 rotate-180" />
        </div>
      </div>
    </section>
  );
};

export default ReviewTicker;
