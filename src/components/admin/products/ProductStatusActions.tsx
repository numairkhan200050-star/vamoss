// src/components/admin/products/ProductStatusActions.tsx
import React from "react";
import { Trash2, Save, RotateCcw } from "lucide-react";

interface ProductStatusActionsProps {
  status: string;
  setStatus: (val: string) => void;
  onSave: () => void;
  onDiscard: () => void;
  onDelete?: () => void;
  isEditMode?: boolean;
}

export const ProductStatusActions: React.FC<ProductStatusActionsProps> = ({
  status,
  setStatus,
  onSave,
  onDiscard,
  onDelete,
  isEditMode = false,
}) => {
  return (
    <div className="bg-white border-4 border-black p-6 space-y-5">
      
      {/* STATUS SELECT */}
      <div>
        <label className="text-[10px] font-black uppercase block border-b-2 border-black pb-1 mb-2">
          Product Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border-2 border-black font-black uppercase text-xs bg-white cursor-pointer"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="deactive">Deactive</option>
        </select>
      </div>

      {/* ACTION BUTTONS */}
      <div className="space-y-3 pt-3 border-t border-gray-200">
        
        {/* SAVE */}
        <button
          onClick={onSave}
          className="w-full bg-[#FFD700] border-4 border-black py-3 font-black uppercase hover:bg-black hover:text-[#FFD700] transition-all"
        >
          <Save className="inline mr-2" size={16} />
          Save Product
        </button>

        {/* DISCARD */}
        <button
          onClick={onDiscard}
          className="w-full bg-gray-200 border-2 border-black py-3 font-black uppercase hover:bg-black hover:text-white transition-all"
        >
          <RotateCcw className="inline mr-2" size={16} />
          Discard Changes
        </button>

        {/* DELETE (Only Edit Mode) */}
        {isEditMode && onDelete && (
          <button
            onClick={onDelete}
            className="w-full bg-red-500 text-white border-2 border-black py-3 font-black uppercase hover:bg-black transition-all"
          >
            <Trash2 className="inline mr-2" size={16} />
            Delete Product
          </button>
        )}
      </div>
    </div>
  );
};
