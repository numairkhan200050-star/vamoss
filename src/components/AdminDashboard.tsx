// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

// DEPARTMENT MANAGERS
import { AdminGeneralSettings } from './admin/AdminGeneralSettings';
import { AdminGallery } from './admin/AdminGallery';
import { CollectionSupervisor } from './admin/CollectionSupervisor'; 
import { PageSupervisor } from './admin/PageSupervisor'; 
import { ProductSupervisor } from './admin/ProductSupervisor';
import { OrderSupervisor } from './admin/OrderSupervisor'; 
import { ShippingRateManager } from './admin/shipping/ShippingRateManager'; // Linked to your Matrix file
import { LoginPortal } from './LoginPortal';

// ICONS
import { 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  Package, 
  FolderTree, 
  FileCode,
  ShieldCheck,
  Image as ImageIcon,
  ShoppingBag, 
  Truck 
} from 'lucide-react';

type AdminTab = 'general' | 'collections' | 'pages' | 'products' | 'gallery' | 'orders' | 'shipping';

export const AdminDashboard = () => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('orders'); // Default to Orders for quick access

  // --- AUTHENTICATION LOGIC ---
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      } catch (err) {
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <LayoutDashboard className="text-[#FFD700] animate-bounce mb-4" size={60} />
      <p style={comicSansBold} className="text-[#FFD700] animate-pulse uppercase tracking-widest">Waking up the Supervisors...</p>
    </div>
  );

  if (!session) return (
    <LoginPortal 
      onLoginSuccess={async () => {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      }} 
    />
  );

  return (
    <div className="flex min-h-screen bg-white">
      
      {/* SIDEBAR: THE COMMAND TOWER */}
      <aside className="w-72 bg-black text-white flex flex-col border-r-8 border-[#FFD700] shadow-[10px_0px_30px_rgba(0,0,0,0.5)]">
        <div className="p-8 border-b border-zinc-800 text-center">
          <h2 style={comicSansBold} className="text-4xl italic text-[#FFD700] tracking-tighter leading-none">
            K11<br/><span className="text-white text-xl uppercase tracking-widest text-sm">Headquarters</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-green-500 font-mono uppercase bg-green-500/10 px-2 py-1 rounded w-fit mx-auto">
            <ShieldCheck size={12} /> Secure
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4 overflow-y-auto">
          {/* OPERATIONAL TABS */}
          {[
            { id: 'orders', label: 'Order Center', icon: <ShoppingBag size={20} /> },
            { id: 'products', label: 'Products', icon: <Package size={20} /> },
            { id: 'collections', label: 'Collections', icon: <FolderTree size={20} /> },
            { id: 'shipping', label: 'Shipping Matrix', icon: <Truck size={20} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              style={comicSansBold}
              className={`w-full flex items-center gap-4 p-4 uppercase text-xs tracking-wider transition-all border-2 ${
                activeTab === tab.id 
                ? 'bg-[#FFD700] text-black border-black translate-x-2' 
                : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
              }`}
              onClick={() => setActiveTab(tab.id as AdminTab)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}

          {/* SITE MANAGEMENT */}
          <div className="pt-4 mt-4 border-t border-zinc-800 space-y-2">
            {[
              { id: 'general', label: 'General Settings', icon: <Settings size={20} /> },
              { id: 'gallery', label: 'Media Vault', icon: <ImageIcon size={20} /> },
              { id: 'pages', label: 'Custom Pages', icon: <FileCode size={20} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                style={comicSansBold}
                className={`w-full flex items-center gap-4 p-4 uppercase text-[10px] tracking-wider transition-all border-2 ${
                  activeTab === tab.id 
                  ? 'bg-[#FFD700] text-black border-black translate-x-2' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
                }`}
                onClick={() => setActiveTab(tab.id as AdminTab)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* EXIT */}
        <div className="p-4 border-t border-zinc-900">
          <button
            style={comicSansBold}
            onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase text-[10px]"
          >
            <LogOut size={18} /> Exit Headquarters
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="min-h-full">
          {activeTab === 'orders' && <OrderSupervisor />}
          {activeTab === 'products' && <ProductSupervisor />}
          {activeTab === 'collections' && <CollectionSupervisor />}
          {activeTab === 'shipping' && <ShippingRateManager />}
          {activeTab === 'general' && <AdminGeneralSettings />}
          {activeTab === 'gallery' && <AdminGallery isModal={false} />}
          {activeTab === 'pages' && <PageSupervisor />}
        </div>
      </main>
    </div>
  );
};
