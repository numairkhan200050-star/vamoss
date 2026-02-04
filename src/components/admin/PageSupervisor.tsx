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

  // --- COMPACT GLASS STYLES ---
  const comicSansNormal = { 
    fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', 
    fontWeight: 'normal' as const 
  };

  const glassContainer = {
    background: "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.05)",
    borderRadius: "1.5rem"
  };

  return (
    <div className="p-3 md:p-5 min-h-full bg-gradient-to-br from-slate-50 to-indigo-50/20">
      {/* 1. COMPACT GLASS SHELL */}
      <div style={glassContainer} className="transition-all duration-500 ease-in-out overflow-hidden max-w-5xl mx-auto">
        <div className="p-4 md:p-6" style={comicSansNormal}>
          
          {/* VIEW: LIST */}
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
                console.log('Data Saved:', data);
                setView('list');
                setActivePageId(null);
              }}
              onCancel={() => {
                setView('list');
                setActivePageId(null);
              }}
            />
          )}

          {/* VIEW: LINKER */}
          {view === 'link' && (
            <PageLinker 
              pageId={activePageId}
              onSave={(links) => {
                console.log('Links Saved:', links);
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
      
      {/* COMPACT STATUS INDICATOR */}
      <div className="mt-4 max-w-5xl mx-auto px-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
          System Ready
        </span>
      </div>
    </div>
  );
};
