// src/components/admin/products/BasicInfo.tsx
import React, { useEffect } from 'react';
import { Globe, FileText } from 'lucide-react';

interface BasicInfoProps {
  title: string;
  setTitle: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
};

export const BasicInfo: React.FC<BasicInfoProps> = ({
  title,
  setTitle,
  slug,
  setSlug,
  description,
  setDescription,
}) => {
  // Auto-generate slug when title changes
  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2">
        <Globe size={14} /> SEO & Identity
      </h2>

      <div className="space-y-4">
        {/* Product Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 border-2 border-black font-bold text-xl outline-none"
          placeholder="Product Name..."
        />

        {/* SEO / Slug Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 text-[10px] font-mono text-blue-600 border border-blue-100 truncate">
            {`URL: /product/${slug}`}
          </div>
        </div>

        {/* Product Description */}
        <div>
          <label className="text-[10px] font-black uppercase block mb-2">
            Product Description
          </label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border-2 border-gray-100 font-medium outline-none"
            placeholder="Details..."
          />
        </div>
      </div>
    </div>
  );
};
