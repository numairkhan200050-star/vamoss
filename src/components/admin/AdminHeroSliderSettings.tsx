import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../ImageUploader';
import { supabase } from '../../lib/supabase';

interface Slide {
  url: string;
  title: string;
}

export const AdminHeroSliderSettings = () => {
  const [isActive, setIsActive] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: setting } = await supabase
        .from('hero_slider_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (setting) setIsActive(setting.is_active);

      const { data: slidesData } = await supabase
        .from('hero_slider_slides')
        .select('*')
        .order('order');

      if (slidesData) setSlides(slidesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase.storage.from('hero-slider').list('');
      if (!data) return;

      const urls = await Promise.all(
        data.map(async file => {
          const { data } = await supabase.storage
            .from('hero-slider')
            .createSignedUrl(file.name, 3600);
          return data?.signedUrl || '';
        })
      );

      setGallery(urls.filter(Boolean));
    };
    fetchGallery();
  }, []);

  const saveHeroSlider = async () => {
    try {
      await supabase
        .from('hero_slider_settings')
        .upsert({ id: 1, is_active: isActive });

      // 🔥 HARD DELETE (FIX)
      await supabase
        .from('hero_slider_slides')
        .delete()
        .neq('id', 0);

      const validSlides = slides
        .filter(s => s.url)
        .map((s, i) => ({
          url: s.url,
          title: s.title,
          order: i
        }));

      if (validSlides.length) {
        await supabase.from('hero_slider_slides').insert(validSlides);
      }

      alert('Hero Slider saved');
    } catch (e) {
      console.error(e);
      alert('Save failed');
    }
  };

  return (
    <div className="space-y-6">
      <label className="flex gap-2 font-bold">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
        Enable Hero Slider
      </label>

      {slides.map((slide, i) => (
        <div key={i} className="border p-4 space-y-2">
          <input
            className="border p-2 w-full"
            value={slide.title}
            onChange={e =>
              setSlides(s =>
                s.map((sl, idx) => (idx === i ? { ...sl, title: e.target.value } : sl))
              )
            }
          />

          <ImageUploader
            label="Upload"
            onUploadSuccess={url =>
              setSlides(s =>
                s.map((sl, idx) => (idx === i ? { ...sl, url } : sl))
              )
            }
          />

          {slide.url && (
            <div className="relative">
              <img src={slide.url} className="h-40 w-full object-cover" />
              <button
                onClick={() =>
                  setSlides(s =>
                    s.map((sl, idx) => (idx === i ? { ...sl, url: '' } : sl))
                  )
                }
                className="absolute top-1 right-1 bg-red-600 text-white px-2 text-xs rounded"
              >
                Delete Image
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => setSlides(s => [...s, { url: '', title: '' }])}
        className="bg-gray-200 px-4 py-2"
      >
        + Add Slide
      </button>

      <button
        onClick={saveHeroSlider}
        className="bg-black text-white px-6 py-2"
      >
        Save Hero Slider
      </button>
    </div>
  );
};
