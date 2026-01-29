import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LoginPortal } from './LoginPortal';
import { AdminOrderManager } from './AdminOrderManager';
import { AdminProductForm } from './AdminProductForm';
import { LayoutDashboard, PackagePlus, ClipboardList, LogOut, Loader2 } from 'lucide-react';

export const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Loader2 className="text-[#FFD700] animate-spin" size={40} />
    </div>
  );

  // If NOT logged in, show the gatekeeper
  if (!session) {
    return <LoginPortal onLoginSuccess={() => {}} />;
  }

  // If logged in, show the Admin Workspace
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6 border-r-4 border-[#FFD700] flex flex-col">
        <h2 className="text-3xl font-black italic text-[#FFD700] mb-10 tracking-tighter">K11 HQ</h2>
        
        <nav className="space-y-2 flex-grow">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 p-4 font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'orders' ? 'bg-[#FFD700] text-black' : 'hover:bg-zinc-900'}`}
          >
            <ClipboardList size={18} /> Orders & Tracking
          </button>
          
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 p-4 font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'products' ? 'bg-[#FFD700] text-black' : 'hover:bg-zinc-900'}`}
          >
            <PackagePlus size={18} /> Inventory Management
          </button>
        </nav>

        <button 
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 font-black uppercase text-[10px] transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* WORK AREA */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'orders' ? <AdminOrderManager /> : <AdminProductForm />}
      </main>
    </div>
  );
};
