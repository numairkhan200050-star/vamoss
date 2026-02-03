// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { LoginPortal } from './LoginPortal';
import { LogOut, LayoutDashboard, FileText, Box } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

type AdminTab = 'general' | 'collections' | 'pages';

export const AdminDashboard: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('general');

  // Simulate session check
  useEffect(() => {
    // Replace with real supabase auth logic later
    setTimeout(() => {
      setSession({} as Session); // mock session
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <LayoutDashboard className="text-[#FFD700] animate-spin" size={50} />
    </div>
  );

  if (!session) return <LoginPortal onLoginSuccess={() => setSession({} as Session)} />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 border-r-4 border-[#FFD700] flex flex-col">
        <h2 className="text-3xl font-black italic text-[#FFD700] mb-10 tracking-tighter">
          K11 HQ
        </h2>

        <nav className="flex-grow space-y-2">
          <button
            className={`w-full flex items-center gap-3 p-4 font-black uppercase text-[10px] tracking-widest transition-all ${
              activeTab === 'general' ? 'bg-[#FFD700] text-black' : 'hover:bg-zinc-900'
            }`}
            onClick={() => setActiveTab('general')}
          >
            <FileText size={18} /> General Settings
          </button>

          <button
            className={`w-full flex items-center gap-3 p-4 font-black uppercase text-[10px] tracking-widest transition-all ${
              activeTab === 'collections' ? 'bg-[#FFD700] text-black' : 'hover:bg-zinc-900'
            }`}
            onClick={() => setActiveTab('collections')}
          >
            <Box size={18} /> Collections
          </button>

          <button
            className={`w-full flex items-center gap-3 p-4 font-black uppercase text-[10px] tracking-widest transition-all ${
              activeTab === 'pages' ? 'bg-[#FFD700] text-black' : 'hover:bg-zinc-900'
            }`}
            onClick={() => setActiveTab('pages')}
          >
            <FileText size={18} /> Pages
          </button>
        </nav>

        <button
          onClick={() => setSession(null)}
          className="flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 font-black uppercase text-[10px] transition-colors mt-6"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'general' && <div>General Settings (Null)</div>}
        {activeTab === 'collections' && <div>Collections (Null)</div>}
        {activeTab === 'pages' && <div>Pages (Null)</div>}
      </main>
    </div>
  );
};
