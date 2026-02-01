import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LoginPortal } from './LoginPortal';

export const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return <LoginPortal onLoginSuccess={() => setSession(supabase.auth.getSession())} />;
  }

  // Logged in: render admin UI
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-black text-white p-6 border-r-4 border-[#FFD700] flex flex-col">
        <h2 className="text-3xl font-black italic text-[#FFD700] mb-10">K11 HQ</h2>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-2xl font-black">Admin Panel Test</h1>
        <p>Welcome, you are logged in!</p>
      </main>
    </div>
  );
};
