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
      {/* Container: Max-width like Naheed, removed heavy black border, softened corners */}
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        <div className="relative h-[350px] md:h-[480px] w-full overflow-hidden rounded-xl shadow-sm border border-gray-100 group">
          
          {/* The Image */}
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-full h-full bg-center bg-cover duration-700 ease-out transition-all"
          >
            <div className="w-full h-full bg-black/10" />
          </div>

          {/* Minimalist Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} className="text-black" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} className="text-black" />
          </button>

          {/* Minimalist Bottom Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 transition-all rounded-full ${currentIndex === i ? 'bg-red-600 w-6' : 'bg-white/60 w-1.5'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
