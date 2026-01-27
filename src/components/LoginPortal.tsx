import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Lock, Mail } from 'lucide-react';

export const LoginPortal = ({ isOpen, onClose }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.reload(); // Refresh to show admin state
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-white w-full max-w-md p-10 relative border-t-8 border-[#D4AF37] shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-black hover:text-[#D4AF37]"><X /></button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Admin <span className="text-[#D4AF37]">Access</span></h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-0 top-3 text-gray-400" size={18} />
            <input 
              required type="email" placeholder="Email Address" 
              className="w-full border-b-2 border-gray-100 p-3 pl-8 outline-none focus:border-[#D4AF37] font-bold text-sm"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-0 top-3 text-gray-400" size={18} />
            <input 
              required type="password" placeholder="Password" 
              className="w-full border-b-2 border-gray-100 p-3 pl-8 outline-none focus:border-[#D4AF37] font-bold text-sm"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight">{error}</p>}

          <button 
            disabled={loading}
            className="w-full bg-black text-[#D4AF37] font-black py-4 uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};
