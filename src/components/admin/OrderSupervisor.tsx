import React, { useState } from 'react';
import { OrderList } from './Order/OrderList';
import { OrderArchive } from './Order/OrderArchive';
import { ShoppingBag, Archive, TrendingUp } from 'lucide-react';

export const OrderSupervisor: React.FC = () => {
  const [tab, setTab] = useState<'active' | 'archive'>('active');

  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-8 border-black pb-8">
        <div>
          <h1 style={comicSansBold} className="text-5xl font-black uppercase italic leading-none">
            Order <span className="text-[#FFD700]">Command</span> Center
          </h1>
          <p className="text-sm font-bold uppercase tracking-tighter text-gray-400 mt-2">
            Shipments, Logistics & Historical Data Management
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex border-4 border-black p-1 bg-white">
          <button 
            onClick={() => setTab('active')}
            className={`flex items-center gap-2 px-6 py-2 font-black uppercase text-xs transition-all ${
              tab === 'active' ? 'bg-black text-[#FFD700]' : 'hover:bg-gray-100 text-black'
            }`}
          >
            <ShoppingBag size={16} /> Active Orders
          </button>
          <button 
            onClick={() => setTab('archive')}
            className={`flex items-center gap-2 px-6 py-2 font-black uppercase text-xs transition-all ${
              tab === 'archive' ? 'bg-black text-[#FFD700]' : 'hover:bg-gray-100 text-black'
            }`}
          >
            <Archive size={16} /> Archive
          </button>
        </div>
      </div>

      {/* QUICK STATS (Mockup) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-black uppercase text-blue-400">Processing</p>
          <p className="text-2xl font-black">24 Orders</p>
        </div>
        <div className="bg-green-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-black uppercase text-green-400">Out for Delivery</p>
          <p className="text-2xl font-black">12 Parcels</p>
        </div>
        <div className="bg-yellow-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-black uppercase text-yellow-600">Total Revenue</p>
          <p className="text-2xl font-black text-black">Rs. 84,200</p>
        </div>
      </div>

      {/* DYNAMIC CONTENT */}
      <div className="mt-8">
        {tab === 'active' ? <OrderList /> : <OrderArchive />}
      </div>
    </div>
  );
};
