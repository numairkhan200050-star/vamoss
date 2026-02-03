import React from "react";
import { Boxes } from "lucide-react";

interface InventoryStockProps {
  sku: string;
  setSku: (val: string) => void;
  quantity: number;
  setQuantity: (val: number) => void;
  trackInventory: boolean;
  setTrackInventory: (val: boolean) => void;
  allowBackorder: boolean;
  setAllowBackorder: (val: boolean) => void;
}

export const InventoryStock: React.FC<InventoryStockProps> = ({
  sku,
  setSku,
  quantity,
  setQuantity,
  trackInventory,
  setTrackInventory,
  allowBackorder,
  setAllowBackorder,
}) => {
  return (
    <div className="bg-white border-4 border-black p-6 space-y-5">

      {/* HEADER */}
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2">
        <Boxes size={14} /> Inventory & Stock
      </h2>

      {/* SKU */}
      <div>
        <label className="text-[10px] font-black uppercase block mb-1">
          SKU (Stock Keeping Unit)
        </label>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full p-3 border-2 border-black font-bold text-xs outline-none"
          placeholder="Enter SKU"
        />
      </div>

      {/* TRACK INVENTORY */}
      <div className="flex items-center justify-between border-2 border-black p-3">
        <span className="text-[10px] font-black uppercase">
          Track Inventory
        </span>

        <input
          type="checkbox"
          checked={trackInventory}
          onChange={(e) => setTrackInventory(e.target.checked)}
          className="w-4 h-4 cursor-pointer"
        />
      </div>

      {/* QUANTITY */}
      {trackInventory && (
        <div>
          <label className="text-[10px] font-black uppercase block mb-1">
            Quantity Available
          </label>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-3 border-2 border-black font-bold outline-none"
          />
        </div>
      )}

      {/* BACKORDER */}
      {trackInventory && (
        <div className="flex items-center justify-between border-2 border-black p-3">
          <span className="text-[10px] font-black uppercase">
            Continue Selling When Out Of Stock
          </span>

          <input
            type="checkbox"
            checked={allowBackorder}
            onChange={(e) => setAllowBackorder(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      )}

    </div>
  );
};
