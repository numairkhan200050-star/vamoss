// src/components/admin/CollectionSupervisor.tsx

import React, { useState } from 'react';
import { CollectionViewer } from './collections/CollectionViewer'; // Use the Viewer code for this
import { CollectionCreator } from './collections/CollectionCreator';
import { CollectionAssigner } from './collections/CollectionAssigner';

// TYPES FOR THE BRAIN
type CollectionView = 'VIEW_ALL' | 'CREATE_NEW' | 'ASSIGN_LINK';

export const CollectionSupervisor = () => {
  const [currentView, setCurrentView] = useState<CollectionView>('VIEW_ALL');
  const [activeCollectionName, setActiveCollectionName] = useState("");

  // --- LOGIC: SWITCHING DEPARTMENTS ---
  
  return (
    <div className="w-full h-full bg-white">
      
      {/* 1. THE VIEWER (LIST) */}
      {currentView === 'VIEW_ALL' && (
        <CollectionView 
          onAddNew={() => setCurrentView('CREATE_NEW')}
          onEdit={(id) => {
            console.log("Editing Collection:", id);
            setCurrentView('CREATE_NEW');
          }}
          onAssign={(id) => {
            setActiveCollectionName("Selected Collection"); // Logic to find name via ID later
            setCurrentView('ASSIGN_LINK');
          }}
        />
      )}

      {/* 2. THE CREATOR */}
      {currentView === 'CREATE_NEW' && (
        <CollectionCreator 
          onSave={(data) => {
            console.log("Saving to Note 9:", data);
            setCurrentView('VIEW_ALL');
          }}
          onCancel={() => setCurrentView('VIEW_ALL')}
        />
      )}

      {/* 3. THE ASSIGNER */}
      {currentView === 'ASSIGN_LINK' && (
        <CollectionAssigner 
          collectionName={activeCollectionName}
          onSave={(targets) => {
            console.log("Linking to Locations:", targets);
            setCurrentView('VIEW_ALL');
          }}
          onCancel={() => setCurrentView('VIEW_ALL')}
        />
      )}

    </div>
  );
};

export default CollectionSupervisor;
