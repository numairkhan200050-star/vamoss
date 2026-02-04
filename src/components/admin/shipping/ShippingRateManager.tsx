// src/components/admin/shipping/ShippingRateManager.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase'; // Ensure path is correct
import { 
  Truck, Trash2, Gift, Save, Plus, Loader2 
} from 'lucide-react';

export const ShippingRateManager = () => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const [brackets, setBrackets] = useState<any[]>([]);
  const [freeThreshold, setFreeThreshold] = useState<number>(5000);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Fetch Data from Supabase on Load
  useEffect(() => {
    fetchShippingData();
  }, []);

  const fetchShippingData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('shipping_rates')
      .select('*')
      .order('max_weight_grams', { ascending: true });

    if (data && data.length > 0) {
      setBrackets(data);
      // Assuming free_threshold is the same for all rows, take the first one
      setFreeThreshold(data[0].free_threshold_pkr || 5000);
    }
    setLoading(false);
  };

  // 2. Add New Row (Local State)
  const addRow = () => {
    const newRow = { 
      id: crypto.randomUUID(), 
      max_weight_grams: 0, 
      charge_pkr: 0, 
      free_threshold_pkr: freeThreshold 
    };
    setBrackets([...brackets, newRow]);
  };

  // 3. Delete Row
  const removeRow = async (id: string) => {
    if (typeof id === 'string' && id.length > 30) { // Check if it's a real UUID (from DB)
       await supabase.from('shipping_rates').delete().eq('id', id);
    }
    setBrackets(brackets.filter(b => b.id !== id));
  };

  // 4. Update Local State
  const updateRow = (id: string, field: string, value: number) => {
    setBrackets(brackets.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  // 5. SAVE ALL TO SUPABASE
  const saveAll = async () => {
    setSaving(true);
    
    // First, clear old rates (simplest way to sync a matrix)
    await supabase.rpc('delete_all_shipping_rates'); // Or handle upsert logic
    // OR just upsert:
    const cleanBrackets = brackets.map(({ id, ...rest }) => ({
      ...rest,
      free_threshold_pkr: freeThreshold // Sync the threshold to all rows
    }));

    const { error } = await supabase
      .from('shipping_rates')
      .upsert(cleanBrackets);

    if (!error) {
      alert("Shipping Matrix Updated!");
      fetchShippingData();
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-center uppercase font-black">Loading Matrix...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
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
              Logistics Control / Note 11 (Supabase Live)
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black p-4 flex justify-between items-center">
              <span style={comicSansBold} className="text-[#FFD700] uppercase text-sm tracking-widest">Weight Brackets</span>
              <button onClick={addRow} className="bg-[#FFD700] text-black px-4 py-1 text-xs font-black uppercase border-2 border-black hover:translate-y-[-2px] transition-all flex items-center gap-2">
                <Plus size={14} /> Add Row
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
                        value={b.max_weight_grams}
                        onChange={(e) => updateRow(b.id, 'max_weight_grams', Number(e.target.value))}
                        className="w-full p-2 border-2 border-black font-bold outline-none focus:bg-yellow-50" 
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="number" 
                        value={b.charge_pkr}
                        onChange={(e) => updateRow(b.id, 'charge_pkr', Number(e.target.value))}
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

        <div className="space-y-6">
          <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(255,215,0,1)]">
            <h3 style={comicSansBold} className="uppercase text-lg mb-4 flex items-center gap-2">
              <Gift size={20} className="text-blue-600" /> Free Delivery
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">Order Threshold (PKR)</label>
              <input 
                type="number"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(Number(e.target.value))}
                className="w-full p-4 border-4 border-black text-2xl font-black outline-none"
              />
            </div>
          </div>

          <button 
            style={comicSansBold}
            disabled={saving}
            onClick={saveAll}
            className="w-full bg-black text-[#FFD700] py-6 uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-3px] transition-all border-2 border-[#FFD700] flex items-center justify-center gap-3"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {saving ? 'Saving...' : 'Save Matrix'}
          </button>
        </div>
      </div>
    </div>
  );
};
