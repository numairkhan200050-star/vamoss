// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LoginPortal } from './LoginPortal';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

export const AdminDashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check session on load
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    fetchSession();

    // Listen to login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <LayoutDashboard className="text-[#FFD700] animate-spin" size={50} />
    </div>
  );

  if (!session) return <LoginPortal onLoginSuccess={() => window.location.reload()} />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 border-r-4 border-[#FFD700] flex flex-col">
        <h2 className="text-3xl font-black italic text-[#FFD700] mb-10 tracking-tighter">K11 HQ</h2>

        <nav className="flex-grow space-y-2">
          <p className="text-gray-400 uppercase text-[10px] tracking-widest">Admin Menu</p>
        </nav>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            setSession(null);
          }}
          className="flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 font-black uppercase text-[10px] transition-colors mt-6"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
        <p>Main content will appear here once tabs are implemented.</p>
      </main>
    </div>
  );
};
