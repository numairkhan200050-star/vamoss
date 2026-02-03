// src/components/admin/products/PricingProfit.tsx
import React, { useEffect, useState } from 'react';
import { Calculator } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface PricingProfitProps {
  costPrice: number;
  setCostPrice: (val: number) => void;
  sellingPrice: number;
  setSellingPrice: (val: number) => void;
  oldPrice: number;
  setOldPrice: (val: number) => void;
  weight: number;
  setWeight: (val: number) => void;
}

interface ShippingRate {
  id: number;
  weight_limit_grams: number;
  price: number;
}

export const PricingProfit: React.FC<PricingProfitProps> = ({
  costPrice, setCostPrice,
  sellingPrice, setSellingPrice,
  oldPrice, setOldPrice,
  weight, setWeight
}) => {
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [margin, setMargin] = useState(0);

  // Fetch shipping rates
  useEffect(() => {
    const fetchShipping = async () => {
      const { data } = await supabase.from('shipping_settings').select('*');
      if (data) setShippingRates(data as ShippingRate[]);
    };
    fetchShipping();
  }, []);

  // Calculate profit and margin whenever relevant values change
  useEffect(() => {
    const applicableRate = shippingRates.find(r => weight <= r.weight_limit_grams)?.price || 0;
    setShippingCost(applicableRate);

    const profit = sellingPrice - costPrice - applicableRate;
    setNetProfit(profit);

    const calculatedMargin = sellingPrice > 0 ? ((profit / sellingPrice) * 100).toFixed(1) : '0';
    setMargin(Number(calculatedMargin));
  }, [costPrice, sellingPrice, weight, shippingRates]);

  return (
    <div className="bg-black text-white p-6 border-4 border-[#FFD700] sticky top-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="font-black uppercase mb-6 text-[#FFD700] flex items-center gap-2 italic underline decoration-white">
        <Calculator /> Profit Logic
      </h2>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase">Cost (PKR)</label>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(Number(e.target.value))}
              className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-white outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase">Selling (PKR)</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-[#FFD700] text-xl outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-gray-400 font-bold uppercase">Old Price (PKR)</label>
          <input
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(Number(e.target.value))}
            className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-white outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] text-gray-400 font-bold uppercase">Weight (Grams)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full bg-transparent border-b border-gray-700 p-2 font-black text-white outline-none"
          />
        </div>

        <div className="bg-zinc-900 p-4 border-l-4 border-[#FFD700]">
          <div className="flex justify-between text-[10px] mb-2 font-bold">
            <span className="text-gray-500 uppercase">Leopard Shipping:</span>
            <span>Rs. {shippingCost}</span>
          </div>
          <div className="flex justify-between items-center text-[#FFD700]">
            <span className="text-xs font-black uppercase">Net Profit:</span>
            <div className="text-right">
              <p className="text-2xl font-black italic leading-none">Rs. {netProfit}</p>
              <p className="text-[9px] font-bold text-green-500 mt-1 uppercase">{margin}% Margin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
