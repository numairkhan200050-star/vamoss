import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../ImageUploader';
import { supabase } from '../../lib/supabase';

interface Slide {
  id?: number;
  url: string;
  title: string;
  order?: number;
}

export const AdminHeroSliderSettings = () => {
  const [isActive, setIsActive] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);

  // Fetch slider status and slides
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: settingData } = await supabase
          .from('hero_slider_settings')
          .select('*')
          .eq('id', 1)
          .single();
        if (settingData) setIsActive(settingData.is_active);

        const { data: slidesData } = await supabase
          .from('hero_slider_slides')
          .select('*')
          .order('order', { ascending: true });

        if (slidesData) setSlides(slidesData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Fetch gallery from private bucket
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await supabase.storage.from('hero-slider').list('', { limit: 100 });
        const urls: string[] = [];
        for (const file of data) {
          const { data: signedData } = await supabase.storage
            .from('hero-slider')
            .createSignedUrl(file.name, 60 * 60);
          if (signedData?.signedUrl) urls.push(signedData.signedUrl);
        }
        setGallery(urls);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery();
  }, []);

  const addSlide = () => setSlides(prev => [...prev, { url: '', title: '', order: prev.length }]);
  const removeSlide = (index: number) => setSlides(prev => prev.filter((_, i) => i !== index));
  const updateSlide = (index: number, key: 'url' | 'title', value: string) =>
    setSlides(prev => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));

  const removeImage = (index: number) => updateSlide(index, 'url', ''); // Remove image locally

  const saveHeroSlider = async () => {
    try {
      // Update slider status
      await supabase.from('hero_slider_settings').upsert({ id: 1, is_active: isActive }, { onConflict: ['id'] });

      // Delete old slides
      await supabase.from('hero_slider_slides').delete();

      // Insert new slides
      await supabase.from('hero_slider_slides').insert(
        slides.map((s, idx) => ({ url: s.url, title: s.title, order: idx }))
      );

      alert('Hero Slider saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving Hero Slider. Check console.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black mb-4">Hero Slider Settings</h2>

      {/* Enable/Disable */}
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
        <label className="font-bold">Enable Hero Slider</label>
      </div>

      {/* Slides */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div key={index} className="border p-4 rounded-md space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Slide {index + 1}</h3>
              <button onClick={() => removeSlide(index)} className="text-red-500 font-bold">Remove Slide</button>
            </div>

            {/* Title */}
            <div>
              <label className="font-bold">Title</label>
              <input
                className="w-full border p-2"
                value={slide.title}
                onChange={e => updateSlide(index, 'title', e.target.value)}
                placeholder="Enter slide title"
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="font-bold">Image</label>
              <ImageUploader label="Upload New Image" onUploadSuccess={url => updateSlide(index, 'url', url)} />

              {/* Gallery */}
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {gallery.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Gallery ${i}`}
                    className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${slide.url === url ? 'border-black' : 'border-gray-300'}`}
                    onClick={() => updateSlide(index, 'url', url)}
                  />
                ))}
              </div>

              {/* Preview + Remove Button */}
              {slide.url && (
                <div className="relative w-full h-40 mt-2">
                  <img src={slide.url} alt={`Slide ${index + 1}`} className="w-full h-full object-cover border rounded" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    title="Remove Image"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={addSlide} className="bg-gray-100 text-black px-6 py-2 font-black uppercase">+ Add New Slide</button>
      <button onClick={saveHeroSlider} className="bg-black text-white px-6 py-2 font-black uppercase">Save Hero Slider</button>
    </div>
  );
};
