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
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansNormal = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };
  
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

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
    <div className="max-w-2xl mx-auto px-2">
      {/* HEADER: COMPACT GLASS STYLE */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-600 backdrop-blur-xl border border-indigo-200/50">
            <Share2 size={18} />
          </div>
          <div>
            <h2 style={comicSansBold} className="text-xl italic tracking-tight leading-none">Node Linker</h2>
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              NAV ANCHORS
            </p>
          </div>
        </div>
        <button 
          onClick={onCancel} 
          className="hover:bg-slate-100 p-2 rounded-full transition-colors text-slate-400"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <label style={comicSansBold} className="block uppercase text-[9px] tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
          <Zap size={12} className="text-yellow-500 fill-yellow-500" /> Connection Targets
        </label>

        {/* LIST OF ANCHORS: COMPACT BUTTONS */}
        <div className="grid grid-cols-1 gap-2">
          {linkVault.map((item) => {
            const isSelected = selectedLinks.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleLink(item.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 border ${
                  isSelected 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md -translate-y-0.5' 
                  : 'bg-white/40 backdrop-blur-md border-white/60 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {item.type === 'category' ? <Layout size={16} /> : <FolderTree size={16} />}
                  </div>
                  <div className="text-left">
                    <p style={comicSansBold} className="uppercase text-xs tracking-tight leading-none">{item.name}</p>
                    <p className="text-[8px] uppercase font-bold mt-0.5 opacity-50 tracking-wider">
                      {item.type}
                    </p>
                  </div>
                </div>
                
                {isSelected ? (
                  <CheckCircle2 size={16} className="text-green-400" />
                ) : (
                  <ChevronRight size={16} className="text-slate-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTION: COMPACT PANEL */}
      <div className="mt-8 p-5 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[1.5rem] flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
            <span style={comicSansBold} className="text-2xl text-slate-800 leading-none">
              {selectedLinks.length}
            </span>
          </div>
          <div className="h-6 w-[1px] bg-slate-200" />
          <p className="text-[10px] text-slate-400 leading-tight" style={comicSansNormal}>
            Links <br/> Ready
          </p>
        </div>

        <button 
          onClick={handleFinalDeployment}
          style={comicSansBold}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl uppercase tracking-widest text-[10px] hover:shadow-lg transition-all active:scale-95"
        >
          Inject Connections
        </button>
      </div>
    </div>
  );
};
