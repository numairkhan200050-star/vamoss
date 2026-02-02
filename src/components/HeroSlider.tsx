import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Slide {
  id: number;
  url: string;
  title?: string;
}

const HeroSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      // Check if slider is enabled
      const { data: settingData } = await supabase
        .from('hero_slider_settings')
        .select('is_active')
        .eq('id', 1)
        .single();

      if (!settingData?.is_active) return setSlides([]); // Disabled

      // Fetch slides
      const { data: slidesData } = await supabase
        .from('hero_slider_slides')
        .select('*')
        .order('order', { ascending: true });

      if (slidesData) setSlides(slidesData);
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [slides, currentIndex]);

  const prevSlide = () => setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  const nextSlide = () => setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);

  if (slides.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1360px] mx-auto px-4 py-4">
        <div className="relative h-[180px] sm:h-[240px] md:h-[280px] w-full overflow-hidden rounded-xl border border-gray-100 group shadow-sm">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-full h-full bg-center bg-cover transition-all duration-1000 ease-in-out"
          >
            <div className="w-full h-full bg-black/5" />
          </div>

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

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${currentIndex === i ? 'bg-red-600 w-8' : 'bg-gray-300 w-2'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
