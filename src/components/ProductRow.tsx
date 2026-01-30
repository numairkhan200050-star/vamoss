import React from 'react';
import ProductCard from './ProductCard';

interface ProductRowProps {
  heading: string;
  products: any[];
}

const ProductRow: React.FC<ProductRowProps> = ({ heading, products }) => {
  // Style for Heading (Bold)
  const comicSansBold = { 
    fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', 
    fontWeight: 'bold' 
  };

  // Style for Button (Regular)
  const comicSansRegular = { 
    fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', 
    fontWeight: 'normal' 
  };

  return (
    /* py-2 keeps the rows tight vertically */
    <section className="w-full py-2">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Heading Section */}
        <div className="flex items-end justify-between mb-3">
          <div className="space-y-1">
            {/* Signature Yellow Bar */}
            <div className="h-1 w-10 bg-[#FFD700]" />
            
            {/* Heading: Now Comic Sans Bold */}
            <h2 
              style={comicSansBold}
              className="text-2xl md:text-3xl uppercase italic tracking-tighter text-black"
            >
              {heading}
            </h2>
          </div>
          
          {/* Explore All: Now Comic Sans Regular */}
          <button 
            style={comicSansRegular}
            className="text-[11px] uppercase tracking-widest text-gray-600 hover:text-black transition-all"
          >
            Explore All
          </button>
        </div>

        {/* Scroll Container: Integrated with ProductCard logic */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory items-stretch">
          {products.map((item) => (
            <div key={item.id} className="snap-start pt-1 pl-1">
              <ProductCard 
                name={item.title || item.name}
                price={item.price_now || item.price}
                originalPrice={item.price_was || item.originalPrice}
                /* Logic: Prioritizes main_image and calculates Sale badge visibility */
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
