// src/components/admin/products/PricingProfit.tsx 
import React, { useEffect, useState } from 'react';
import { Calculator } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface PricingProfitProps {
  costPrice: number;
  sellingPrice: number;
  weight: number;
}

interface ShippingRate {
  id: string;
  weight_limit_grams: number;
  price: number;
}

export const PricingProfit: React.FC<PricingProfitProps> = ({
  costPrice,
  sellingPrice,
  weight,
}) => {

  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [margin, setMargin] = useState(0);

  /* FETCH SHIPPING */
  useEffect(() => {
    const fetchShipping = async () => {
      const { data } = await supabase
        .from('shipping_settings')
        .select('*')
        .order('weight_limit_grams', { ascending: true });

      if (data) setShippingRates(data);
    };

    fetchShipping();
  }, []);

  /* CALCULATE */
  useEffect(() => {

    const applicableRate =
      shippingRates.find(r => weight <= r.weight_limit_grams)?.price || 0;

    const profit = sellingPrice - costPrice - applicableRate;

    setShippingCost(applicableRate);
    setNetProfit(profit);

    const calculatedMargin =
      sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

    setMargin(Number(calculatedMargin.toFixed(1)));

  }, [costPrice, sellingPrice, weight, shippingRates]);

  return (
    <div className="bg-black text-white p-6 border-4 border-[#FFD700] sticky top-6">
      <h2 className="font-black uppercase mb-6 text-[#FFD700] flex items-center gap-2">
        <Calculator /> Profit Calculator
      </h2>

      <div className="bg-zinc-900 p-4 border-l-4 border-[#FFD700]">

        <div className="flex justify-between text-xs mb-2 font-bold">
          <span>Shipping Cost</span>
          <span>Rs. {shippingCost}</span>
        </div>

        <div className="flex justify-between text-[#FFD700]">
          <span className="font-black uppercase">Net Profit</span>
          <div className="text-right">
            <p className="text-2xl font-black">Rs. {netProfit}</p>
            <p className="text-[10px] text-green-500">{margin}% Margin</p>
          </div>
        </div>

      </div>
    </div>
  );
};
