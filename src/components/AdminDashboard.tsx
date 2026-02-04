// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

// DEPARTMENT MANAGERS
import { AdminGeneralSettings } from './admin/AdminGeneralSettings';
import { AdminGallery } from './admin/AdminGallery';
import { CollectionSupervisor } from './admin/CollectionSupervisor'; 
import { PageSupervisor } from './admin/PageSupervisor'; 
import { ProductSupervisor } from './admin/ProductSupervisor'; // NEW: Imported your Product Brain
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
  Image as ImageIcon 
} from 'lucide-react';

type AdminTab = 'general' | 'collections' | 'pages' | 'products' | 'gallery';

export const AdminDashboard = () => {
  // STYLES
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('general');

  // --- AUTHENTICATION LOGIC ---
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      } catch (err) {
        console.error('HQ Auth Error:', err);
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

  // --- LOADING STATE ---
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <LayoutDashboard className="text-[#FFD700] animate-bounce mb-4" size={60} />
      <p style={comicSansBold} className="text-[#FFD700] animate-pulse uppercase tracking-widest">Waking up the Supervisors...</p>
    </div>
  );

  // --- LOGIN GUARD ---
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
        <div className="p-8 border-b border-zinc-800">
          <h2 style={comicSansBold} className="text-4xl italic text-[#FFD700] tracking-tighter leading-none">
            K11<br/><span className="text-white text-xl uppercase tracking-widest">Admin</span>
          </h2>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-green-500 font-mono uppercase bg-green-500/10 px-2 py-1 rounded w-fit">
            <ShieldCheck size={12} /> Secure Access Active
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-3 mt-6">
          <button
            style={comicSansBold}
            className={`w-full flex items-center gap-4 p-4 uppercase text-xs tracking-wider transition-all border-2 ${
              activeTab === 'general' 
              ? 'bg-[#FFD700] text-black border-black translate-x-2' 
              : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
            onClick={() => setActiveTab('general')}
          >
            <Settings size={20} /> General Settings
          </button>

          <button
            style={comicSansBold}
            className={`w-full flex items-center gap-4 p-4 uppercase text-xs tracking-wider transition-all border-2 ${
              activeTab === 'gallery' 
              ? 'bg-[#FFD700] text-black border-black translate-x-2' 
              : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
            onClick={() => setActiveTab('gallery')}
          >
            <ImageIcon size={20} /> Media Vault
          </button>

          <button
            style={comicSansBold}
            className={`w-full flex items-center gap-4 p-4 uppercase text-xs tracking-wider transition-all border-2 ${
              activeTab === 'collections' 
              ? 'bg-[#FFD700] text-black border-black translate-x-2' 
              : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
            onClick={() => setActiveTab('collections')}
          >
            <FolderTree size={20} /> Collections
          </button>

          <button
            style={comicSansBold}
            className={`w-full flex items-center gap-4 p-4 uppercase text-xs tracking-wider transition-all border-2 ${
              activeTab === 'products' 
              ? 'bg-[#FFD700] text-black border-black translate-x-2' 
              : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} /> Products
          </button>

          <button
            style={comicSansBold}
            className={`w-full flex items-center gap-4 p-4 uppercase text-xs tracking-wider transition-all border-2 ${
              activeTab === 'pages' 
              ? 'bg-[#FFD700] text-black border-black translate-x-2' 
              : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
            onClick={() => setActiveTab('pages')}
          >
            <FileCode size={20} /> Custom Pages
          </button>
        </nav>

        {/* LOGOUT AREA */}
        <div className="p-4 border-t border-zinc-900">
          <button
            style={comicSansBold}
            onClick={async () => {
              await supabase.auth.signOut();
              setSession(null);
            }}
            className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase text-[10px]"
          >
            <LogOut size={18} /> Exit Headquarters
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="min-h-full">
          {activeTab === 'general' && <AdminGeneralSettings />}
          
          {/* Standalone mode: isModal is false by default */}
          {activeTab === 'gallery' && <AdminGallery isModal={false} />}

          {activeTab === 'collections' && <CollectionSupervisor />}

          {/* NEW PRODUCT SUPERVISOR INTEGRATION */}
          {activeTab === 'products' && <ProductSupervisor />}

          {activeTab === 'pages' && <PageSupervisor />}
        </div>
      </main>
    </div>
  );
};
