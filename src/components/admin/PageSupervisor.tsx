// src/components/admin/PageSupervisor.tsx
import React, { useState } from 'react';
import { PageListViewer } from './Pages/PageListViewer';
import { PageCreator } from './Pages/PageCreator';
import { PageLinker } from './Pages/PageLinker';

type PageView = 'list' | 'create' | 'link';

export const PageSupervisor = () => {
  // --- NAVIGATION STATE ---
  const [view, setView] = useState<PageView>('list');
  const [activePageId, setActivePageId] = useState<string | null>(null);

  // --- MODERN GLASS STYLES ---
  const comicSansNormal = { 
    fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', 
    fontWeight: 'normal' as const 
  };

  const glassContainer = {
    background: "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.05)",
    borderRadius: "2rem"
  };

  return (
    <div className="p-6 min-h-full bg-gradient-to-br from-slate-50 to-indigo-50/20">
      {/* 1. GLASS SHELL WRAPPER */}
      <div style={glassContainer} className="transition-all duration-700 ease-in-out overflow-hidden">
        <div className="p-4 md:p-8" style={comicSansNormal}>
          
          {/* VIEW: LIST (PAGELISTVIEWER) */}
          {view === 'list' && (
            <PageListViewer 
              onAddNew={() => {
                setActivePageId(null);
                setView('create');
              }} 
              onEdit={(id) => { 
                setActivePageId(id); 
                setView('create'); 
              }}
              onLink={(id) => { 
                setActivePageId(id); 
                setView('link'); 
              }}
            />
          )}

          {/* VIEW: CREATOR / EDITOR */}
          {view === 'create' && (
            <PageCreator 
              pageId={activePageId}
              onSave={(data) => {
                console.log('HQ Data Received:', data);
                setView('list');
                setActivePageId(null);
              }}
              onCancel={() => {
                setView('list');
                setActivePageId(null);
              }}
            />
          )}

          {/* VIEW: LINKER (ANCHOR SYSTEM) */}
          {view === 'link' && (
            <PageLinker 
              pageId={activePageId}
              onSave={(links) => {
                console.log('Node Links Established:', links);
                setView('list');
                setActivePageId(null);
              }}
              onCancel={() => {
                setView('list');
                setActivePageId(null);
              }}
            />
          )}
        </div>
      </div>
      
      {/* STATUS INDICATOR (SUBTLE GLASS) */}
      <div className="mt-6 ml-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
          Page Engine Active
        </span>
      </div>
    </div>
  );
};
