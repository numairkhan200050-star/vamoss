import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../ImageUploader';
import { supabase } from '../../lib/supabase';

export const AdminTopBannerSettings = () => {
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('/');
  const [altText, setAltText] = useState('');

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('top_banner_settings')
        .select('*')
        .limit(1)
        .single();

      if (error) return console.error('Fetch top banner error:', error);

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
    try {
      const { error } = await supabase
        .from('top_banner_settings')
        .upsert([
          { id: 1, image_url: imageUrl, link, alt_text: altText, is_active: isActive }
        ]);

      if (error) throw error;
      alert('Top Banner saved!');
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving Top Banner. Check console.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black mb-4">Top Banner Settings</h2>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
        <label className="font-bold">Enable Top Banner</label>
      </div>

      <div>
        <label className="font-bold">Banner Image</label>
        <ImageUploader
          label="Upload Banner Image"
          onUploadSuccess={url => setImageUrl(url)}
        />
        {imageUrl && <img src={imageUrl} alt="Preview" className="w-full h-20 object-cover mt-2 rounded" />}
      </div>

      <div>
        <label className="font-bold">Banner Link</label>
        <input
          className="w-full border p-2"
          value={link}
          onChange={e => setLink(e.target.value)}
        />
      </div>

      <div>
        <label className="font-bold">Alt Text</label>
        <input
          className="w-full border p-2"
          value={altText}
          onChange={e => setAltText(e.target.value)}
        />
      </div>

      <button
        onClick={saveTopBanner}
        className="bg-black text-white px-6 py-2 font-black uppercase"
      >
        Save Top Banner
      </button>
    </div>
  );
};
