import React from 'react';
import ProductCard from './ProductCard';

interface ProductRowProps {
  heading: string;
  products: any[];
}

const ProductRow: React.FC<ProductRowProps> = ({ heading, products }) => {
  return (
    /* Standard padding. No negative margins needed now! */
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

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {products.map((item) => (
            <div key={item.id} className="snap-start">
              <ProductCard 
                name={item.name || item.title}
                price={item.price || item.price_now}
                originalPrice={item.originalPrice || item.price_was}
                image={item.image || item.main_image_url}
                isSale={item.isSale || (item.price_was > item.price_now)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRow;
