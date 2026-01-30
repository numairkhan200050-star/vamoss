import React from 'react';
import ProductCard from './ProductCard';

interface ProductRowProps {
  heading: string;
  products: any[];
}

const ProductRow: React.FC<ProductRowProps> = ({ heading, products }) => {
  return (
    <section className="w-full py-8">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Heading Section */}
        <div className="flex items-end justify-between mb-6">
          <div className="space-y-1">
            <div className="h-1 w-10 bg-[#FFD700]" />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-black">
              {heading}
            </h2>
          </div>
          
          <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all">
            Explore All
          </button>
        </div>

        {/* FIX: Horizontal Scroll Container 
            - added 'items-stretch' to ensure all cards have equal height 
            - ensures no overlapping even if descriptions vary slightly
        */}
        <div className="flex overflow-x-auto gap-5 pb-6 no-scrollbar scroll-smooth snap-x snap-mandatory items-stretch">
          {products.map((item) => (
            <div key={item.id} className="snap-start">
              <ProductCard 
                name={item.title || item.name}
                price={item.price_now || item.price}
                originalPrice={item.price_was || item.originalPrice}
                /* LOGIC: We prioritize 'spot_image_url' for the grid.
                   If it doesn't exist, we fall back to the main image.
                */
                image={item.spot_image_url || item.main_image_url || item.image}
                isSale={item.price_was > item.price_now || item.isSale}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRow;
