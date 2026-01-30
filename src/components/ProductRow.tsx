import React from 'react';
import ProductCard from './ProductCard';

interface ProductRowProps {
  heading: string;
  products: any[];
}

const ProductRow: React.FC<ProductRowProps> = ({ heading, products }) => {
  return (
    /* KEPT: Tight vertical spacing (py-2) from your existing code */
    <section className="w-full py-2">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Heading Section - Restored Old Font Style */}
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

        {/* Scroll Container - Kept existing gap and logic */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory items-stretch">
          {products.map((item) => (
            <div key={item.id} className="snap-start pt-1 pl-1">
              <ProductCard 
                name={item.title || item.name}
                price={item.price_now || item.price}
                originalPrice={item.price_was || item.originalPrice}
                /* KEPT: logic for main_image and sale calculation */
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
