import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Search, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

export const OrderArchive = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .or('status.eq.delivered,status.eq.cancelled')
      .order('updated_at', { ascending: false });

    if (data) setHistory(data);
    setLoading(false);
  };

  const filteredHistory = history.filter(h => 
    h.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* SEARCH & REFRESH */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search Archive by ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-4 border-black font-bold outline-none focus:bg-gray-50"
          />
        </div>
        <button onClick={fetchHistory} className="p-4 border-4 border-black bg-white hover:bg-black hover:text-white transition-all">
          <RotateCcw size={24} />
        </button>
      </div>

      {/* ARCHIVE TABLE */}
      <div className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-white text-[10px] uppercase">
            <tr>
              <th className="p-4">Tracking ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Final Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Completion Date</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-100">
            {filteredHistory.map((order) => (
              <tr key={order.id} className="opacity-70 hover:opacity-100">
                <td className="p-4 font-black">{order.tracking_id}</td>
                <td className="p-4 font-bold uppercase text-xs">{order.customer_name}</td>
                <td className="p-4 font-black text-xs text-green-700">Rs. {order.total_amount}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1 font-black text-[9px] uppercase">
                    {order.status === 'delivered' ? (
                      <><CheckCircle2 size={12} className="text-green-500" /> Delivered</>
                    ) : (
                      <><XCircle size={12} className="text-red-500" /> Cancelled</>
                    )}
                  </div>
                </td>
                <td className="p-4 text-right text-[10px] font-mono">
                  {new Date(order.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
