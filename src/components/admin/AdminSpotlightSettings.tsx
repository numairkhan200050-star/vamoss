// src/components/admin/AdminSpotlightSettings.tsx
import React, { useState } from 'react';
import { 
  Target, 
  Image as ImageIcon, 
  MousePointer2, 
  Save, 
  Trash2,
  Sparkles
} from 'lucide-react';

// Using our established ImageUploader laborer
import { ImageUploader } from '../ImageUploader';

const AdminSpotlightSettings = () => {
  // Signature Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  // State
  const [isActive, setIsActive] = useState(true);
  const [label, setLabel] = useState('Top Pick');
  const [imageUrl, setImageUrl] = useState('');
  const [linkType, setLinkType] = useState<'product' | 'collection'>('product');
  const [targetId, setTargetId] = useState('');

  const handleSave = () => {
    const spotlightData = {
      isActive,
      label,
      imageUrl,
      linkType,
      targetId
    };
    // NOTE 4: This data will be sent to Supabase here
    console.log("Saving Spotlight:", spotlightData);
    alert("Spotlight Deployed to Storefront!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic text-black flex items-center gap-3">
            <Target className="text-[#FFD700]" /> SPOTLIGHT SUPERVISOR
          </h2>
          <p style={comicSansRegular} className="text-gray-500">Highlight a specific product or collection on the homepage.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-black text-[#FFD700] border-2 border-[#FFD700] px-8 py-3 hover:bg-[#FFD700] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={comicSansBold}
        >
          <Save size={20} /> UPDATE SPOTLIGHT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: IMAGE & STATUS */}
        <div className="space-y-6">
          <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 style={comicSansBold} className="text-lg mb-6 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
              <ImageIcon size={18} className="text-[#FFD700]" /> SPOTLIGHT IMAGE
            </h3>
            
            <div className="space-y-4">
              <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />
              
              {imageUrl && (
                <div className="relative border-4 border-black aspect-video overflow-hidden group">
                  <img src={imageUrl} alt="Spotlight Preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#FFD700] text-black px-2 py-1 text-[10px]" style={comicSansBold}>
                    {label}
                  </div>
                  <button 
                    onClick={() => setImageUrl('')}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 hover:bg-black transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="bg-gray-100 border-4 border-black p-4 flex items-center justify-between">
            <span style={comicSansBold} className="text-sm uppercase">Enable Spotlight Feature</span>
            <input 
              type="checkbox" 
              checked={isActive} 
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-6 h-6 accent-black"
            />
          </section>
        </div>

        {/* RIGHT: TEXT & LINKING */}
        <div className="space-y-6">
          <section className="bg-black text-white border-4 border-[#FFD700] p-6 shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]">
            <h3 style={comicSansBold} className="text-lg mb-6 flex items-center gap-2 text-[#FFD700] border-b border-gray-800 pb-2">
              <Sparkles size={18} /> CONTENT SETTINGS
            </h3>
            
            <div className="space-y-6">
              <div>
                <label style={comicSansBold} className="text-[10px] uppercase block mb-1 text-gray-400">Badge Label (e.g. Best Seller)</label>
                <input 
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 p-3 text-[#FFD700] outline-none focus:border-[#FFD700]"
                  style={comicSansBold}
                />
              </div>

              <div className="pt-4 border-t border-gray-800">
                <label style={comicSansBold} className="text-[10px] uppercase block mb-3 text-gray-400">Where should it lead?</label>
                <div className="flex gap-4 mb-4">
                  <button 
                    onClick={() => setLinkType('product')}
                    className={`flex-1 py-2 border-2 ${linkType === 'product' ? 'bg-[#FFD700] text-black border-[#FFD700]' : 'border-gray-700 text-gray-400'}`}
                    style={comicSansBold}
                  >
                    PRODUCT
                  </button>
                  <button 
                    onClick={() => setLinkType('collection')}
                    className={`flex-1 py-2 border-2 ${linkType === 'collection' ? 'bg-[#FFD700] text-black border-[#FFD700]' : 'border-gray-700 text-gray-400'}`}
                    style={comicSansBold}
                  >
                    COLLECTION
                  </button>
                </div>
                
                <div className="flex items-center gap-2 bg-white p-3 border-2 border-black">
                  <MousePointer2 size={18} className="text-black" />
                  <input 
                    placeholder={`Enter ${linkType} name or ID`}
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="flex-1 text-black outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default AdminSpotlightSettings;
