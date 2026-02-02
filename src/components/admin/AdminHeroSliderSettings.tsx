import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../ImageUploader';
import { supabase } from '../lib/supabase';

interface Slide {
  id: number;
  url: string;
  title: string;
}

export const AdminHeroSliderSettings = () => {
  const [isActive, setIsActive] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);

  // Fetch gallery from Supabase bucket
  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase.storage
        .from('hero-slides') // your bucket
        .list('', { limit: 100 });

      if (error) return console.error(error);

      const urls = data
        .filter(f => f.type === 'file')
        .map(f => supabase.storage.from('hero-slides').getPublicUrl(f.name).data.publicUrl);

      setGallery(urls);
    };

    fetchGallery();
  }, []);

  // Add a new empty slide
  const addSlide = () => {
    setSlides([...slides, { id: Date.now(), url: '', title: '' }]);
  };

  // Remove slide
  const removeSlide = (id: number) => {
    setSlides(slides.filter(s => s.id !== id));
  };

  // Update slide
  const updateSlide = (id: number, key: 'url' | 'title', value: string) => {
    const newSlides = slides.map(s => (s.id === id ? { ...s, [key]: value } : s));
    setSlides(newSlides);
  };

  const saveHeroSlider = () => {
    console.log({ isActive, slides });
    alert('Hero Slider saved!');
    // Later: save slides array to Supabase table
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black mb-4">Hero Slider Settings</h2>

      {/* Enable / Disable */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={e => setIsActive(e.target.checked)}
        />
        <label className="font-bold">Enable Hero Slider</label>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div key={slide.id} className="border p-4 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Slide {index + 1}</h3>
            <button
              onClick={() => removeSlide(slide.id)}
              className="text-red-600 font-bold"
            >
              Remove
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="font-bold">Title</label>
            <input
              className="w-full border p-2"
              value={slide.title}
              onChange={e => updateSlide(slide.id, 'title', e.target.value)}
              placeholder="Enter slide title"
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="font-bold">Image</label>

            {/* Upload new */}
            <ImageUploader
              label="Upload New Image"
              onUploadSuccess={url => {
                updateSlide(slide.id, 'url', url);
                setGallery(prev => [url, ...prev]); // add to gallery
              }}
            />

            {/* Gallery */}
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {gallery.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Gallery ${i}`}
                  className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${
                    slide.url === url ? 'border-black' : 'border-gray-300'
                  }`}
                  onClick={() => updateSlide(slide.id, 'url', url)}
                />
              ))}
            </div>

            {/* Preview */}
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

      <button
        onClick={addSlide}
        className="bg-gray-100 px-6 py-2 font-black uppercase"
      >
        Add New Slide
      </button>

      <button
        onClick={saveHeroSlider}
        className="bg-black text-white px-6 py-2 font-black uppercase"
      >
        Save Hero Slider
      </button>
    </div>
  );
};
