import React, { useState } from 'react';

interface SpotlightLink {
  type: 'product' | 'collection' | 'category';
  targetId: string;
}

export const AdminSpotlightSettings = () => {
  const [isActive, setIsActive] = useState(true);
  const [label, setLabel] = useState('Top Pick');
  const [link, setLink] = useState<SpotlightLink>({ type: 'product', targetId: '' });

  const saveSpotlight = () => {
    // Replace this with Supabase update logic later
    alert('Spotlight settings saved!');
    console.log({ isActive, label, link });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black mb-4">Spotlight Settings</h2>

      {/* Enable / Disable Spotlight */}
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          checked={isActive} 
          onChange={e => setIsActive(e.target.checked)} 
        />
        <label className="font-bold">Enable Spotlight</label>
      </div>

      {/* Label */}
      <div>
        <label className="font-bold">Label Text</label>
        <input 
          className="w-full border p-2"
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
      </div>

      {/* Link Settings */}
      <div>
        <label className="font-bold">Link Type</label>
        <select 
          className="w-full border p-2"
          value={link.type}
          onChange={e => setLink({ ...link, type: e.target.value as SpotlightLink['type'] })}
        >
          <option value="product">Product</option>
          <option value="collection">Collection</option>
          <option value="category">Category</option>
        </select>
      </div>

      <div>
        <label className="font-bold">Target ID / Slug</label>
        <input 
          className="w-full border p-2"
          placeholder="Enter product, collection, or category ID"
          value={link.targetId}
          onChange={e => setLink({ ...link, targetId: e.target.value })}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={saveSpotlight}
        className="bg-black text-white px-6 py-2 font-black uppercase"
      >
        Save Spotlight Settings
      </button>
    </div>
  );
};
