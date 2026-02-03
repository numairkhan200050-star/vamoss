import React, { useState } from "react";
import { ImageUploader } from "../../ImageUploader";
import { Trash2, GripVertical } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
}

interface ProductGalleryManagerProps {
  images: GalleryImage[];
  setImages: (images: GalleryImage[]) => void;
  setMainImage: (url: string) => void;
}

export const ProductGalleryManager: React.FC<ProductGalleryManagerProps> = ({
  images,
  setImages,
  setMainImage,
}) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // 🔥 Handle Upload
  const handleUpload = (url: string) => {
    const newImages = [...images, { id: crypto.randomUUID(), url }];
    setImages(newImages);

    // First image becomes main image automatically
    if (newImages.length === 1) {
      setMainImage(url);
    }
  };

  // 🔥 Delete Image
  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    if (updated.length > 0) {
      setMainImage(updated[0].url);
    }
  };

  // 🔥 Drag Start
  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  // 🔥 Drag Over
  const handleDragOver = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;

    const reordered = [...images];
    const draggedItem = reordered[dragIndex];

    reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, draggedItem);

    setDragIndex(index);
    setImages(reordered);

    // First image always main
    setMainImage(reordered[0].url);
  };

  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2">
        Product Gallery
      </h2>

      {/* Upload Section */}
      <ImageUploader label="Upload Gallery Image" onUploadSuccess={handleUpload} />

      {/* Gallery Grid */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        {images.map((img, index) => (
          <div
            key={img.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            className="relative border-2 border-black p-2 bg-gray-50 cursor-move"
          >
            <img
              src={img.url}
              alt="gallery"
              className="w-full h-28 object-cover"
            />

            {/* Drag Icon */}
            <div className="absolute top-1 left-1 bg-white border p-1">
              <GripVertical size={14} />
            </div>

            {/* Delete Button */}
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1"
            >
              <Trash2 size={14} />
            </button>

            {/* Main Badge */}
            {index === 0 && (
              <span className="absolute bottom-1 left-1 text-[9px] bg-black text-white px-2 py-1 font-bold uppercase">
                Main
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
