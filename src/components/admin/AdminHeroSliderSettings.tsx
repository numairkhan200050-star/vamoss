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

  // Fetch existing slides from Supabase table
  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from('hero_slider_settings')
        .select('*')
        .order('order', { ascending: true });

      if (error) return console.error('Error fetching slides:', error);

      if (data && data.length > 0) {
        setIsActive(data[0].is_active);
        setSlides(data.map(s => ({ id: s.id, url: s.url, title: s.title, order: s.order })));
      }
    };

    fetchSlides();
  }, []);

  // Fetch gallery from private bucket
  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase.storage
        .from('hero-slider')
        .list('', { limit: 100 });

      if (error) return console.error('Error fetching gallery:', error);

      const urls: string[] = [];
      for (const file of data) {
        const { data: signedData, error: signedError } = await supabase.storage
          .from('hero-slider')
          .createSignedUrl(file.name, 60 * 60); // 1 hour
        if (!signedError && signedData?.signedUrl) urls.push(signedData.signedUrl);
      }
      setGallery(urls);
    };

    fetchGallery();
  }, []);

  const addSlide = () => setSlides(prev => [...prev, { url: '', title: '', order: prev.length }]);
  const removeSlide = (index: number) => setSlides(prev => prev.filter((_, i) => i !== index));
  const updateSlide = (index: number, key: 'url' | 'title', value: string) => {
    setSlides(prev => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  };

  const saveHeroSlider = async () => {
    try {
      // Delete old slides
      await supabase.from('hero_slider_settings').delete().neq('id', 0);

      // Insert new slides
      const { error } = await supabase
        .from('hero_slider_settings')
        .insert(
          slides.map((s, idx) => ({
            url: s.url,
            title: s.title,
            order: idx,
            is_active: isActive
          }))
        );

      if (error) throw error;
      alert('Hero Slider saved successfully!');
    } catch (err) {
      console.error('Save error:', err);
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
              <button onClick={() => removeSlide(index)} className="text-red-500 font-bold">
                Remove
              </button>
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

              <ImageUploader
                label="Upload New Image"
                onUploadSuccess={url => updateSlide(index, 'url', url)}
              />

              <div className="flex gap-2 mt-2 overflow-x-auto">
                {gallery.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Gallery ${i}`}
                    className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${
                      slide.url === url ? 'border-black' : 'border-gray-300'
                    }`}
                    onClick={() => updateSlide(index, 'url', url)}
                  />
                ))}
              </div>

              {slide.url && (
                <img
                  src={slide.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-40 object-cover mt-2 border rounded"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={addSlide} className="bg-gray-100 text-black px-6 py-2 font-black uppercase">
        + Add New Slide
      </button>

      <button onClick={saveHeroSlider} className="bg-black text-white px-6 py-2 font-black uppercase">
        Save Hero Slider
      </button>
    </div>
  );
};
