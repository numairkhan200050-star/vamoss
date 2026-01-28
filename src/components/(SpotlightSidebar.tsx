import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  collectionSlug: string;
}

export const SpotlightSidebar = ({ collectionSlug }: SidebarProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('collection_slug', collectionSlug);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, [collectionSlug]);

  // Rotation Logic
  useEffect(() => {
    if (products.length < 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [products]);

  if (products.length === 0) return null;

  const current = products[index];

  return (
    <div className="w-full border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group cursor-pointer sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-black text-[#FFD700] text-[10px] font-black px-2 py-1 uppercase italic">
          Admin Choice
        </span>
        <span className="text-[10px] font-bold text-gray-400 uppercase">
          {index + 1} / {products.length}
        </span>
      </div>
      
      <div className="relative overflow-hidden h-56 mb-4 border-2 border-gray-100">
        <img 
          src={current.main_image} 
          className="w-full h-full object-cover transition-opacity duration-500" 
          alt={current.title}
        />
      </div>

      <h3 className="font-black uppercase italic text-sm mb-1 truncate">{current.title}</h3>
      <div className="flex justify-between items-center">
        <p className="text-xl font-black text-black">Rs. {current.selling_price}</p>
        <button className="bg-[#FFD700] p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
          <span className="text-[10px] font-black uppercase">View</span>
        </button>
      </div>
    </div>
  );
};
