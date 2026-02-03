// src/components/admin/products/ProductMedia.tsx
import React from 'react';
import { ImageUploader } from '../../ImageUploader';
import { Trash2, Plus } from 'lucide-react';

interface ProductMediaProps {
  mainImage: string;
  setMainImage: (url: string) => void;
  galleryImages: string[];
  setGalleryImages: (images: string[]) => void;
}

export const ProductMedia: React.FC<ProductMediaProps> = ({
  mainImage,
  setMainImage,
  galleryImages,
  setGalleryImages,
}) => {
  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">

      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2">
        Media
      </h2>

      {/* MAIN IMAGE */}
      <div>
        <p className="text-[10px] font-bold uppercase mb-1">Primary Image</p>
        <ImageUploader label="Upload Main Image" onUploadSuccess={setMainImage} />
        {mainImage && (
          <img
            src={mainImage}
            className="mt-2 w-40 h-40 object-cover border-2 border-black"
          />
        )}
      </div>

      {/* GALLERY */}
      <div>
        <p className="text-[10px] font-bold uppercase mb-1">Gallery Images</p>
        <ImageUploader
          label="Add to Gallery"
          onUploadSuccess={(url) => setGalleryImages([...galleryImages, url])}
        />

        <div className="flex flex-wrap gap-2 mt-2">
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
      </div>

    </div>
  );
};
