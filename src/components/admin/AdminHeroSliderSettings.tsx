// src/components/admin/AdminHeroSliderSettings.tsx
import React, { useState } from 'react';
import { 
  Images, 
  Plus, 
  Trash2, 
  Save, 
  Type, 
  MoveUp, 
  MoveDown,
  Monitor
} from 'lucide-react';

// Using your existing ImageUploader laborer
import { ImageUploader } from '../ImageUploader';

interface Slide {
  url: string;
  title: string;
}

const AdminHeroSliderSettings = () => {
  // Signature Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  const [isActive, setIsActive] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([
    { title: 'Summer Collection', url: '' },
  ]);

  const addSlide = () => {
    setSlides([...slides, { title: '', url: '' }]);
  };

  const updateSlide = (index: number, key: keyof Slide, value: string) => {
    const updated = slides.map((s, i) => (i === index ? { ...s, [key]: value } : s));
    setSlides(updated);
  };

  const deleteSlide = (index: number) => {
    setSlides(slides.filter((_, i) => i !== index));
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
    setSlides(newSlides);
  };

  const saveSettings = () => {
    // NOTE 7: Supabase Logic (Hard Delete + Insert valid slides)
    console.log("Saving Hero Slider:", { isActive, slides });
    alert("Hero Slider Synchronized!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic text-black flex items-center gap-3">
            <Images className="text-[#FFD700]" /> HERO SLIDER SUPERVISOR
          </h2>
          <p style={comicSansRegular} className="text-gray-500">Manage the large rotating banners on your homepage.</p>
        </div>
        <button 
          onClick={saveSettings}
          className="flex items-center gap-2 bg-black text-[#FFD700] border-2 border-[#FFD700] px-8 py-3 hover:bg-[#FFD700] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={comicSansBold}
        >
          <Save size={20} /> DEPLOY SLIDER
        </button>
      </div>

      {/* MASTER TOGGLE */}
      <section className="bg-white border-4 border-black p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3">
          <Monitor size={20} />
          <span style={comicSansBold} className="uppercase text-sm">Slider Active on Home</span>
        </div>
        <input 
          type="checkbox" 
          checked={isActive} 
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-6 h-6 accent-black"
        />
      </section>

      {/* SLIDES LIST */}
      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div key={index} className="bg-white border-4 border-black flex flex-col md:flex-row overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Slide Preview / Upload */}
            <div className="w-full md:w-72 bg-gray-50 p-4 border-b-4 md:border-b-0 md:border-r-4 border-black">
               {slide.url ? (
                 <div className="relative group aspect-video md:aspect-square">
                   <img src={slide.url} className="w-full h-full object-cover border-2 border-black" alt="Slide" />
                   <button 
                    onClick={() => updateSlide(index, 'url', '')}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 border-2 border-black hover:bg-black transition-colors"
                   >
                     <Trash2 size={16} />
                   </button>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center py-4">
                   <ImageUploader onUploadSuccess={(url) => updateSlide(index, 'url', url)} />
                 </div>
               )}
            </div>

            {/* Slide Details */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <label style={comicSansBold} className="text-[10px] uppercase block mb-1">Slide Title (Internal)</label>
                  <div className="flex items-center gap-2 border-b-2 border-black pb-1">
                    <Type size={16} className="text-gray-400" />
                    <input 
                      value={slide.title}
                      onChange={(e) => updateSlide(index, 'title', e.target.value)}
                      placeholder="Summer Collection 2024"
                      className="w-full bg-transparent outline-none font-bold"
                    />
                  </div>
                </div>
                
                {/* Order Controls */}
                <div className="flex items-center gap-1 ml-4">
                  <button onClick={() => moveSlide(index, 'up')} className="p-1 hover:bg-gray-100 rounded border border-gray-200"><MoveUp size={16}/></button>
                  <button onClick={() => moveSlide(index, 'down')} className="p-1 hover:bg-gray-100 rounded border border-gray-200"><MoveDown size={16}/></button>
                  <button onClick={() => deleteSlide(index)} className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"><Trash2 size={20}/></button>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border-2 border-dashed border-yellow-200">
                <p className="text-[10px] uppercase text-yellow-700 font-bold">Pro Tip:</p>
                <p className="text-[10px] text-yellow-600 italic font-sans">Use 1360x400px images for the best look on desktop and mobile.</p>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addSlide}
          className="w-full py-6 border-4 border-dashed border-gray-300 text-gray-400 hover:border-black hover:text-black transition-all flex items-center justify-center gap-2"
          style={comicSansBold}
        >
          <Plus size={24} /> ADD NEW SLIDE
        </button>
      </div>
    </div>
  );
};

export default AdminHeroSliderSettings;
