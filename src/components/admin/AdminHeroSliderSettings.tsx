import React, { useState } from 'react';

interface Slide {
  id: number;
  url: string;
  title: string;
}

export const AdminHeroSliderSettings = () => {
  const [isActive, setIsActive] = useState(true); // Enable / disable slider
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, url: '', title: 'Premium Gadgets' },
    { id: 2, url: '', title: 'New Collection' },
    { id: 3, url: '', title: 'Audio Series' }
  ]);

  // Update a slide
  const updateSlide = (index: number, key: 'url' | 'title', value: string) => {
    const newSlides = [...slides];
    newSlides[index][key] = value;
    setSlides(newSlides);
  };

  const saveHeroSlider = () => {
    alert('Hero Slider settings saved!');
    console.log({ isActive, slides });
    // Later: connect to Supabase to save settings
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
          <div>
            <label className="font-bold">Image URL</label>
            <input 
              className="w-full border p-2"
              value={slide.url}
              onChange={e => updateSlide(index, 'url', e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label className="font-bold">Title</label>
            <input 
              className="w-full border p-2"
              value={slide.title}
              onChange={e => updateSlide(index, 'title', e.target.value)}
              placeholder="Enter slide title"
            />
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
