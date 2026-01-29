import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Package, Truck, CheckCircle, Clock, ExternalLink, Search } from 'lucide-react';

export const AdminOrderManager = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      alert(`Order updated to ${newStatus}`);
      fetchOrders(); // Refresh list
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'shipped': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Order Dispatch</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Tracking ID..." 
              className="pl-10 pr-4 py-2 border-4 border-black font-bold uppercase text-xs outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center font-black uppercase animate-bounce">Loading Orders...</p>
        ) : (
          <div className="space-y-4">
            {orders.filter(o => o.tracking_id.includes(searchTerm)).map((order) => (
              <div key={order.id} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-black text-xl italic">{order.tracking_id}</span>
                      <span className={`px-3 py-1 border-2 text-[10px] font-black uppercase ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold uppercase">{order.customer_name}</p>
                    <p className="text-xs text-gray-500">{order.address}, {order.city}</p>
                    <p className="text-xs font-black mt-2 text-blue-600">📞 {order.phone}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="font-black text-lg">Rs. {order.total_price}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateStatus(order.id, 'shipped')}
                        className="p-2 border-2 border-black hover:bg-blue-500 hover:text-white transition-all" title="Mark Shipped">
                        <Truck size={16} />
                      </button>
                      <button 
                        onClick={() => updateStatus(order.id, 'delivered')}
                        className="p-2 border-2 border-black hover:bg-green-500 hover:text-white transition-all" title="Mark Delivered">
                        <CheckCircle size={16} />
                      </button>
                      <a 
                        href={`https://wa.me/${order.phone.replace(/^0/, '92')}`} 
                        target="_blank" 
                        className="p-2 border-2 border-black hover:bg-[#25D366] hover:text-white transition-all">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
