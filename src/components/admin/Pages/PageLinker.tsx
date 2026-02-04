import React, { useState } from 'react';
import { 
  Link, 
  X, 
  Layers, 
  FolderTree, 
  CheckCircle2, 
  ChevronRight, 
  Zap,
  Layout
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
  
  // --- STATE ---
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

  // --- NOTE 9: MOCK DATA (Available targets to link the page to) ---
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
    <div className="bg-white border-8 border-black p-8 shadow-[20px_20px_0px_0px_rgba(255,215,0,1)] max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-[#FFD700] p-3 border-2 border-black">
            <Link size={32} className="text-black" />
          </div>
          <div>
            <h2 style={comicSansBold} className="text-3xl uppercase italic leading-none">Page Linker</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
              Establishing Node Connections
            </p>
          </div>
        </div>
        <button onClick={onCancel} className="p-2 border-4 border-black hover:bg-black hover:text-white transition-all">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <label style={comicSansBold} className="block uppercase text-xs tracking-widest flex items-center gap-2">
          <Zap size={16} className="text-[#FFD700]" /> Select Navigation Anchors
        </label>

        <div className="grid grid-cols-1 gap-4">
          {linkVault.map((item) => {
            const isSelected = selectedLinks.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleLink(item.id)}
                className={`flex items-center justify-between p-6 border-4 transition-all group ${
                  isSelected 
                  ? 'border-black bg-black text-[#FFD700] -translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' 
                  : 'border-gray-100 hover:border-black bg-white text-black'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`p-3 border-2 ${isSelected ? 'border-[#FFD700]' : 'border-black'}`}>
                    {item.type === 'category' ? <Layout size={20} /> : <FolderTree size={20} />}
                  </div>
                  <div className="text-left">
                    <p className="font-black uppercase text-sm tracking-tight">{item.name}</p>
                    <p className={`text-[9px] uppercase font-bold ${isSelected ? 'text-[#FFD700]/60' : 'text-gray-400'}`}>
                      System Type: {item.type}
                    </p>
                  </div>
                </div>
                
                {isSelected ? (
                  <CheckCircle2 size={24} className="text-[#FFD700]" />
                ) : (
                  <ChevronRight size={24} className="text-gray-200 group-hover:text-black" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-10 pt-8 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase">Active Links</span>
          <span style={comicSansBold} className="text-4xl text-black">
            {selectedLinks.length < 10 ? `0${selectedLinks.length}` : selectedLinks.length}
          </span>
        </div>

        <button 
          onClick={handleFinalDeployment}
          style={comicSansBold}
          className="w-full sm:w-auto bg-black text-[#FFD700] border-4 border-black px-16 py-6 uppercase tracking-[0.2em] hover:bg-[#FFD700] hover:text-black transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-2"
        >
          Inject Links
        </button>
      </div>
    </div>
  );
};
