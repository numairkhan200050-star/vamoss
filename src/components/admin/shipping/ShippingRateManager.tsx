// src/components/admin/shipping/ShippingRateManager.tsx
import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Trash2, 
  Save, 
  Package, 
  Banknote, 
  Gift
} from 'lucide-react';

interface ShippingBracket {
  id: string;
  maxWeight: number;
  charge: number;
}

export const ShippingRateManager = () => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const [brackets, setBrackets] = useState<ShippingBracket[]>([
    { id: '1', maxWeight: 500, charge: 360 },
    { id: '2', maxWeight: 1000, charge: 700 }
  ]);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(5000);

  const addRow = () => {
    setBrackets([...brackets, { id: Date.now().toString(), maxWeight: 0, charge: 0 }]);
  };

  const removeRow = (id: string) => setBrackets(brackets.filter(b => b.id !== id));

  const updateRow = (id: string, field: keyof ShippingBracket, value: number) => {
    setBrackets(brackets.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* HEADER SECTION - RULE MATCHED */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(255,215,0,1)]">
            <Truck className="text-[#FFD700]" size={32} />
          </div>
          <div>
            <h1 style={comicSansBold} className="text-4xl uppercase italic tracking-tighter text-black">
              Shipping Matrix
            </h1>
            <p className="text-gray-500 font-medium uppercase text-[10px] tracking-widest">
              Logistics Control / Note 11 (Supabase Required)
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: TABLE AREA */}
        <div className="lg:col-span-2">
          <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black p-4 flex justify-between items-center">
              <span style={comicSansBold} className="text-[#FFD700] uppercase text-sm tracking-widest">Weight Brackets</span>
              <button onClick={addRow} className="bg-[#FFD700] text-black px-4 py-1 text-xs font-black uppercase border-2 border-black hover:translate-y-[-2px] transition-all">
                + Add Row
              </button>
            </div>
            
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-4 border-black text-[10px] uppercase tracking-widest font-black bg-gray-100">
                  <th className="p-4">Up to (Grams)</th>
                  <th className="p-4">Cost (PKR)</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {brackets.map((b) => (
                  <tr key={b.id} className="border-b-2 border-black">
                    <td className="p-4">
                      <input 
                        type="number" 
                        value={b.maxWeight}
                        onChange={(e) => updateRow(b.id, 'maxWeight', Number(e.target.value))}
                        className="w-full p-2 border-2 border-black font-bold outline-none focus:bg-yellow-50" 
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="number" 
                        value={b.charge}
                        onChange={(e) => updateRow(b.id, 'charge', Number(e.target.value))}
                        className="w-full p-2 border-2 border-black font-bold outline-none focus:bg-yellow-50 text-green-700" 
                      />
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => removeRow(b.id)} className="text-red-500 hover:scale-110 transition-transform">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: SETTINGS */}
        <div className="space-y-6">
          <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(255,215,0,1)]">
            <h3 style={comicSansBold} className="uppercase text-lg mb-4 flex items-center gap-2">
              <Gift size={20} className="text-blue-600" /> Free Delivery
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">Order Threshold (PKR)</label>
              <input 
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full p-4 border-4 border-black text-2xl font-black outline-none"
              />
            </div>
          </div>

          <button 
            style={comicSansBold}
            className="w-full bg-black text-[#FFD700] py-6 uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-3px] transition-all border-2 border-[#FFD700]"
          >
            Save to Supabase
          </button>
        </div>
      </div>
    </div>
  );
};
