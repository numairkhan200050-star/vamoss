import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, User, ArrowRight, ShieldAlert } from 'lucide-react';

export const LoginPortal = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Invalid Credentials. Access Denied.');
      setLoading(false);
    } else {
      onLoginSuccess(); // This will "unlock" the AdminLayout for you
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* LOGO AREA */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black italic tracking-tighter text-[#FFD700] mb-2">K11</h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Secure Admin Access Only</p>
        </div>

        <div className="bg-white border-[6px] border-[#FFD700] p-8 shadow-[20px_20px_0px_0px_rgba(255,215,0,0.1)]">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-500 p-3 flex items-center gap-3 text-red-600 text-xs font-bold uppercase">
                <ShieldAlert size={18} /> {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase mb-2">Admin Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-black p-3 pl-10 font-bold outline-none focus:bg-white"
                  placeholder="admin@kevin11.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase mb-2">Secret Key</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-black p-3 pl-10 font-bold outline-none focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-black text-[#FFD700] py-4 font-black uppercase italic text-lg flex items-center justify-center gap-3 hover:bg-[#FFD700] hover:text-black transition-all group"
            >
              {loading ? "Verifying..." : (
                <>Enter Dashboard <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>
              )}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-gray-600 text-[9px] font-bold uppercase">
          Authorized Personnel Only • IP Address Logged
        </p>
      </div>
    </div>
  );
};
