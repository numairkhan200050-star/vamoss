// src/components/admin/Pages/PageCreator.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Search, 
  Globe, 
  FileText, 
  Trash2,
  Sparkles
} from 'lucide-react';

interface PageCreatorProps {
  pageId: string | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const PageCreator = ({ pageId, onSave, onCancel }: PageCreatorProps) => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansNormal = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  // COMPACT GLASS THEME HELPER
  const glassInput = "bg-white/40 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-blue-400/20 transition-all outline-none";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<'draft' | 'active' | 'disabled'>('draft');
  const [searchVisible, setSearchVisible] = useState(true);
  const [googleVisible, setGoogleVisible] = useState(true);

  useEffect(() => {
    if (!pageId) {
      setSlug(title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
    }
  }, [title, pageId]);

  const handleFinalSave = () => {
    if (!title || !slug) return alert("Title and Slug are required!");
    onSave({ title, slug, content, status, settings: { searchVisible, googleVisible } });
  };

  return (
    <div className="max-w-4xl mx-auto text-slate-800 px-2" style={comicSansNormal}>
      {/* HEADER: COMPACT */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-600 border border-blue-200/50">
            <FileText size={20} />
          </div>
          <div>
            <h2 style={comicSansBold} className="text-xl italic leading-none">
              {pageId ? 'Edit Page' : 'New Page'}
            </h2>
            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">CONTENT EDITOR</p>
          </div>
        </div>
        <button onClick={onCancel} className="hover:bg-slate-100 p-2 rounded-full transition-colors text-slate-400">
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* MAIN CONTENT (3 COLUMNS) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="space-y-1.5">
            <label style={comicSansBold} className="block uppercase text-[9px] tracking-widest text-slate-400 ml-1">Identity</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title..."
              className={`w-full px-4 py-3 text-sm font-medium ${glassInput}`}
            />
          </div>

          <div className="space-y-1.5">
            <label style={comicSansBold} className="block uppercase text-[9px] tracking-widest text-slate-400 ml-1">URL Path</label>
            <div className={`flex items-center gap-2 px-3 py-2 font-mono text-[11px] ${glassInput} border-dashed`}>
              <span className="opacity-40">/pages/</span>
              <input 
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent outline-none font-bold flex-1 text-blue-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label style={comicSansBold} className="block uppercase text-[9px] tracking-widest text-slate-400 ml-1">Content</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className={`w-full p-4 font-mono text-xs resize-none ${glassInput}`}
              placeholder="Enter content..."
            />
          </div>
        </div>

        {/* SIDEBAR (1 COLUMN) */}
        <div className="space-y-4">
          {/* STATUS */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-4 rounded-2xl">
            <label style={comicSansBold} className="block uppercase text-[9px] tracking-widest mb-3 text-slate-400">Status</label>
            <div className="flex flex-col gap-1.5">
              {(['draft', 'active', 'disabled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`py-2 px-3 rounded-lg font-bold uppercase text-[8px] transition-all border ${
                    status === s ? 'bg-slate-800 text-white shadow-md' : 'bg-white/50 text-slate-400 border-slate-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* VISIBILITY */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search size={14} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase">Search</span>
              </div>
              <button 
                onClick={() => setSearchVisible(!searchVisible)}
                className={`w-8 h-4 rounded-full relative transition-all ${searchVisible ? 'bg-green-400' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${searchVisible ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase">Google</span>
              </div>
              <button 
                onClick={() => setGoogleVisible(!googleVisible)}
                className={`w-8 h-4 rounded-full relative transition-all ${googleVisible ? 'bg-indigo-400' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${googleVisible ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>

          {pageId && (
            <button className="w-full py-3 text-red-400 border border-red-100 rounded-xl hover:bg-red-50 transition-all uppercase text-[8px] font-bold flex items-center justify-center gap-1.5">
              <Trash2 size={12} /> Delete Page
            </button>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 pt-6 border-t border-slate-200/50">
        <button 
          onClick={handleFinalSave}
          style={comicSansBold}
          className="w-full bg-slate-900 text-white py-3.5 rounded-xl uppercase tracking-widest text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-100"
        >
          <Sparkles size={16} className="text-yellow-400" />
          {pageId ? 'Save Changes' : 'Create Page'}
        </button>
      </div>
    </div>
  );
};
