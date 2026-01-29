import React from 'react';
import ProductCard from './ProductCard';

interface ProductRowProps {
  heading: string;
  products: any[];
}

const ProductRow: React.FC<ProductRowProps> = ({ heading, products }) => {
  return (
    /* 1. Changed py-12 to py-0 to remove massive vertical spacing
       2. Added -mb-24 (negative margin) to pull the next row up
    */
    <section className="w-full py-0 -mb-24 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Heading Section: Reduced mb-8 to mb-2 */}
        <div className="flex items-end justify-between mb-2">
          <div className="space-y-1">
            <div className="h-1.5 w-12 bg-[#FFD700]" />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black">
              {heading}
            </h2>
          </div>
          
          <button className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all">
            Explore All
            <span className="w-8 h-[2px] bg-gray-200 group-hover:bg-[#FFD700] group-hover:w-12 transition-all" />
          </button>
        </div>

        {/* Horizontal Scroll Container:
            - Changed gap-6 to gap-0 because scale-[0.7] creates its own internal gap.
            - Added -ml-12 to shift the whole row left to align the first card with the heading.
        */}
        <div className="flex overflow-x-auto gap-0 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory -ml-12">
          {products.map((item) => (
            /* We set a very narrow min-width (230px) to force the scaled cards to sit side-by-side */
            <div key={item.id} className="snap-start min-w-[230px] flex justify-center">
              <ProductCard 
                name={item.name}
                price={item.price}
                originalPrice={item.originalPrice}
                image={item.image}
                isSale={item.isSale}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRow;
