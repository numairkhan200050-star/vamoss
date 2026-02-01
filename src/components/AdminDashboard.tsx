import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LoginPortal } from './LoginPortal';
import { AdminOrderManager } from './AdminOrderManager';
import { AdminProductForm } from './AdminProductForm';
import { ClipboardList, PackagePlus, LogOut, Loader2, Settings } from 'lucide-react';

/* ---------------- FOMO SETTINGS (ADMIN – SIMPLE, SINGLE FILE) ---------------- */

const AdminFomoSettings = () => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('LIMITED TIME DEALS');
  const [buttonText, setButtonText] = useState('SHOP NOW');
  const [linkType, setLinkType] = useState('collection');
  const [linkTarget, setLinkTarget] = useState('');

  const saveFomo = () => {
    alert('FOMO settings saved (logic connected later)');
  };

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">FOMO Settings</h2>

      <label className="flex items-center gap-2 mb-4">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
        Enable FOMO
      </label>

      <div className="mb-4">
        <label>FOMO Text</label>
        <input className="w-full border p-2"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label>Button Text</label>
        <input className="w-full border p-2"
          value={buttonText}
          onChange={e => setButtonText(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label>Button Link Type</label>
        <select className="w-full border p-2"
          value={linkType}
          onChange={e => setLinkType(e.target.value)}
        >
          <option value="page">Page</option>
          <option value="collection">Collection</option>
          <option value="category">Category</option>
        </select>
      </div>

      <div className="mb-6">
        <label>Link Target (ID)</label>
        <input className="w-full border p-2"
          placeholder="Will be dropdown later"
          value={linkTarget}
          onChange={e => setLinkTarget(e.target.value)}
        />
      </div>

      <button
        onClick={saveFomo}
        className="bg-black text-white px-6 py-2 font-black"
      >
        Save FOMO
      </button>
    </div>
  );
};

/* ---------------- ADMIN DASHBOARD ---------------- */

export const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] =
    useState<'orders' | 'products' | 'fomo'>('orders');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Loader2 className="text-[#FFD700] animate-spin" size={40} />
      </div>
    );
  }

  if (!session) {
    return <LoginPortal onLoginSuccess={() => {}} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6 border-r-4 border-[#FFD700] flex flex-col">
        <h2 className="text-3xl font-black italic text-[#FFD700] mb-10">
          K11 HQ
        </h2>

        <nav className="space-y-2 flex-grow">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 p-4 font-black uppercase text-[10px]
            ${activeTab === 'orders' ? 'bg-[#FFD700] text-black' : 'hover:bg-zinc-900'}`}
          >
            <ClipboardList size={18} /> Orders & Tracking
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 p-4 font-black uppercase text-[10px]
            ${activeTab === 'products' ? 'bg-[#FFD700] text-black' : 'hover:bg-zinc-900'}`}
          >
            <PackagePlus size={18} /> Inventory
          </button>

          <button
            onClick={() => setActiveTab('fomo')}
            className={`w-full flex items-center gap-3 p-4 font-black uppercase text-[10px]
            ${activeTab === 'fomo' ? 'bg-[#FFD700] text-black' : 'hover:bg-zinc-900'}`}
          >
            <Settings size={18} /> General → FOMO
          </button>
        </nav>

        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 font-black uppercase text-[10px]"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'orders' && <AdminOrderManager />}
        {activeTab === 'products' && <AdminProductForm />}
        {activeTab === 'fomo' && <AdminFomoSettings />}
      </main>
    </div>
  );
};
