import React, { useState } from 'react';

type ProductImage = {
  id: string;
  file: File;
  preview: string;
};

export const ProductForm = () => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newImages: ProductImage[] = Array.from(e.target.files).map(
      (file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      })
    );

    setImages((prev) => [...prev, ...newImages]);
  };

  /* ---------------- DRAG & DROP ---------------- */

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null) return;

    const reordered = [...images];
    const draggedItem = reordered.splice(dragIndex, 1)[0];
    reordered.splice(index, 0, draggedItem);

    setImages(reordered);
    setDragIndex(null);
  };

  /* ---------------- DELETE IMAGE ---------------- */

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product Media</h2>

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />

      {/* Image List */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={img.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className="relative border p-2 cursor-move"
          >
            {/* Main Image Badge */}
            {index === 0 && (
              <span className="absolute top-1 left-1 text-xs bg-black text-white px-2">
                Main
              </span>
            )}

            <img
              src={img.preview}
              alt="product"
              className="w-full h-32 object-cover"
            />

            <button
              onClick={() => removeImage(img.id)}
              className="absolute top-1 right-1 text-xs bg-red-600 text-white px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
