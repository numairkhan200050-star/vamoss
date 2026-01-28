import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2070",
    title: "New Arrivals",
    subtitle: "Premium Gadgets Collection"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=2070",
    title: "Flash Sale",
    subtitle: "Up to 40% Off on Eyewear"
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Automated Slide Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === banners.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? banners.length - 1 : current - 1);

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden border-b-4 border-black group">
      {banners.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-12 text-white">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-tight drop-shadow-md">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl font-bold uppercase tracking-widest text-[#D4AF37]">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Manual Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 border-2 border-black hover:bg-black hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 border-2 border-black hover:bg-black hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 w-8 border border-black ${i === current ? 'bg-[#D4AF37]' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};
