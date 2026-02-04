// src/components/admin/Pages/PageListViewer.tsx
import React, { useState } from 'react';
import { 
  FileCode, 
  Plus, 
  Edit3, 
  Link, 
  Eye, 
  EyeOff, 
  Globe, 
  Search,
  MoreVertical,
  Trash2,
  Layers
} from 'lucide-react';

interface PageSummary {
  id: string;
  title: string;
  slug: string;
  status: 'active' | 'draft' | 'disabled';
  searchVisible: boolean;
  googleVisible: boolean;
  lastModified: string;
}

interface PageListViewerProps {
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onLink: (id: string) => void;
}

export const PageListViewer = ({ onAddNew, onEdit, onLink }: PageListViewerProps) => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansNormal = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  // --- DATA ---
  const [pages] = useState<PageSummary[]>([
    { id: 'p1', title: 'Our Heritage', slug: 'heritage', status: 'active', searchVisible: true, googleVisible: true, lastModified: 'Oct 24, 2023' },
    { id: 'p2', title: 'Privacy Protocol', slug: 'privacy', status: 'draft', searchVisible: false, googleVisible: false, lastModified: 'Oct 28, 2023' }
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8" style={comicSansNormal}>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-slate-200/50 gap-6">
        <div className="flex items-center gap-5">
          <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-600 backdrop-blur-xl border border-blue-200/50">
            <Layers size={32} />
          </div>
          <div>
            <h1 style={comicSansBold} className="text-4xl italic tracking-tight text-slate-800">
              Page Registry
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1 font-bold">
              Overseeing {pages.length} entry nodes
            </p>
          </div>
        </div>
        
        <button 
          onClick={onAddNew}
          style={comicSansBold}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-95 text-xs uppercase tracking-[0.2em]"
        >
          <Plus size={20} /> Construct New Page
        </button>
      </div>

      {/* PAGE TABLE: GLASS CONTAINER */}
      <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100/50 text-[10px] uppercase tracking-[0.2em] text-slate-400">
              <th className="p-6 font-bold">Detail</th>
              <th className="p-6 font-bold text-center">Lifecycle</th>
              <th className="p-6 font-bold text-center">Visibility</th>
              <th className="p-6 font-bold text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-white/60 transition-colors group">
                <td className="p-6">
                  <p style={comicSansBold} className="text-lg text-slate-800 leading-none">{page.title}</p>
                  <p className="text-[11px] font-mono text-blue-500 mt-1 tracking-tight">/{page.slug}</p>
                </td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-tighter border ${
                    page.status === 'active' ? 'bg-green-50 border-green-100 text-green-600' : 
                    page.status === 'draft' ? 'bg-blue-50 border-blue-200 text-blue-600' : 
                    'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-4">
                    <div className={`p-2 rounded-lg ${page.searchVisible ? 'bg-slate-100 text-slate-800' : 'text-slate-200'}`}>
                      <Search size={16} />
                    </div>
                    <div className={`p-2 rounded-lg ${page.googleVisible ? 'bg-slate-100 text-slate-800' : 'text-slate-200'}`}>
                      <Globe size={16} />
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => onLink(page.id)}
                      className="p-3 rounded-xl bg-white border border-slate-100 hover:border-blue-400 hover:text-blue-500 transition-all shadow-sm"
                      title="Manage Connections"
                    >
                      <Link size={18} />
                    </button>
                    <button 
                      onClick={() => onEdit(page.id)}
                      className="p-3 rounded-xl bg-slate-800 text-white hover:bg-blue-600 transition-all shadow-sm"
                      title="Edit Entry"
                    >
                      <Edit3 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
