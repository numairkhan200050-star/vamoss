import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const TopBanner = () => {
  const [bannerData, setBannerData] = useState({
    imageUrl: '',
    link: '/',
    altText: '',
    isActive: false
  });
  const [isVisible, setIsVisible] = useState(true);

  // Fetch top banner from Supabase
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data, error } = await supabase
          .from('top_banner_settings')
          .select('*')
          .limit(1)
          .single();
        if (error) return console.error('Fetch top banner error:', error);
        if (data) {
          setBannerData({
            imageUrl: data.image_url,
            link: data.link,
            altText: data.alt_text,
            isActive: data.is_active
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanner();
  }, []);

  if (!isVisible || !bannerData.isActive || !bannerData.imageUrl) return null;

  return (
    <div className="relative w-full bg-black border-b border-gray-800 group">
      <a href={bannerData.link} className="block w-full h-full overflow-hidden">
        <img
          src={bannerData.imageUrl}
          alt={bannerData.altText}
          className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
        />
      </a>
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
