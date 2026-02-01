import React, { useState } from 'react';

export const AdminTopBannerSettings = () => {
  const [isActive, setIsActive] = useState(true); // Enable / disable banner
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/1920x60?text=ADVERTISING+BANNER+IMAGE+HERE");
  const [link, setLink] = useState("/collections/new-arrivals");
  const [altText, setAltText] = useState("Special Promotion");

  const saveTopBanner = () => {
    alert('Top Banner settings saved!');
    console.log({ isActive, imageUrl, link, altText });
    // Later: connect to Supabase to save these settings
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black mb-4">Top Banner Settings</h2>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          checked={isActive} 
          onChange={e => setIsActive(e.target.checked)} 
        />
        <label className="font-bold">Enable Top Banner</label>
      </div>

      <div>
        <label className="font-bold">Banner Image URL</label>
        <input 
          className="w-full border p-2" 
          value={imageUrl} 
          onChange={e => setImageUrl(e.target.value)} 
          placeholder="Enter banner image URL"
        />
      </div>

      <div>
        <label className="font-bold">Banner Link</label>
        <input 
          className="w-full border p-2" 
          value={link} 
          onChange={e => setLink(e.target.value)} 
          placeholder="Enter banner link"
        />
      </div>

      <div>
        <label className="font-bold">Alt Text</label>
        <input 
          className="w-full border p-2" 
          value={altText} 
          onChange={e => setAltText(e.target.value)} 
          placeholder="Enter alt text for banner"
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
