// src/components/admin/AdminShippingSettings.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface ShippingTier {
  id?: number;
  maxWeight: number; // grams
  rate: number; // price for this tier
}

export const AdminShippingSettings: React.FC = () => {
  const [tiers, setTiers] = useState<ShippingTier[]>([]);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch shipping settings from Supabase
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const { data: tierData } = await supabase.from("shipping_tiers").select("*");
        if (tierData) setTiers(tierData as ShippingTier[]);

        const { data: generalSettings } = await supabase
          .from("general_settings")
          .select("free_shipping_threshold")
          .single();

        if (generalSettings?.free_shipping_threshold)
          setFreeShippingThreshold(generalSettings.free_shipping_threshold);
      } catch (err) {
        console.error("Error fetching shipping settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const addTier = () => {
    setTiers([...tiers, { maxWeight: 500, rate: 0 }]);
  };

  const updateTier = (index: number, field: keyof ShippingTier, value: number) => {
    const updated = [...tiers];
    updated[index][field] = value;
    setTiers(updated);
  };

  const removeTier = (index: number) => {
    const updated = [...tiers];
    updated.splice(index, 1);
    setTiers(updated);
  };

  const saveSettings = async () => {
    try {
      // Clear old tiers and insert new
      await supabase.from("shipping_tiers").delete();
      if (tiers.length > 0) await supabase.from("shipping_tiers").insert(tiers);

      // Save free shipping threshold
      await supabase
        .from("general_settings")
        .upsert({ free_shipping_threshold: freeShippingThreshold }, { onConflict: ["id"] });

      alert("Shipping settings saved successfully!");
    } catch (err) {
      console.error("Error saving shipping settings:", err);
      alert("Failed to save shipping settings.");
    }
  };

  if (loading) return <p>Loading shipping settings...</p>;

  return (
    <div className="bg-white p-6 border-4 border-black space-y-6">
      <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2">
        Shipping Settings
      </h2>

      {/* Free Shipping Threshold */}
      <div className="flex items-center gap-2">
        <label className="font-bold text-xs uppercase">Free Shipping Above Amount:</label>
        <input
          type="number"
          value={freeShippingThreshold}
          onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
          className="p-2 border-2 border-black text-xs font-bold"
        />
      </div>

      {/* Shipping Tiers */}
      <div className="space-y-2">
        <h3 className="font-bold text-xs uppercase">Shipping Rate by Weight:</h3>
        {tiers.map((tier, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Max Weight (g)"
              value={tier.maxWeight}
              onChange={(e) => updateTier(i, "maxWeight", Number(e.target.value))}
              className="p-2 border-2 border-black text-xs font-bold w-24"
            />
            <input
              type="number"
              placeholder="Rate"
              value={tier.rate}
              onChange={(e) => updateTier(i, "rate", Number(e.target.value))}
              className="p-2 border-2 border-black text-xs font-bold w-24"
            />
            <button
              onClick={() => removeTier(i)}
              className="bg-red-500 text-white p-1 text-xs font-bold rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addTier}
          className="px-4 py-2 bg-[#FFD700] border-2 border-black font-black uppercase text-xs hover:bg-black hover:text-[#FFD700] transition-all"
        >
          + Add Tier
        </button>
      </div>

      <button
        onClick={saveSettings}
        className="px-4 py-2 bg-black border-2 border-[#FFD700] font-black uppercase text-xs text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all"
      >
        Save Settings
      </button>
    </div>
  );
};
