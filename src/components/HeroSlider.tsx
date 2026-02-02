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

  // Fetch images from private bucket with signed URLs
  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase.storage
        .from('hero-slider')
        .list('', { limit: 100 });

      if (error) {
        console.error('Error fetching hero slider:', error);
        return;
      }

      const slideUrls: Slide[] = [];

      for (const file of data) {
        const { data: signedData, error: signedError } = await supabase.storage
          .from('hero-slider')
          .createSignedUrl(file.name, 60 * 60); // 1 hour expiry

        if (signedError) {
          console.error('Signed URL error:', signedError);
        } else if (signedData?.signedUrl) {
          slideUrls.push({ id: Date.now() + Math.random(), url: signedData.signedUrl });
        }
      }

      setSlides(slideUrls);
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

  if (slides.length === 0) return null; // or loader

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
