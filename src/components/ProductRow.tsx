import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductRowProps {
  title: string;
}

export const ProductRow = ({ title }: ProductRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="my-12">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-[#D4AF37] pb-1">
          {title}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll('right')} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
      >
        {/* We will replace these with real products from your DB later */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="min-w-[200px] md:min-w-[280px] border-2 border-black bg-white p-4">
            <div className="h-40 bg-gray-100 mb-4 overflow-hidden border border-gray-200">
               <img src={`https://picsum.photos/seed/${i+20}/400/400`} alt="Product" className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-sm uppercase mb-1">Premium Product {i}</h4>
            <p className="font-black text-lg">Rs. 2,999</p>
            <button className="mt-4 w-full py-2 border-2 border-black font-black text-[10px] uppercase hover:bg-black hover:text-white transition-all">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
