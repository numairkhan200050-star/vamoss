import React from 'react';
import ProductCard from './ProductCard';

interface ProductRowProps {
  heading: string;
  products: any[];
}

const ProductRow: React.FC<ProductRowProps> = ({ heading, products }) => {
  return (
    /* OBJECTIVE 4: FIX UNUSUAL GAPS
       - Changed 'py-8' to 'py-2' to pull rows closer together vertically.
       - Removed large margins to ensure upcoming future rows follow this tight spacing.
    */
    <section className="w-full py-2">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Heading Section - Reduced bottom margin from mb-6 to mb-3 */}
        <div className="flex items-end justify-between mb-3">
          <div className="space-y-1">
            <div className="h-1 w-10 bg-[#FFD700]" />
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-black">
              {heading}
            </h2>
          </div>
          
          <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all">
            Explore All
          </button>
        </div>

        {/* OBJECTIVE 1.2: UNIFIED CARD SIZE
           - The container uses 'gap-4' for consistent spacing between cards.
           - 'pb-4' provides just enough room for the scrollbar without adding a massive gap to the next row.
        */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory items-stretch">
          {products.map((item) => (
            <div key={item.id} className="snap-start">
              <ProductCard 
                name={item.title || item.name}
                price={item.price_now || item.price}
                originalPrice={item.price_was || item.originalPrice}
                /* OBJECTIVE 2: REMOVE SPOT IMAGE LOGIC
                   - We now strictly use 'main_image_url' (or item.image fallback).
                   - The fixed-box logic is now handled inside ProductCard.tsx.
                */
                image={item.main_image_url || item.image}
                isSale={Number(item.price_was) > Number(item.price_now) || item.isSale}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRow;
