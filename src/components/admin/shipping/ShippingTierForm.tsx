// src/components/admin/shipping/ShippingTierForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export interface ShippingTier {
  id?: number;
  max_weight_grams: number; // Maximum weight for this tier
  rate: number; // Shipping cost
}

export const ShippingTierForm: React.FC = () => {
  const [tiers, setTiers] = useState<ShippingTier[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [maxWeight, setMaxWeight] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch tiers
  const fetchTiers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("shipping_tiers")
      .select("*")
      .order("max_weight_grams", { ascending: true });
    if (error) console.error("Error fetching tiers:", error);
    else setTiers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  // Add or update tier
  const handleSave = async () => {
    if (editId) {
      // Update
      const { error } = await supabase
        .from("shipping_tiers")
        .update({ max_weight_grams: maxWeight, rate })
        .eq("id", editId);
      if (error) console.error(error);
    } else {
      // Insert new
      const { error } = await supabase
        .from("shipping_tiers")
        .insert([{ max_weight_grams: maxWeight, rate }]);
      if (error) console.error(error);
    }
    setMaxWeight(0);
    setRate(0);
    setEditId(null);
    fetchTiers();
  };

  const handleEdit = (tier: ShippingTier) => {
    setMaxWeight(tier.max_weight_grams);
    setRate(tier.rate);
    setEditId(tier.id || null);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    const { error } = await supabase.from("shipping_tiers").delete().eq("id", id);
    if (error) console.error(error);
    fetchTiers();
  };

  if (loading) return <p>Loading shipping tiers...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Shipping Tier Setup</h2>

      {/* Form */}
      <div className="flex gap-4 items-center">
        <input
          type="number"
          placeholder="Max Weight (grams)"
          value={maxWeight}
          onChange={(e) => setMaxWeight(Number(e.target.value))}
          className="border p-2 rounded w-40"
        />
        <input
          type="number"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="border p-2 rounded w-40"
        />
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Tier" : "Add Tier"}
        </button>
      </div>

      {/* Tier List */}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Max Weight (g)</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.id}>
              <td className="border p-2">{tier.max_weight_grams}</td>
              <td className="border p-2">{tier.rate}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(tier)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tier.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {tiers.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-2">
                No tiers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
