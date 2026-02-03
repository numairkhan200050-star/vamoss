// src/components/admin/products/BasicInfo.tsx
import React, { useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

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
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const BasicInfo: React.FC<BasicInfoProps> = ({
  title,
  setTitle,
  slug,
  setSlug,
  description,
  setDescription,
}) => {

  // Prevent slug override during edit mode
  const slugEdited = useRef(false);

  useEffect(() => {
    if (!slugEdited.current) {
      setSlug(slugify(title));
    }
  }, [title, setSlug]);

  return (
    <div className="bg-white border-4 border-black p-6 space-y-4">
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2">
        <Globe size={14} /> SEO & Identity
      </h2>

      {/* PRODUCT TITLE */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 border-2 border-black font-bold text-xl outline-none"
        placeholder="Product Name..."
      />

      {/* SLUG DISPLAY */}
      <div className="bg-blue-50 p-3 text-[10px] font-mono text-blue-600 border border-blue-100 truncate">
        {`URL: /product/${slug}`}
      </div>

      {/* DESCRIPTION */}
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
  );
};
