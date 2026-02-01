import React, { useState } from 'react';
import { getFomoSettings, updateFomoSettings } from './fomo.store';
import { FomoSettingsData, FomoLinkType } from './fomo.types';

export const FomoSettings = () => {
  const [data, setData] = useState<FomoSettingsData>(getFomoSettings());

  const handleChange = (key: keyof FomoSettingsData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    updateFomoSettings(data);
    alert('FOMO settings saved');
  };

  return (
    <div>
      <h2>FOMO Settings</h2>

      {/* ON / OFF */}
      <label>
        <input
          type="checkbox"
          checked={data.isActive}
          onChange={e => handleChange('isActive', e.target.checked)}
        />
        Enable FOMO
      </label>

      {/* TEXT */}
      <div>
        <label>FOMO Text</label>
        <input
          type="text"
          value={data.text}
          onChange={e => handleChange('text', e.target.value)}
        />
      </div>

      {/* TARGET TIME */}
      <div>
        <label>End Date & Time</label>
        <input
          type="datetime-local"
          onChange={e =>
            handleChange('targetDate', new Date(e.target.value).getTime())
          }
        />
      </div>

      {/* BUTTON TEXT */}
      <div>
        <label>Button Text</label>
        <input
          type="text"
          value={data.buttonText}
          onChange={e => handleChange('buttonText', e.target.value)}
        />
      </div>

      {/* LINK TYPE */}
      <div>
        <label>Button Link Type</label>
        <select
          value={data.linkType}
          onChange={e =>
            handleChange('linkType', e.target.value as FomoLinkType)
          }
        >
          <option value="page">Page</option>
          <option value="collection">Collection</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* LINK ID */}
      <div>
        <label>Link Target ID</label>
        <input
          type="text"
          placeholder="Select from existing entities (later)"
          value={data.linkId}
          onChange={e => handleChange('linkId', e.target.value)}
        />
      </div>

      <button onClick={saveSettings}>Save</button>
    </div>
  );
};
