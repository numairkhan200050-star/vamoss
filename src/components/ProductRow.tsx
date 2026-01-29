import React from 'react';
import ProductCard from './ProductCard';

interface ProductRowProps {
  heading: string;
  products: any[];
}

const ProductRow: React.FC<ProductRowProps> = ({ heading, products }) => {
  return (
    <section className="w-full py-12">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Heading Section */}
        <div className="flex items-end justify-between mb-8">
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

        {/* Horizontal Scroll Container */}
        {/* 'no-scrollbar' ensures it looks clean on Desktop, while 'overflow-x-auto' keeps it swipable on Mobile */}
        <div className="flex overflow-x-auto gap-6 pb-10 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {products.map((item) => (
            <div key={item.id} className="snap-start">
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
