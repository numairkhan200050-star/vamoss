// src/components/admin/products/ProductMedia.tsx
import React from 'react';
import { ImageUploader } from '../../ImageUploader';
import { Trash2, Plus } from 'lucide-react';

export interface Variant {
  id: string;
  colorName: string;
  imageUrl: string;
  costPrice: number;
  sellingPrice: number;
  oldPrice?: number;
  weight: number;
}

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

  /* SAFE VARIANT UPDATE */
  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const updated = variants.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );

    setVariants(updated);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">

      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2">
        Media & Variants
      </h2>

      {/* MAIN IMAGE */}
      <ImageUploader label="Upload Main Image" onUploadSuccess={setMainImage} />

      {mainImage && (
        <img src={mainImage} className="w-40 h-40 object-cover border-2 border-black" />
      )}

      {/* GALLERY */}
      <ImageUploader
        label="Add to Gallery"
        onUploadSuccess={(url) => setGalleryImages([...galleryImages, url])}
      />

      <div className="flex flex-wrap gap-2">
        {galleryImages.map((img, i) => (
          <div key={i} className="relative w-32 h-32 border-2 border-black">
            <img src={img} className="w-full h-full object-cover" />
            <button
              onClick={() =>
                setGalleryImages(galleryImages.filter((_, index) => index !== i))
              }
              className="absolute top-1 right-1 bg-red-500 text-white p-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* VARIANTS */}
      <div>
        <p className="text-xs font-bold uppercase mb-2">Color Variants</p>

        {variants.map((variant, index) => (
          <div key={variant.id} className="border p-3 mb-3">

            <input
              value={variant.colorName}
              onChange={(e) => updateVariant(index, 'colorName', e.target.value)}
              placeholder="Color Name"
              className="border p-2 w-full mb-2"
            />

            <ImageUploader
              label="Variant Image"
              onUploadSuccess={(url) => updateVariant(index, 'imageUrl', url)}
            />

            <div className="grid grid-cols-4 gap-2 mt-2">

              <input
                type="number"
                value={variant.costPrice}
                onChange={(e) => updateVariant(index, 'costPrice', Number(e.target.value))}
                placeholder="Cost"
                className="border p-2"
              />

              <input
                type="number"
                value={variant.sellingPrice}
                onChange={(e) => updateVariant(index, 'sellingPrice', Number(e.target.value))}
                placeholder="Selling"
                className="border p-2"
              />

              <input
                type="number"
                value={variant.oldPrice || 0}
                onChange={(e) => updateVariant(index, 'oldPrice', Number(e.target.value))}
                placeholder="Old Price"
                className="border p-2"
              />

              <input
                type="number"
                value={variant.weight}
                onChange={(e) => updateVariant(index, 'weight', Number(e.target.value))}
                placeholder="Weight"
                className="border p-2"
              />

            </div>

            <button
              onClick={() => removeVariant(index)}
              className="text-red-500 text-xs mt-2"
            >
              Remove Variant
            </button>

          </div>
        ))}

        <button
          onClick={() =>
            setVariants([
              ...variants,
              {
                id: crypto.randomUUID(),
                colorName: '',
                imageUrl: '',
                costPrice: 0,
                sellingPrice: 0,
                oldPrice: 0,
                weight: 0,
              },
            ])
          }
          className="text-xs underline flex items-center gap-1"
        >
          <Plus size={14} /> Add Variant
        </button>

      </div>
    </div>
  );
};
