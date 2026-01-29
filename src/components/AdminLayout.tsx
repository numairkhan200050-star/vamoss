import React, { useState } from 'react';
import { AdminProductForm } from './AdminProductForm';
import { AdminOrderManager } from './AdminOrderManager';
import { LayoutDashboard, PackagePlus, ClipboardList, LogOut } from 'lucide-react';

export const AdminLayout = () => {
  // This state controls which "Room" you are in
  const [currentTab, setCurrentTab] = useState<'products' | 'orders'>('orders');

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* SIDEBAR NAVIGATION */}
      <div className="w-64 bg-black text-white p-6 flex flex-col border-r-4 border-[#FFD700]">
        <h2 className="text-2xl font-black italic mb-10 text-[#FFD700]">K11 ADMIN</h2>
        
        <nav className="space-y-4 flex-grow">
          <button 
            onClick={() => setCurrentTab('orders')}
            className={`w-full flex items-center gap-3 p-3 font-black uppercase text-xs tracking-widest transition-all ${currentTab === 'orders' ? 'bg-[#FFD700] text-black' : 'hover:bg-gray-900'}`}
          >
            <ClipboardList size={18} /> Manage Orders
          </button>

          <button 
            onClick={() => setCurrentTab('products')}
            className={`w-full flex items-center gap-3 p-3 font-black uppercase text-xs tracking-widest transition-all ${currentTab === 'products' ? 'bg-[#FFD700] text-black' : 'hover:bg-gray-900'}`}
          >
            <PackagePlus size={18} /> Add Products
          </button>
        </nav>

        <button className="flex items-center gap-3 p-3 text-gray-500 hover:text-white font-bold text-xs uppercase">
          <LogOut size={18} /> Exit Portal
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {currentTab === 'orders' ? (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase">Dispatch Center</h3>
                <p className="text-2xl font-black uppercase">Customer Orders</p>
              </div>
              <AdminOrderManager />
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase">Inventory</h3>
                <p className="text-2xl font-black uppercase">Add New Stock</p>
              </div>
              <AdminProductForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
