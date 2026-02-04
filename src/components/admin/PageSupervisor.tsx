import React, { useState } from 'react';
import { PageListViewer } from './Pages/PageListViewer';
import { PageCreator } from './Pages/PageCreator';
import { PageLinker } from './Pages/PageLinker';

type PageView = 'list' | 'create' | 'link';

export const PageSupervisor = () => {
  // --- NAVIGATION STATE ---
  const [view, setView] = useState<PageView>('list');
  const [activePageId, setActivePageId] = useState<string | null>(null);

  return (
    <div className="min-h-full">
      {/* 1. THE LIST VIEW (LABOR) */}
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

      {/* 2. THE CREATOR / EDITOR */}
      {view === 'create' && (
        <PageCreator 
          pageId={activePageId}
          onSave={(data) => {
            console.log('HQ Data Received:', data);
            // Here is where the Supabase logic will eventually live
            setView('list');
            setActivePageId(null);
          }}
          onCancel={() => {
            setView('list');
            setActivePageId(null);
          }}
        />
      )}

      {/* 3. THE LINKER (ANCHOR SYSTEM) */}
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
  );
};
