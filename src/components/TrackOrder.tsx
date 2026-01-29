import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Package, MapPin } from 'lucide-react';

export const TrackOrder = () => {
  const [id, setId] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleTrack = async () => {
    const { data } = await supabase.from('orders').select('*').eq('tracking_id', id).single();
    if (data) setResult(data);
    else alert("Invalid Tracking ID");
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white font-sans">
      <h2 className="text-3xl font-black uppercase italic mb-6">Track Parcel</h2>
      <div className="relative mb-6">
        <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID (e.g. K11-9283)" 
          className="w-full p-4 border-4 border-black font-black uppercase outline-none"
        />
        <button onClick={handleTrack} className="absolute right-4 top-1/2 -translate-y-1/2">
          <Search size={24} />
        </button>
      </div>

      {result && (
        <div className="space-y-4 border-t-4 border-black pt-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-gray-400">Status:</span>
            <span className="bg-black text-[#FFD700] px-4 py-1 text-xs font-black uppercase italic">{result.status}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full"><Package size={20}/></div>
            <div>
               <p className="text-[10px] font-black uppercase text-gray-400 leading-none">Customer</p>
               <p className="font-bold uppercase">{result.customer_name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
