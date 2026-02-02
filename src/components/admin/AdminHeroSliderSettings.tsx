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
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, url: '', title: 'Premium Gadgets' },
    { id: 2, url: '', title: 'New Collection' },
    { id: 3, url: '', title: 'Audio Series' }
  ]);

  const [gallery, setGallery] = useState<string[]>([]);

  // Fetch gallery images from Supabase bucket
  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase.storage
        .from('hero-slides') // your bucket name
        .list('', { limit: 100, offset: 0 });

      if (error) {
        console.error('Error fetching gallery:', error);
        return;
      }

      const urls = data
        .filter(file => file.type === 'file')
        .map(file => supabase.storage.from('hero-slides').getPublicUrl(file.name).data.publicUrl);

      setGallery(urls);
    };

    fetchGallery();
  }, []);

  const updateSlide = (index: number, key: 'url' | 'title', value: string) => {
    const newSlides = [...slides];
    newSlides[index][key] = value;
    setSlides(newSlides);
  };

  const saveHeroSlider = () => {
    alert('Hero Slider settings saved!');
    console.log({ isActive, slides });
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
          <h3 className="font-bold">Slide {index + 1}</h3>

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

          {/* Image Selection */}
          <div className="space-y-2">
            <label className="font-bold">Image</label>

            {/* Upload New Image */}
            <ImageUploader
              label="Upload New Image"
              onUploadSuccess={(url) => {
                updateSlide(index, 'url', url);
                setGallery(prev => [url, ...prev]); // add new image to gallery
              }}
            />

            {/* Gallery Selection */}
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {gallery.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`Gallery ${i}`}
                  className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${
                    slide.url === imgUrl ? 'border-black' : 'border-gray-300'
                  }`}
                  onClick={() => updateSlide(index, 'url', imgUrl)}
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

      {/* Save Button */}
      <button
        onClick={saveHeroSlider}
        className="bg-black text-white px-6 py-2 font-black uppercase"
      >
        Save Hero Slider
      </button>
    </div>
  );
};
