// src/components/admin/AdminReviewSettings.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Star, Eye, EyeOff, Loader2 } from 'lucide-react';

const AdminReviewSettings = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [loading, setLoading] = useState(false);

  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (data) setReviews(data);
  };

  const addReview = async () => {
    if (!newName || !newText) return alert("Fill all fields");
    setLoading(true);
    await supabase.from('reviews').insert([{ 
      name: newName, 
      text: newText, 
      rating: 5,
      is_visible: true 
    }]);
    setNewName(''); setNewText('');
    await fetchReviews();
    setLoading(false);
  };

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    await supabase.from('reviews').update({ is_visible: !currentStatus }).eq('id', id);
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    if (window.confirm("K11 Command: Delete this review forever?")) {
      await supabase.from('reviews').delete().eq('id', id);
      fetchReviews();
    }
  };

  return (
    <div className="space-y-6">
      {/* ADD SECTION */}
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 style={comicSansBold} className="text-xl uppercase italic mb-4 text-black">Manual Review Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border-2 border-black p-3 outline-none font-bold focus:bg-yellow-50" placeholder="Customer Name" value={newName} onChange={(e)=>setNewName(e.target.value)} />
          <input className="border-2 border-black p-3 outline-none font-bold focus:bg-yellow-50" placeholder="Review Text" value={newText} onChange={(e)=>setNewText(e.target.value)} />
        </div>
        <button 
          onClick={addReview} 
          disabled={loading}
          className="mt-4 bg-black text-[#FFD700] px-8 py-3 font-black uppercase flex items-center gap-2 hover:scale-95 transition-transform"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} 
          Deploy Review
        </button>
      </div>

      {/* LIST SECTION */}
      <div className="grid gap-4">
        {reviews.map(r => (
          <div key={r.id} className={`bg-white border-2 border-black p-4 flex justify-between items-center shadow-[4px_4px_0px_black] ${!r.is_visible ? 'opacity-50 bg-gray-100' : ''}`}>
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="black" />)}
              </div>
              <p className="font-black uppercase text-sm flex items-center gap-2">
                {r.name} {!r.is_visible && <span className="text-[8px] bg-black text-white px-1">HIDDEN</span>}
              </p>
              <p className="text-gray-600 italic text-sm">"{r.text}"</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => toggleVisibility(r.id, r.is_visible)} 
                className="p-2 border-2 border-black hover:bg-[#FFD700] transition-colors"
                title={r.is_visible ? "Hide Review" : "Show Review"}
              >
                {r.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button onClick={() => deleteReview(r.id)} className="text-red-500 border-2 border-transparent hover:border-red-500 p-2 transition-all">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviewSettings;
