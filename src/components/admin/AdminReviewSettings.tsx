// src/components/admin/AdminReviewSettings.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Star } from 'lucide-react';

const AdminReviewSettings = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (data) setReviews(data);
  };

  const addReview = async () => {
    if (!newName || !newText) return alert("Fill all fields");
    await supabase.from('reviews').insert([{ name: newName, text: newText, rating: 5 }]);
    setNewName(''); setNewText('');
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    if (window.confirm("Delete this review?")) {
      await supabase.from('reviews').delete().eq('id', id);
      fetchReviews();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 style={comicSansBold} className="text-xl uppercase italic mb-4">Add New Review</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border-2 border-black p-2 outline-none font-bold" placeholder="Customer Name" value={newName} onChange={(e)=>setNewName(e.target.value)} />
          <input className="border-2 border-black p-2 outline-none font-bold" placeholder="Review Text" value={newText} onChange={(e)=>setNewText(e.target.value)} />
        </div>
        <button onClick={addReview} className="mt-4 bg-black text-[#FFD700] px-6 py-2 font-black uppercase flex items-center gap-2">
          <Plus size={18} /> Add Review
        </button>
      </div>

      <div className="grid gap-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white border-2 border-black p-4 flex justify-between items-center">
            <div>
              <p className="font-black uppercase text-sm">{r.name}</p>
              <p className="text-gray-600 italic text-sm">"{r.text}"</p>
            </div>
            <button onClick={() => deleteReview(r.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviewSettings;
