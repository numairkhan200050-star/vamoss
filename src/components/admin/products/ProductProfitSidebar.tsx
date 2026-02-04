// src/components/admin/products/CategoryProductProfitSidebar.tsx 
import React, { useEffect, useState } from 'react';
import { Calculator, Truck, TrendingUp, AlertCircle, Save, RotateCcw } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ProductProfitSidebarProps {
  sellingPrice: number;
  costPrice: number;
  weightGrams: number;
  onSave: () => void;
  onDiscard: () => void;
  status: string;
  setStatus: (val: string) => void;
}

export const ProductProfitSidebar: React.FC<ProductProfitSidebarProps> = ({
  sellingPrice,
  costPrice,
  weightGrams,
  onSave,
  onDiscard,
  status,
  setStatus
}) => {
  const [shippingCost, setShippingCost] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [margin, setMargin] = useState(0);

  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  // --- FETCH SHIPPING RATE & CALCULATE ---
  useEffect(() => {
    const calculateLogic = async () => {
      // Fetch rate from Note 11 Table
      const { data: rates } = await supabase
        .from('shipping_rates')
        .select('*')
        .order('max_weight_grams', { ascending: true });

      if (rates) {
        const applicableRate = rates.find(r => weightGrams <= r.max_weight_grams);
        const shipCharge = applicableRate ? Number(applicableRate.charge_pkr) : 0;
        
        const profit = sellingPrice - costPrice - shipCharge;
        const calcMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

        setShippingCost(shipCharge);
        setNetProfit(profit);
        setMargin(Number(calcMargin.toFixed(1)));
      }
    };

    calculateLogic();
  }, [sellingPrice, costPrice, weightGrams]);

  return (
    <div className="sticky top-6 space-y-6">
      {/* PROFIT CALCULATOR CARD */}
      <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(255,215,0,1)]">
        <h2 style={comicSansBold} className="text-[#FFD700] text-lg uppercase flex items-center gap-2 mb-6 border-b border-[#FFD700]/30 pb-2">
          <Calculator size={20} /> Profit Analysis
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs uppercase font-black text-gray-400">
            <span className="flex items-center gap-1"><Truck size={12} /> Shipping</span>
            <span className="text-white">Rs. {shippingCost}</span>
          </div>

          <div className="flex justify-between items-end border-t border-zinc-800 pt-4">
            <div>
              <p className="text-[10px] font-black uppercase text-[#FFD700]">Net Profit</p>
              <p className="text-3xl font-black">Rs. {netProfit}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-black ${margin > 30 ? 'text-green-500' : 'text-orange-500'}`}>
                {margin}%
              </p>
              <p className="text-[8px] font-black uppercase text-gray-500 text-nowrap">Margin</p>
            </div>
          </div>

          {margin < 15 && (
            <div className="bg-red-900/30 border border-red-500 p-2 flex items-center gap-2 text-[10px] text-red-200 font-bold italic">
              <AlertCircle size={14} /> Low Margin Warning!
            </div>
          )}
        </div>
      </div>

      {/* STATUS & ACTIONS CARD */}
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div>
          <label className="text-[10px] font-black uppercase block mb-2">Product Status</label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border-2 border-black font-black uppercase text-xs cursor-pointer focus:bg-yellow-50"
          >
            <option value="draft">Draft (Hidden)</option>
            <option value="active">Active (Live)</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="space-y-2 pt-2">
          <button 
            onClick={onSave}
            style={comicSansBold}
            className="w-full bg-[#FFD700] border-4 border-black py-4 uppercase text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
          >
            <Save size={18} /> Save Product
          </button>
          
          <button 
            onClick={onDiscard}
            className="w-full bg-gray-100 border-2 border-black py-2 uppercase text-[10px] font-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> Discard
          </button>
        </div>
      </div>
    </div>
  );
};
