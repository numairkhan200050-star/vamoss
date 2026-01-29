import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [slides] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999', title: 'Premium Gadgets' },
    { id: 2, url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1981', title: 'New Collection' },
    { id: 3, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070', title: 'Audio Series' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { nextSlide(); }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className="w-full bg-white">
      {/* Container Logic:
        1. max-w-[1360px]: Your exact width requirement.
        2. h-[280px]: Your exact height requirement.
        3. Removed 'border-4 black' and used a subtle 'border-gray-100'.
      */}
      <div className="max-w-[1360px] mx-auto px-4 py-4">
        <div className="relative h-[180px] sm:h-[240px] md:h-[280px] w-full overflow-hidden rounded-xl border border-gray-100 group shadow-sm">
          
          {/* Slide Wrapper */}
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-full h-full bg-center bg-cover transition-all duration-1000 ease-in-out"
          >
            {/* Subtle overlay to make text/controls pop */}
            <div className="w-full h-full bg-black/5" />
          </div>

          {/* Minimalist Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-md hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft size={20} className="text-black" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-md hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight size={20} className="text-black" />
          </button>

          {/* Progress Indicators (Thin bars like modern retail sites) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  currentIndex === i ? 'bg-red-600 w-8' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
