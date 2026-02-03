import React from "react";
import { Globe } from "lucide-react";

interface SEOSettingsProps {
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  slug: string;
}

export const SEOSettings: React.FC<SEOSettingsProps> = ({
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  slug,
}) => {
  return (
    <div className="bg-white border-4 border-black p-6 space-y-5">
      
      {/* HEADER */}
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2">
        <Globe size={14} /> SEO Settings
      </h2>

      {/* META TITLE */}
      <div>
        <label className="text-[10px] font-black uppercase block mb-1">
          Meta Title
        </label>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="w-full p-3 border-2 border-black font-bold text-xs outline-none"
          placeholder="SEO Title (leave empty to use product title)"
        />
      </div>

      {/* META DESCRIPTION */}
      <div>
        <label className="text-[10px] font-black uppercase block mb-1">
          Meta Description
        </label>
        <textarea
          rows={4}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="w-full p-3 border-2 border-black font-medium text-xs outline-none"
          placeholder="SEO Description (leave empty to auto-generate)"
        />
      </div>

      {/* URL PREVIEW */}
      <div className="bg-blue-50 border border-blue-200 p-3 text-[10px] font-mono text-blue-700">
        URL Preview:
        <div className="truncate">
          /product/{slug || "product-slug"}
        </div>
      </div>
    </div>
  );
};
