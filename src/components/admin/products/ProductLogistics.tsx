// src/components/admin/products/ProductLogistics.tsx
import React from 'react';
import { Palette, Trash2, Plus, Image as ImageIcon, Check } from 'lucide-react';

interface Variant {
  colorName: string;
  colorCode: string; // HEX Code
  imageUrl: string;
  costPrice: number;
  sellingPrice: number;
  weight: number;
}

interface ProductLogisticsProps {
  variants: Variant[];
  setVariants: (val: Variant[]) => void;
  availableImages: string[]; // Pass the gallery from Labor C here
}

export const ProductLogistics: React.FC<ProductLogisticsProps> = ({ 
  variants, 
  setVariants,
  availableImages 
}) => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const addVariant = () => {
    setVariants([...variants, { colorName: '', colorCode: '#000000', imageUrl: '', costPrice: 0, sellingPrice: 0, weight: 0 }]);
  };

  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <h2 style={comicSansBold} className="text-xl uppercase flex items-center gap-2 border-b-4 border-black pb-2">
        <Palette size={20} /> Color Variants & Logistics
      </h2>

      <div className="space-y-4">
        {variants.map((v, i) => (
          <div key={i} className="border-4 border-black p-4 bg-gray-50 relative group">
            <button 
              onClick={() => setVariants(variants.filter((_, idx) => idx !== i))}
              className="absolute -top-3 -right-3 bg-red-500 text-white p-1 border-2 border-black rounded-full hover:scale-110 transition-transform z-10"
            >
              <Trash2 size={14} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT: COLOR INFO */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] font-black uppercase">Color Name</label>
                    <input 
                      type="text"
                      value={v.colorName}
                      onChange={(e) => updateVariant(i, 'colorName', e.target.value)}
                      className="w-full p-2 border-2 border-black font-bold text-xs"
                      placeholder="e.g. Midnight Blue"
                    />
                  </div>
                  <div className="w-20">
                    <label className="text-[10px] font-black uppercase">Code</label>
                    <div className="relative">
                      <input 
                        type="color"
                        value={v.colorCode}
                        onChange={(e) => updateVariant(i, 'colorCode', e.target.value)}
                        className="w-full h-9 border-2 border-black cursor-pointer bg-white p-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 text-[8px]">Cost</label>
                    <input type="number" value={v.costPrice} onChange={(e) => updateVariant(i, 'costPrice', Number(e.target.value))} className="w-full p-1 border-2 border-black text-xs font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 text-[8px]">Sale</label>
                    <input type="number" value={v.sellingPrice} onChange={(e) => updateVariant(i, 'sellingPrice', Number(e.target.value))} className="w-full p-1 border-2 border-black text-xs font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 text-[8px]">Grams</label>
                    <input type="number" value={v.weight} onChange={(e) => updateVariant(i, 'weight', Number(e.target.value))} className="w-full p-1 border-2 border-black text-xs font-bold" />
                  </div>
                </div>
              </div>

              {/* RIGHT: IMAGE MAPPING */}
              <div>
                <label className="text-[10px] font-black uppercase mb-1 block">Link Image</label>
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {availableImages.map((img) => (
                    <button
                      key={img}
                      onClick={() => updateVariant(i, 'imageUrl', img)}
                      className={`relative flex-shrink-0 w-16 h-16 border-2 transition-all ${
                        v.imageUrl === img ? 'border-blue-500 scale-105' : 'border-black opacity-50'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                      {v.imageUrl === img && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <Check size={20} className="text-blue-600" />
                        </div>
                      )}
                    </button>
                  ))}
                  {availableImages.length === 0 && (
                    <div className="text-[8px] uppercase text-gray-400 italic flex items-center gap-1">
                      <ImageIcon size={10} /> Add to Gallery first
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addVariant}
          style={comicSansBold}
          className="w-full border-2 border-dashed border-black p-3 uppercase text-[10px] font-black hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Color Variant
        </button>
      </div>
    </div>
  );
};
