import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Package, Truck, CheckCircle, XCircle, Filter, Search, ClipboardList } from 'lucide-react';

export const OrderList = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState('all'); // pending, packed, shipped
  const [loading, setLoading] = useState(true);

  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from('orders')
      .select('*')
      .neq('status', 'delivered') // Hide completed
      .neq('status', 'cancelled') // Hide cancelled
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    if (data) setOrders(data);
    setLoading(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) fetchOrders(); // Refresh list
  };

  return (
    <div className="space-y-6">
      {/* FILTER BAR */}
      <div className="bg-white border-4 border-black p-4 flex flex-wrap gap-4 items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4">
          <Filter size={20} />
          <div className="flex gap-2">
            {['all', 'pending', 'packed', 'shipped'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1 border-2 border-black text-[10px] font-black uppercase transition-all ${
                  filter === s ? 'bg-[#FFD700]' : 'hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] font-black uppercase bg-black text-white px-3 py-1 italic">
          Active Shipments: {orders.length}
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="border-4 border-black bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full text-left">
          <thead className="bg-black text-white text-[10px] uppercase tracking-widest">
            <tr>
              <th className="p-4">Order / ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Update Action</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-black">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-yellow-50">
                <td className="p-4">
                  <div className="font-black text-sm">{order.tracking_id}</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold italic">{new Date(order.created_at).toLocaleDateString()}</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-xs uppercase">{order.customer_name}</div>
                  <div className="text-[10px] font-mono">{order.phone}</div>
                </td>
                <td className="p-4">
                  <div className="font-black text-xs">Rs. {order.total_amount}</div>
                  <div className="text-[9px] text-gray-400">Incl. Shipping</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 border-2 border-black text-[9px] font-black uppercase ${
                    order.status === 'pending' ? 'bg-red-100' : 
                    order.status === 'packed' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {order.status === 'pending' && (
                      <button onClick={() => updateStatus(order.id, 'packed')} className="p-2 border-2 border-black bg-blue-400 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <Package size={16} />
                      </button>
                    )}
                    {order.status === 'packed' && (
                      <button onClick={() => updateStatus(order.id, 'shipped')} className="p-2 border-2 border-black bg-green-400 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <Truck size={16} />
                      </button>
                    )}
                    <button onClick={() => updateStatus(order.id, 'delivered')} className="p-2 border-2 border-black bg-[#FFD700] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-[9px] font-black">
                      COMPLETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && !loading && (
          <div className="p-10 text-center font-black uppercase text-gray-300 italic">No active orders in this category.</div>
        )}
      </div>
    </div>
  );
};
