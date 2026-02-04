// src/pages/TrackOrder.tsx
import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Search, Package, MapPin, Truck, CheckCircle2 } from 'lucide-react';

export const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`*, order_items(*)`)
      .eq('tracking_id', trackingId.toUpperCase())
      .single();

    if (error || !data) {
      alert("Order not found. Please check your ID.");
      setOrder(null);
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-8 border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-black uppercase italic mb-2">Track Your Parcel</h2>
          <p className="text-xs font-bold text-gray-500 mb-8 uppercase tracking-widest">Enter your K11 tracking number</p>
          
          <div className="flex gap-4 mb-10">
            <input 
              type="text" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. K11-XXXX"
              className="flex-1 p-5 border-4 border-black font-black text-xl uppercase outline-none focus:bg-yellow-50"
            />
            <button 
              onClick={handleTrack}
              disabled={loading}
              className="bg-black text-[#FFD700] px-8 border-4 border-black hover:bg-[#FFD700] hover:text-black transition-all"
            >
              <Search size={32} />
            </button>
          </div>

          {order && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              {/* STATUS BAR */}
              <div className="relative flex justify-between before:content-[''] before:absolute before:top-1/2 before:w-full before:h-1 before:bg-gray-200 before:-z-10">
                {['pending', 'packed', 'shipped', 'delivered'].map((step, idx) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-4 border-black flex items-center justify-center bg-white ${
                      order.status === step || idx < ['pending', 'packed', 'shipped', 'delivered'].indexOf(order.status) 
                      ? 'bg-[#FFD700]' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {idx === 3 ? <CheckCircle2 size={18}/> : <Package size={18}/>}
                    </div>
                    <span className="text-[10px] font-black uppercase mt-2">{step}</span>
                  </div>
                ))}
              </div>

              {/* ORDER DETAILS CARD */}
              <div className="border-4 border-black p-6 space-y-4 bg-zinc-50">
                <div className="flex justify-between border-b-2 border-black pb-2">
                  <span className="font-black uppercase text-sm">Order Status:</span>
                  <span className="font-black text-blue-600 uppercase italic underline">{order.status}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Customer Name</p>
                    <p className="font-black uppercase">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Estimated Delivery</p>
                    <p className="font-black uppercase">{order.delivery_date || 'Processing...'}</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-black p-4 flex gap-4 items-center">
                   <MapPin className="text-red-500" />
                   <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase">Shipping Address</p>
                     <p className="font-bold text-xs">{order.address}, {order.city}</p>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
