// src/components/admin/collections/CollectionViewer.tsx
import React, { useState } from 'react';
import { 
  FolderTree, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface CollectionSummary {
  id: string;
  name: string;
  count: number;
  lastUpdated: string;
  thumbnail?: string;
}

interface CollectionViewerProps {
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onAssign: (id: string) => void;
}

export const CollectionViewer = ({ onAddNew, onEdit, onAssign }: CollectionViewerProps) => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  // --- NOTE 9: MOCK DATA (Will be replaced by Supabase Collections fetch) ---
  const [collections] = useState<CollectionSummary[]>([
    { id: 'c1', name: 'Summer 2024', count: 12, lastUpdated: '2 hours ago', thumbnail: 'https://via.placeholder.com/150' },
    { id: 'c2', name: 'Premium Leather', count: 5, lastUpdated: '1 day ago' },
  ]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-8 border-black pb-6 gap-4">
        <div>
          <h1 style={comicSansBold} className="text-5xl uppercase italic tracking-tighter text-black flex items-center gap-4">
            <FolderTree className="text-[#FFD700]" size={48} strokeWidth={2.5} />
            The Vault
          </h1>
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] mt-2">
            Viewing {collections.length} Active Collections
          </p>
        </div>
        
        <button 
          onClick={onAddNew}
          style={comicSansBold}
          className="bg-[#FFD700] text-black border-4 border-black px-8 py-4 flex items-center gap-3 hover:bg-black hover:text-[#FFD700] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none uppercase tracking-widest text-sm"
        >
          <Plus size={20} /> Create New Set
        </button>
      </div>

      {/* COLLECTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((col) => (
          <div 
            key={col.id} 
            className="group bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[15px_15px_0px_0px_rgba(255,215,0,1)] transition-all flex flex-col"
          >
            {/* CARD HEADER */}
            <div className="p-6 border-b-4 border-black bg-black text-white flex justify-between items-center">
              <span className="bg-[#FFD700] text-black px-2 py-1 text-[10px] font-black uppercase italic">
                {col.count} Items
              </span>
              <p className="text-[10px] font-bold text-gray-500 uppercase">{col.lastUpdated}</p>
            </div>

            {/* CARD CONTENT */}
            <div className="p-6 flex-grow flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 border-2 border-black flex items-center justify-center shrink-0">
                <Layers size={24} className="text-gray-300" />
              </div>
              <h3 style={comicSansBold} className="text-2xl uppercase italic truncate leading-none">
                {col.name}
              </h3>
            </div>

            {/* CARD ACTIONS */}
            <div className="grid grid-cols-3 border-t-4 border-black">
              <button 
                onClick={() => onEdit(col.id)}
                className="py-4 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 border-r-4 border-black transition-colors"
              >
                <Edit3 size={18} />
                <span className="text-[9px] font-black uppercase">Edit</span>
              </button>
              
              <button 
                onClick={() => onAssign(col.id)}
                className="py-4 flex flex-col items-center justify-center gap-1 hover:bg-[#FFD700] border-r-4 border-black transition-colors"
              >
                <ArrowRight size={18} />
                <span className="text-[9px] font-black uppercase">Link</span>
              </button>

              <button 
                className="py-4 flex flex-col items-center justify-center gap-1 hover:bg-red-500 hover:text-white transition-colors"
              >
                <Trash2 size={18} />
                <span className="text-[9px] font-black uppercase text-red-500 group-hover:text-white">Burn</span>
              </button>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {collections.length === 0 && (
          <div className="col-span-full py-32 border-8 border-dashed border-gray-100 flex flex-col items-center justify-center opacity-30">
            <FolderTree size={80} />
            <p style={comicSansBold} className="text-3xl uppercase italic mt-4">Vault is Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};
