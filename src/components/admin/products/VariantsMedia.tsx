// src/components/admin/products/VariantsMedia.tsx
import React, { useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { Plus } from 'lucide-react';

interface Variant {
  color_name: string;
  image_url: string;
}

interface VariantsMediaProps {
  variants: Variant[];
  setVariants: (val: Variant[]) => void;
}

export const VariantsMedia: React.FC<VariantsMediaProps> = ({ variants, setVariants }) => {

  // Handle drag and drop reordering
  const handleDrag = (fromIndex: number, toIndex: number) => {
    const updated = [...variants];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { color_name: '', image_url: '' }]);
  };

  const removeVariant = (index: number) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 italic">
        Color Options & Media
      </h2>

      {variants.map((v, i) => (
        <div 
          key={i} 
          className="grid grid-cols-3 gap-4 items-center border-b border-gray-100 py-4"
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', i.toString())}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const from = Number(e.dataTransfer.getData('text'));
            handleDrag(from, i);
          }}
        >
          {/* Color Name */}
          <input
            placeholder="Color Name"
            className="p-3 border-2 border-black font-bold uppercase text-xs"
            value={v.color_name}
            onChange={(e) => {
              const updated = [...variants];
              updated[i].color_name = e.target.value;
              setVariants(updated);
            }}
          />

          {/* Variant Image */}
          <ImageUploader
            label={`Photo for ${v.color_name || 'Variant'}`}
            onUploadSuccess={(url) => {
              const updated = [...variants];
              updated[i].image_url = url;
              setVariants(updated);
            }}
          />

          {/* Remove Variant */}
          <button
            type="button"
            onClick={() => removeVariant(i)}
            className="text-red-600 font-bold text-[10px] uppercase"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="text-[10px] font-black uppercase underline decoration-2 decoration-[#FFD700]"
      >
        + Add Color Variant
      </button>
    </div>
  );
};

