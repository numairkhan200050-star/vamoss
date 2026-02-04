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
  Trash2
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

  // --- NOTE 9: MOCK DATA (To be replaced with Supabase fetch) ---
  const [pages] = useState<PageSummary[]>([
    { 
      id: 'p1', 
      title: 'Our Heritage', 
      slug: 'heritage', 
      status: 'active', 
      searchVisible: true, 
      googleVisible: true, 
      lastModified: 'Oct 24, 2023' 
    },
    { 
      id: 'p2', 
      title: 'Privacy Protocol', 
      slug: 'privacy', 
      status: 'draft', 
      searchVisible: false, 
      googleVisible: false, 
      lastModified: 'Oct 28, 2023' 
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-8 border-black pb-8 gap-6">
        <div>
          <h1 style={comicSansBold} className="text-6xl uppercase italic tracking-tighter flex items-center gap-4">
            <FileCode className="text-[#FFD700]" size={56} strokeWidth={2.5} />
            Page List
          </h1>
          <p className="text-gray-400 font-black uppercase text-xs tracking-widest mt-2 bg-black text-white px-3 py-1 inline-block">
            Managing {pages.length} Custom Entry Points
          </p>
        </div>
        
        <button 
          onClick={onAddNew}
          style={comicSansBold}
          className="bg-[#FFD700] text-black border-4 border-black px-10 py-5 flex items-center gap-3 hover:bg-black hover:text-[#FFD700] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none uppercase tracking-widest"
        >
          <Plus size={24} /> Construct New Page
        </button>
      </div>

      {/* PAGE TABLE */}
      <div className="border-8 border-black bg-white shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white uppercase text-[10px] tracking-[0.2em]">
              <th className="p-6">Page Detail</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-center">Visibility</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-black">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-yellow-50/50 transition-colors group">
                <td className="p-6">
                  <p style={comicSansBold} className="text-xl uppercase leading-none">{page.title}</p>
                  <p className="text-xs font-mono text-gray-400 mt-1">/{page.slug}</p>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 text-[9px] font-black uppercase border-2 ${
                    page.status === 'active' ? 'bg-green-100 border-green-500 text-green-700' : 
                    page.status === 'draft' ? 'bg-blue-100 border-blue-500 text-blue-700' : 
                    'bg-gray-100 border-gray-500 text-gray-700'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-4 text-gray-300">
                    <Search size={18} className={page.searchVisible ? 'text-black' : ''} />
                    <Globe size={18} className={page.googleVisible ? 'text-black' : ''} />
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onLink(page.id)}
                      className="p-3 border-2 border-black hover:bg-[#FFD700] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      title="Link to Category"
                    >
                      <Link size={18} />
                    </button>
                    <button 
                      onClick={() => onEdit(page.id)}
                      className="p-3 border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      title="Edit Content"
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
