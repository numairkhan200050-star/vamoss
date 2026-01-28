import React from 'react';
import { Star } from 'lucide-react';

interface Props {
  rating: number; // 0 to 5
  count?: number; // Number of reviews
}

export const RatingStars = ({ rating, count }: Props) => {
  // If no rating or 0, return nothing (as per your request)
  if (!rating || rating === 0) return null;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            fill={i < Math.floor(rating) ? "#D4AF37" : "none"} 
            className={i < Math.floor(rating) ? "text-[#D4AF37]" : "text-gray-300"}
          />
        ))}
      </div>
      {count && <span className="text-[10px] font-bold text-gray-400">({count})</span>}
    </div>
  );
};
