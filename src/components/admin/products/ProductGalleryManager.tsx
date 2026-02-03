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

  const handleUpload = (url: string) => {
    const newImages = [...images, { id: crypto.randomUUID(), url }];
    setImages(newImages);

    if (newImages.length === 1) {
      setMainImage(url);
    }
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    if (updated.length > 0) {
      setMainImage(updated[0].url);
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDrop = (index: number) => {

    if (dragIndex === null) return;

    const reordered = [...images];
    const dragged = reordered.splice(dragIndex, 1)[0];
    reordered.splice(index, 0, dragged);

    setImages(reordered);
    setDragIndex(null);

    setMainImage(reordered[0].url);
  };

  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">

      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2">
        Product Gallery
      </h2>

      <ImageUploader label="Upload Gallery Image" onUploadSuccess={handleUpload} />

      <div className="grid grid-cols-3 gap-4 pt-4">

        {images.map((img, index) => (
          <div
            key={img.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className="relative border-2 border-black p-2 bg-gray-50 cursor-move"
          >
            <img src={img.url} className="w-full h-28 object-cover" />

            <div className="absolute top-1 left-1 bg-white border p-1">
              <GripVertical size={14} />
            </div>

            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1"
            >
              <Trash2 size={14} />
            </button>

            {index === 0 && (
              <span className="absolute bottom-1 left-1 text-[9px] bg-black text-white px-2 py-1 font-bold">
                Main
              </span>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};
