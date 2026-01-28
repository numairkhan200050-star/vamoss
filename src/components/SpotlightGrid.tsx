import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Assuming your supabase client is here

interface SpotlightProps {
  collectionSlug: string;
}

export const SpotlightGrid = ({ collectionSlug }: SpotlightProps) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchSpotlight = async () => {
      // Logic: Get 4 products from the collection linked in Admin
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('collection_slug', collectionSlug)
        .limit(4);
      
      if (data) setProducts(data);
    };
    fetchSpotlight();
  }, [collectionSlug]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="group relative aspect-square overflow-hidden border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
        >
          {/* Zooming Image */}
          <img 
            src={product.main_image} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Glass Label Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <div className="w-full">
              <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-tighter italic">Featured Item</p>
              <h3 className="text-white font-black uppercase text-xs truncate">{product.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
