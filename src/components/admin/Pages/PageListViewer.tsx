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

  const [pages] = useState<PageSummary[]>([
    { id: 'p1', title: 'Our Heritage', slug: 'heritage', status: 'active', searchVisible: true, googleVisible: true, lastModified: 'Oct 24, 2023' },
    { id: 'p2', title: 'Privacy Protocol', slug: 'privacy', status: 'draft', searchVisible: false, googleVisible: false, lastModified: 'Oct 28, 2023' }
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-4" style={comicSansNormal}>
      {/* HEADER SECTION - REDUCED HEIGHT & TEXT */}
      <div className="flex flex-col md:flex-row justify-between items-center pb-4 border-b border-slate-200/50 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2 rounded-xl text-blue-600 backdrop-blur-xl border border-blue-200/50">
            <Layers size={20} />
          </div>
          <div>
            <h1 style={comicSansBold} className="text-xl italic tracking-tight text-slate-800">
              Page Registry
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              {pages.length} ACTIVE NODES
            </p>
          </div>
        </div>
        
        <button 
          onClick={onAddNew}
          style={comicSansBold}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md active:scale-95 text-[10px] uppercase tracking-wider"
        >
          <Plus size={16} /> New Page
        </button>
      </div>

      {/* PAGE TABLE - COMPACT PADDING & TEXT */}
      <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100/50 text-[9px] uppercase tracking-widest text-slate-400 bg-slate-50/30">
              <th className="px-4 py-3 font-bold">Detail</th>
              <th className="px-4 py-3 font-bold text-center">Lifecycle</th>
              <th className="px-4 py-3 font-bold text-center">Visibility</th>
              <th className="px-4 py-3 font-bold text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/30">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-white/60 transition-colors">
                <td className="px-4 py-3">
                  <p style={comicSansBold} className="text-sm text-slate-800 leading-none">{page.title}</p>
                  <p className="text-[10px] font-mono text-blue-500 mt-0.5 tracking-tight">/{page.slug}</p>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase border ${
                    page.status === 'active' ? 'bg-green-50 border-green-100 text-green-600' : 
                    page.status === 'draft' ? 'bg-blue-50 border-blue-200 text-blue-600' : 
                    'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Search size={14} className={page.searchVisible ? 'text-slate-600' : 'text-slate-200'} />
                    <Globe size={14} className={page.googleVisible ? 'text-slate-600' : 'text-slate-200'} />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    <button 
                      onClick={() => onLink(page.id)}
                      className="p-2 rounded-lg bg-white border border-slate-100 hover:border-blue-400 hover:text-blue-500 transition-all shadow-sm"
                    >
                      <Link size={14} />
                    </button>
                    <button 
                      onClick={() => onEdit(page.id)}
                      className="p-2 rounded-lg bg-slate-800 text-white hover:bg-blue-600 transition-all shadow-sm"
                    >
                      <Edit3 size={14} />
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
