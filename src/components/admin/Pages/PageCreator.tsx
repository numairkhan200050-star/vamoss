// src/components/admin/Pages/PageCreator.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Eye, 
  EyeOff, 
  Search, 
  Globe, 
  FileText, 
  AlertCircle,
  Trash2,
  Sparkles
} from 'lucide-react';

interface PageCreatorProps {
  pageId: string | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const PageCreator = ({ pageId, onSave, onCancel }: PageCreatorProps) => {
  // TYPOGRAPHY
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansNormal = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  // GLASS THEME HELPER
  const glassInput = "bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-400/20 transition-all outline-none";

  // --- PAGE STATE ---
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<'draft' | 'active' | 'disabled'>('draft');
  
  // --- TOGGLE SETTINGS ---
  const [searchVisible, setSearchVisible] = useState(true);
  const [googleVisible, setGoogleVisible] = useState(true);

  // Auto-generate slug from title
  useEffect(() => {
    if (!pageId) {
      setSlug(title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
    }
  }, [title, pageId]);

  const handleFinalSave = () => {
    if (!title || !slug) return alert("Title and Slug are required!");
    
    onSave({
      title,
      slug,
      content,
      status,
      settings: {
        searchVisible,
        googleVisible
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto text-slate-800">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-8 mb-8 border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-600 backdrop-blur-xl border border-blue-200/50">
            <FileText size={28} />
          </div>
          <div>
            <h2 style={comicSansBold} className="text-3xl italic tracking-tight leading-none">
              {pageId ? 'Refine Page' : 'New Page Canvas'}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1 font-bold">Content Architect</p>
          </div>
        </div>
        <button 
          onClick={onCancel} 
          className="hover:bg-red-50 hover:text-red-500 transition-colors p-3 rounded-full bg-white/50 border border-slate-200"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label style={comicSansBold} className="block uppercase text-[10px] tracking-widest text-slate-400 ml-2">Page Identity</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your page a name..."
              className={`w-full p-6 text-xl font-medium ${glassInput}`}
              style={comicSansNormal}
            />
          </div>

          <div className="space-y-2">
            <label style={comicSansBold} className="block uppercase text-[10px] tracking-widest text-slate-400 ml-2">URL Gateway</label>
            <div className={`flex items-center gap-2 p-4 font-mono text-sm ${glassInput} border-dashed`}>
              <span className="opacity-40 select-none">/pages/</span>
              <input 
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent outline-none font-bold flex-1 text-blue-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label style={comicSansBold} className="block uppercase text-[10px] tracking-widest text-slate-400 ml-2">Main Body Content</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className={`w-full p-6 font-mono text-sm resize-none ${glassInput}`}
              placeholder="Start your story here..."
            />
          </div>
        </div>

        {/* RIGHT COLUMN: SETTINGS & TOGGLES */}
        <div className="space-y-6">
          {/* STATUS SELECTION */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm">
            <label style={comicSansBold} className="block uppercase text-[10px] tracking-widest mb-4 text-slate-400">Lifecycle Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['draft', 'active', 'disabled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`py-3 rounded-xl font-bold uppercase text-[9px] transition-all ${
                    status === s 
                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' 
                    : 'bg-white/50 text-slate-400 border border-slate-100'
                  }`}
                  style={comicSansBold}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* VISIBILITY CONTROLS */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-6 rounded-3xl space-y-5 shadow-sm">
            <label style={comicSansBold} className="block uppercase text-[10px] tracking-widest mb-2 text-slate-400 border-b border-slate-100 pb-2">Discovery Settings</label>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Search size={16} /></div>
                <span className="text-[11px] font-bold uppercase tracking-tight">On-Site Search</span>
              </div>
              <button 
                onClick={() => setSearchVisible(!searchVisible)}
                className={`w-11 h-6 rounded-full relative transition-all ${searchVisible ? 'bg-green-400' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${searchVisible ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg"><Globe size={16} /></div>
                <span className="text-[11px] font-bold uppercase tracking-tight">Global Indexing</span>
              </div>
              <button 
                onClick={() => setGoogleVisible(!googleVisible)}
                className={`w-11 h-6 rounded-full relative transition-all ${googleVisible ? 'bg-indigo-400' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${googleVisible ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>

          {pageId && (
            <button className="w-full flex items-center justify-center gap-2 p-4 text-red-400 border border-red-100 rounded-2xl hover:bg-red-50 transition-all uppercase text-[9px] font-bold">
              <Trash2 size={14} /> Remove Permanent Entry
            </button>
          )}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-10 pt-8 border-t border-slate-200/50 flex gap-4">
        <button 
          onClick={handleFinalSave}
          style={comicSansBold}
          className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 text-white py-5 rounded-2xl uppercase tracking-[0.2em] text-sm hover:shadow-xl hover:shadow-slate-200 transition-all flex items-center justify-center gap-3"
        >
          <Sparkles size={18} className="text-yellow-400" />
          {pageId ? 'Commit Changes' : 'Initialize Page'}
        </button>
      </div>
    </div>
  );
};
