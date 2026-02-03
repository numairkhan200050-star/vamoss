// src/components/admin/products/VariantsMedia.tsx
import React from 'react';
import { ImageUploader } from '../../ImageUploader';
import { Plus, Trash2 } from 'lucide-react';

export interface Variant {
  colorName: string;
  imageUrl: string;
  costPrice: number;
  sellingPrice: number;
  oldPrice?: number;
  weight: number; // in grams
}

interface VariantsMediaProps {
  variants: Variant[];
  setVariants: (val: Variant[]) => void;
}

export const VariantsMedia: React.FC<VariantsMediaProps> = ({ variants, setVariants }) => {

  // --- Drag & drop reordering
  const handleDrag = (fromIndex: number, toIndex: number) => {
    const updated = [...variants];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setVariants(updated);
  };

  // --- Add new variant
  const addVariant = () => {
    setVariants([...variants, { colorName: '', imageUrl: '', costPrice: 0, sellingPrice: 0, oldPrice: 0, weight: 0 }]);
  };

  // --- Remove variant
  const removeVariant = (index: number) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 italic">
        Color Variants & Pricing
      </h2>

      {variants.map((v, i) => (
        <div 
          key={i} 
          className="flex flex-col gap-2 border-b border-gray-100 py-4"
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', i.toString())}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const from = Number(e.dataTransfer.getData('text'));
            handleDrag(from, i);
          }}
        >
          {/* Top Row: Color Name + Image + Remove */}
          <div className="flex items-center gap-2">
            <input
              placeholder="Color Name"
              className="p-2 border-2 border-black font-bold uppercase text-xs flex-1"
              value={v.colorName}
              onChange={(e) => {
                const updated = [...variants];
                updated[i].colorName = e.target.value;
                setVariants(updated);
              }}
            />

            <ImageUploader
              label={`Photo for ${v.colorName || 'Variant'}`}
              onUploadSuccess={(url) => {
                const updated = [...variants];
                updated[i].imageUrl = url;
                setVariants(updated);
              }}
            />

            <button
              type="button"
              onClick={() => removeVariant(i)}
              className="bg-red-500 text-white p-1 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Pricing & Weight Inputs */}
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Cost Price"
              value={v.costPrice || 0}
              onChange={(e) => {
                const updated = [...variants];
                updated[i].costPrice = Number(e.target.value);
                setVariants(updated);
              }}
              className="p-2 border-2 border-black text-xs w-1/4"
            />
            <input
              type="number"
              placeholder="Selling Price"
              value={v.sellingPrice || 0}
              onChange={(e) => {
                const updated = [...variants];
                updated[i].sellingPrice = Number(e.target.value);
                setVariants(updated);
              }}
              className="p-2 border-2 border-black text-xs w-1/4"
            />
            <input
              type="number"
              placeholder="Old Price"
              value={v.oldPrice || 0}
              onChange={(e) => {
                const updated = [...variants];
                updated[i].oldPrice = Number(e.target.value);
                setVariants(updated);
              }}
              className="p-2 border-2 border-black text-xs w-1/4"
            />
            <input
              type="number"
              placeholder="Weight (g)"
              value={v.weight || 0}
              onChange={(e) => {
                const updated = [...variants];
                updated[i].weight = Number(e.target.value);
                setVariants(updated);
              }}
              className="p-2 border-2 border-black text-xs w-1/4"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="text-[10px] font-black uppercase underline decoration-2 decoration-[#FFD700]"
      >
        <Plus size={14} className="inline mr-1" /> Add Color Variant
      </button>
    </div>
  );
};
