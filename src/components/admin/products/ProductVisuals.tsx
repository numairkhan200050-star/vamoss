// src/components/admin/products/ProductVisuals.tsx 
import React, { useState } from 'react';
import { 
  Images, 
  Plus, 
  Trash2, 
  GripVertical, 
  Image as ImageIcon, 
  CheckCircle2, 
  UploadCloud 
} from 'lucide-react';

interface ProductVisualsProps {
  mainImage: string;
  setMainImage: (url: string) => void;
  gallery: string[];
  setGallery: (urls: string[]) => void;
  openMediaVault: () => void; // Trigger for Note 8 Media Vault
}

export const ProductVisuals: React.FC<ProductVisualsProps> = ({
  mainImage,
  setMainImage,
  gallery,
  setGallery,
  openMediaVault
}) => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // --- GALLERY LOGIC ---
  const handleRemove = (url: string) => {
    const updated = gallery.filter(item => item !== url);
    setGallery(updated);
    if (mainImage === url) setMainImage(updated[0] || "");
  };

  const onDragStart = (index: number) => setDragIndex(index);

  const onDrop = (index: number) => {
    if (dragIndex === null) return;
    const newGallery = [...gallery];
    const draggedItem = newGallery.splice(dragIndex, 1)[0];
    newGallery.splice(index, 0, draggedItem);
    setGallery(newGallery);
    setDragIndex(null);
    // Auto-set first image as main if desired
    if (index === 0 || dragIndex === 0) setMainImage(newGallery[0]);
  };

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <h2 style={comicSansBold} className="text-xl uppercase flex items-center gap-2 border-b-4 border-black pb-2">
        <Images size={20} /> Media Library
      </h2>

      {/* ACTION BAR */}
      <div className="flex gap-3">
        <button 
          onClick={openMediaVault}
          style={comicSansBold}
          className="flex-1 bg-[#FFD700] border-2 border-black p-3 uppercase text-xs flex items-center justify-center gap-2 hover:bg-black hover:text-[#FFD700] transition-all"
        >
          <ImageIcon size={16} /> Pick from Vault
        </button>
        <button 
          style={comicSansBold}
          className="flex-1 bg-white border-2 border-black p-3 uppercase text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
        >
          <UploadCloud size={16} /> Upload New
        </button>
      </div>

      {/* MAIN PREVIEW */}
      <div className="relative border-4 border-black aspect-video bg-gray-50 overflow-hidden group">
        {mainImage ? (
          <img src={mainImage} alt="Main" className="w-full h-full object-contain" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <ImageIcon size={48} strokeWidth={1} />
            <p className="text-[10px] font-black uppercase mt-2">No Main Image Selected</p>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-black text-[#FFD700] px-3 py-1 text-[10px] font-black uppercase border-2 border-[#FFD700]">
          Primary Display
        </div>
      </div>

      {/* DRAGGABLE GALLERY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t-2 border-dashed border-black/10">
        {gallery.map((url, index) => (
          <div 
            key={url}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(index)}
            className={`relative aspect-square border-2 border-black group cursor-move transition-all ${
              mainImage === url ? 'ring-4 ring-[#FFD700] scale-95' : 'hover:scale-105'
            }`}
          >
            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
            
            {/* DRAG HANDLE */}
            <div className="absolute top-1 left-1 bg-white border border-black p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical size={12} />
            </div>

            {/* DELETE BUTTON */}
            <button 
              onClick={() => handleRemove(url)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full border border-black opacity-0 group-hover:opacity-100 transition-opacity shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Trash2 size={12} />
            </button>

            {/* SET AS MAIN OVERLAY */}
            {mainImage !== url && (
              <button 
                onClick={() => setMainImage(url)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="bg-white text-black px-2 py-1 text-[8px] font-black uppercase border border-black">Set Main</span>
              </button>
            )}

            {mainImage === url && (
              <div className="absolute bottom-1 right-1 text-[#FFD700]">
                <CheckCircle2 size={16} fill="black" />
              </div>
            )}
          </div>
        ))}

        {/* EMPTY SLOT / ADD TRIGGER */}
        <button 
          onClick={openMediaVault}
          className="aspect-square border-2 border-dashed border-black flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
        >
          <Plus size={24} />
          <span className="text-[8px] font-black uppercase mt-1 text-center">Add More</span>
        </button>
      </div>
    </div>
  );
};
