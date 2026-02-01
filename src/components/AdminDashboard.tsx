import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { LoginPortal } from './LoginPortal';
import { AdminGeneralSettings } from './admin/AdminGeneralSettings';
import CollectionList from './admin/collections/CollectionList';
import PagesList from './admin/pages/PagesList';
import { LogOut, LayoutDashboard, FileText, Box } from 'lucide-react';

type AdminTab = 'general' | 'collections' | 'pages';

export const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('general');

  // Check session on load
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    fetchSession();

    // Listen to login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loader while checking session
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <LayoutDashboard className="text-[#FFD700] animate-spin" size={50} />
    </div>
  );

  // If not logged in
  if (!session) return <LoginPortal onLoginSuccess={() => {}} />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 border-r-4 border-[#FFD700] flex flex-col">
        <h2 className="text-3xl font-black italic text-[#FFD700] mb-10 tracking-tighter">K11 HQ</h2>

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
