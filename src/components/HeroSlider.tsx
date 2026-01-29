import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  // Rule No. 3: These images are 'selected' from your master library in the Admin Portal
  const [slides, setSlides] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop', title: 'Premium Gadgets' },
    { id: 2, url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1981&auto=format&fit=crop', title: 'New Collection' },
    { id: 3, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', title: 'Audio Series' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section className="w-full px-6 py-4">
      {/* The Container with Modern Rounded Corners */}
      <div className="max-w-[1440px] mx-auto h-[400px] md:h-[600px] w-full m-auto relative group overflow-hidden rounded-[30px] shadow-2xl border-4 border-black">
        
        {/* The Image Wrapper */}
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full bg-center bg-cover duration-700 ease-in-out transform scale-105"
        >
          {/* Dark Overlay for Luxury Feel */}
          <div className="w-full h-full bg-black/20" />
        </div>

        {/* Left Arrow - Modern Style */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl p-2 bg-black/50 text-white cursor-pointer rounded-full hover:bg-black transition-all">
          <ChevronLeft onClick={prevSlide} size={30} />
        </div>

        {/* Right Arrow - Modern Style */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl p-2 bg-black/50 text-white cursor-pointer rounded-full hover:bg-black transition-all">
          <ChevronRight onClick={nextSlide} size={30} />
        </div>

        {/* Modern Navigation Dots (Gold when active) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`cursor-pointer transition-all duration-300 rounded-full 
                ${currentIndex === slideIndex 
                  ? 'bg-[#FFD700] w-8 h-2' // Active: Gold Bar
                  : 'bg-white/50 w-2 h-2 hover:bg-white' // Inactive: Dot
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
