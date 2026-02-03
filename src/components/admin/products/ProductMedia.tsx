// src/components/admin/products/ProductMedia.tsx
import React from 'react';
import { ImageUploader } from '../../ImageUploader';
import { Trash2, Plus } from 'lucide-react';
import { arrayMoveImmutable } from 'array-move'; // Drag-and-drop support


// --- Variant type
export interface Variant {
  colorName: string;
  imageUrl: string;
}

// --- Props for ProductMedia
interface ProductMediaProps {
  mainImage: string;
  setMainImage: (url: string) => void;
  galleryImages: string[];
  setGalleryImages: (images: string[]) => void;
  variants: Variant[];
  setVariants: (variants: Variant[]) => void;
}

export const ProductMedia: React.FC<ProductMediaProps> = ({
  mainImage,
  setMainImage,
  galleryImages,
  setGalleryImages,
  variants,
  setVariants,
}) => {

  // --- Remove image from gallery
  const removeGalleryImage = (index: number) => {
    const newGallery = [...galleryImages];
    newGallery.splice(index, 1);
    setGalleryImages(newGallery);
  };

  // --- Reorder gallery images
  const moveImage = (from: number, to: number) => {
    setGalleryImages(arrayMoveImmutable(galleryImages, from, to));
  };

  // --- Remove variant
  const removeVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2">
        Media & Variants
      </h2>

      {/* PRIMARY IMAGE */}
      <div>
        <p className="text-[10px] font-bold uppercase mb-1">Primary Image</p>
        <ImageUploader label="Upload Main Image" onUploadSuccess={setMainImage} />
        {mainImage && (
          <img
            src={mainImage}
            alt="Primary"
            className="mt-2 w-40 h-40 object-cover border-2 border-black"
          />
        )}
      </div>

      {/* GALLERY IMAGES */}
      <div>
        <p className="text-[10px] font-bold uppercase mb-1">Gallery Images</p>
        <ImageUploader
          label="Add to Gallery"
          onUploadSuccess={(url) => setGalleryImages([...galleryImages, url])}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative w-32 h-32 border-2 border-black cursor-move"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', i.toString())}
              onDrop={(e) => {
                const fromIndex = Number(e.dataTransfer.getData('text/plain'));
                moveImage(fromIndex, i);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* COLOR VARIANTS */}
      <div>
        <p className="text-[10px] font-bold uppercase mb-1">Color Variants</p>
        {variants.map((v, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Color Name"
              value={v.colorName}
              onChange={(e) => {
                const newV = [...variants];
                newV[i].colorName = e.target.value;
                setVariants(newV);
              }}
              className="p-2 border-2 border-black text-xs font-bold"
            />
            <ImageUploader
              label="Upload Variant Image"
              onUploadSuccess={(url) => {
                const newV = [...variants];
                newV[i].imageUrl = url;
                setVariants(newV);
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
        ))}
        <button
          type="button"
          onClick={() => setVariants([...variants, { colorName: '', imageUrl: '' }])}
          className="text-[10px] font-black uppercase underline decoration-2 decoration-[#FFD700]"
        >
          <Plus size={14} className="inline mr-1" /> Add Variant
        </button>
      </div>
    </div>
  );
};
