import React, { useState } from 'react';
import { X } from 'lucide-react';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Note: 'bannerImage' and 'link' will be controlled by Admin Portal (Rule No. 1)
  // For now, we use a placeholder image.
  const bannerData = {
    imageUrl: "https://via.placeholder.com/1920x60?text=ADVERTISING+BANNER+IMAGE+HERE", 
    link: "/collections/new-arrivals",
    altText: "Special Promotion"
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-black border-b border-gray-800 group">
      {/* Clickable Banner Image */}
      <a 
        href={bannerData.link} 
        className="block w-full h-full overflow-hidden"
      >
        <img 
          src={bannerData.imageUrl} 
          alt={bannerData.altText}
          className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
        />
      </a>

      {/* Close Button - Visible to customers */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-white hover:text-black transition-all border border-transparent hover:border-black"
        aria-label="Close banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default TopBanner;
