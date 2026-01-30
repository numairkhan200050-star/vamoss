import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Added icons
import ProductCard from './ProductCard';

interface ProductRowProps {
  heading: string;
  products: any[];
  viewAllLink?: string; // New Prop for functionality
}

const ProductRow: React.FC<ProductRowProps> = ({ heading, products, viewAllLink = "#" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Safety check: Don't render the row if there are no products
  if (!products || products.length === 0) return null;

  // Manual scroll function for Desktop Arrows
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className=\"w-full py-10 bg-white group/row\">
      <div className=\"max-w-[1440px] mx-auto px-6\">
        
        {/* Heading Section */}
        <div className=\"flex items-end justify-between mb-8\">
          <div className=\"space-y-1\">
            <div className=\"h-1.5 w-12 bg-[#FFD700] mb-2\" />
            <h2 className=\"text-3xl font-black uppercase italic tracking-tighter text-black\">
              {heading}
            </h2>
          </div>
          
          <div className=\"flex items-center gap-4\">
            {/* Desktop Navigation Arrows (Hidden on Mobile) */}
            <div className=\"hidden md:flex gap-2 mr-4\">
              <button 
                onClick={() => scroll('left')}
                className=\"p-2 border-2 border-black hover:bg-black hover:text-white transition-all\"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className=\"p-2 border-2 border-black hover:bg-black hover:text-white transition-all\"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <a 
              href={viewAllLink}
              className=\"text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black border-b-2 border-transparent hover:border-[#FFD700] pb-1 transition-all\"
            >
              Explore All
            </a>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        
        <div 
          ref={scrollRef}
          className=\"flex overflow-x-auto gap-5 pb-6 no-scrollbar scroll-smooth snap-x snap-mandatory\"
        >
          {products.map((item) => (
            <div key={item.id} className=\"snap-start\">
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
