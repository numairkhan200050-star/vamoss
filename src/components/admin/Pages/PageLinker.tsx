// src/components/admin/Pages/PageLinker.tsx
import React, { useState } from 'react';
import { 
  Link, 
  X, 
  Layers, 
  FolderTree, 
  CheckCircle2, 
  ChevronRight, 
  Zap,
  Layout,
  Share2
} from 'lucide-react';

interface LinkableItem {
  id: string;
  name: string;
  type: 'category' | 'collection';
}

interface PageLinkerProps {
  pageId: string | null;
  onSave: (links: string[]) => void;
  onCancel: () => void;
}

export const PageLinker = ({ pageId, onSave, onCancel }: PageLinkerProps) => {
  // TYPOGRAPHY
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansNormal = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };
  
  // --- STATE ---
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

  // --- MOCK DATA ---
  const linkVault: LinkableItem[] = [
    { id: 'cat1', name: 'Summer Essentials', type: 'category' },
    { id: 'cat2', name: 'Limited Drops', type: 'category' },
    { id: 'col1', name: 'Vintage 90s Set', type: 'collection' },
    { id: 'col2', name: 'Winter Puffer Series', type: 'collection' },
  ];

  const toggleLink = (id: string) => {
    setSelectedLinks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleFinalDeployment = () => {
    if (selectedLinks.length === 0) return alert("Select at least one anchor point!");
    onSave(selectedLinks);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* HEADER: GLASS STYLE */}
      <div className="flex justify-between items-center pb-8 mb-8 border-b border-slate-200/50">
        <div className="flex items-center gap-5">
          <div className="bg-indigo-500/10 p-4 rounded-2xl text-indigo-600 backdrop-blur-xl border border-indigo-200/50">
            <Share2 size={28} />
          </div>
          <div>
            <h2 style={comicSansBold} className="text-3xl italic tracking-tight leading-none">Node Linker</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1 font-bold">
              Establishing Navigation Anchors
            </p>
          </div>
        </div>
        <button 
          onClick={onCancel} 
          className="hover:bg-slate-100 p-3 rounded-full transition-colors text-slate-400"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <label style={comicSansBold} className="block uppercase text-[10px] tracking-[0.2em] text-slate-400 ml-2 flex items-center gap-2">
          <Zap size={14} className="text-yellow-500 fill-yellow-500" /> Connection Targets
        </label>

        {/* LIST OF ANCHORS */}
        <div className="grid grid-cols-1 gap-3">
          {linkVault.map((item) => {
            const isSelected = selectedLinks.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleLink(item.id)}
                className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border ${
                  isSelected 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200 -translate-y-1' 
                  : 'bg-white/40 backdrop-blur-md border-white/60 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {item.type === 'category' ? <Layout size={20} /> : <FolderTree size={20} />}
                  </div>
                  <div className="text-left">
                    <p style={comicSansBold} className="uppercase text-sm tracking-tight leading-none">{item.name}</p>
                    <p className={`text-[9px] uppercase font-bold mt-1 opacity-60`}>
                      {item.type}
                    </p>
                  </div>
                </div>
                
                {isSelected ? (
                  <div className="bg-green-400 p-1 rounded-full text-white">
                    <CheckCircle2 size={20} />
                  </div>
                ) : (
                  <ChevronRight size={20} className="text-slate-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTION: GLASS PANEL */}
      <div className="mt-10 p-8 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Links</span>
            <span style={comicSansBold} className="text-5xl text-slate-800 tabular-nums">
              {selectedLinks.length}
            </span>
          </div>
          <div className="h-10 w-[1px] bg-slate-200 hidden sm:block" />
          <p className="text-[11px] text-slate-400 max-w-[120px] leading-relaxed hidden sm:block" style={comicSansNormal}>
            Page will appear in these {selectedLinks.length} locations.
          </p>
        </div>

        <button 
          onClick={handleFinalDeployment}
          style={comicSansBold}
          className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-12 py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95"
        >
          Inject Connections
        </button>
      </div>
    </div>
  );
};
