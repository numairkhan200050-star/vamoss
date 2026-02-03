// src/components/admin/AdminTopBannerSettings.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Eye, 
  Save, 
  Trash2, 
  Settings2,
  Globe
} from 'lucide-react';

// Assuming you have an ImageUploader component ready
import { ImageUploader } from '../ImageUploader';

const AdminTopBannerSettings = () => {
  // Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  // State
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('/');
  const [altText, setAltText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch settings from Supabase on load
  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('top_banner_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (data) {
        setIsActive(data.is_active);
        setImageUrl(data.image_url);
        setLink(data.link);
        setAltText(data.alt_text);
      }
    };
    fetchSettings();
  }, []);

  const saveTopBanner = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('top_banner_settings')
        .upsert([
          { id: 1, image_url: imageUrl, link, alt_text: altText, is_active: isActive }
        ], { onConflict: ['id'] });

      if (error) throw error;
      alert('Top Banner Updated in Command Center!');
    } catch (err) {
      alert('Error saving settings. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic text-black flex items-center gap-3">
            <Settings2 className="text-[#FFD700]" /> TOP BANNER SUPERVISOR
          </h2>
          <p style={comicSansRegular} className="text-gray-500">The first impression of your store. Make it count.</p>
        </div>
        <button 
          onClick={saveTopBanner}
          disabled={loading}
          className="flex items-center gap-2 bg-[#FFD700] text-black border-2 border-black px-8 py-3 hover:bg-black hover:text-[#FFD700] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
          style={comicSansBold}
        >
          <Save size={20} /> {loading ? 'SAVING...' : 'SAVE BANNER'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: MEDIA UPLOAD */}
        <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 style={comicSansBold} className="text-lg mb-6 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
            <ImageIcon size={18} className="text-[#FFD700]" /> BANNER MEDIA
          </h3>
          
          <div className="space-y-4">
            <div className="border-4 border-dashed border-gray-200 p-8 text-center hover:border-[#FFD700] transition-colors">
              <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />
            </div>

            {imageUrl && (
              <div className="relative border-4 border-black group">
                <img src={imageUrl} alt="Banner Preview" className="w-full h-auto" />
                <button 
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 hover:bg-black transition-colors shadow-md"
                >
                  <Trash2 size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-1 text-center font-mono">
                  CURRENTLY ACTIVE FILE
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT: CONFIGURATION */}
        <div className="space-y-6">
          <section className="bg-black text-white border-4 border-[#FFD700] p-6 shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]">
            <h3 style={comicSansBold} className="text-lg mb-6 flex items-center gap-2 text-[#FFD700] border-b border-gray-800 pb-2">
              <Globe size={18} /> SETTINGS & SEO
            </h3>
            
            <div className="space-y-6">
              {/* TOGGLE */}
              <div className="flex items-center justify-between bg-white/10 p-4 border border-white/20">
                <span style={comicSansBold} className="text-sm uppercase">Active Status</span>
                <input 
                  type="checkbox" 
                  checked={isActive} 
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-6 h-6 accent-[#FFD700]"
                />
              </div>

              {/* LINK */}
              <div>
                <label style={comicSansBold} className="text-[10px] uppercase block mb-1 text-[#FFD700]">Click Destination (URL)</label>
                <div className="flex items-center gap-2 bg-white p-2 border-2 border-black">
                  <LinkIcon size={16} className="text-black" />
                  <input 
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="flex-1 text-black outline-none text-sm"
                    placeholder="/collections/sale"
                  />
                </div>
              </div>

              {/* ALT TEXT */}
              <div>
                <label style={comicSansBold} className="text-[10px] uppercase block mb-1 text-[#FFD700]">Accessibility (Alt Text)</label>
                <input 
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#FFD700] p-2 text-sm outline-none focus:bg-white/5"
                  placeholder="Describe the banner image..."
                />
              </div>
            </div>
          </section>

          {/* PREVIEW STRIP */}
          <div className="p-4 bg-gray-100 border-4 border-black">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={14} />
              <span style={comicSansBold} className="text-[10px] uppercase">Desktop Snippet Preview</span>
            </div>
            <div className="w-full h-6 bg-black flex items-center justify-center overflow-hidden">
               {imageUrl ? (
                 <img src={imageUrl} className="w-full h-full object-cover opacity-80" />
               ) : (
                 <span className="text-[8px] text-white">NO IMAGE UPLOADED</span>
               )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminTopBannerSettings;
