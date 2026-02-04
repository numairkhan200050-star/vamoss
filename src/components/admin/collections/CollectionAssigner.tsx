// src/components/admin/collections/CollectionAssigner.tsx

import React, { useState } from 'react';
import {
  Link,
  MapPin,
  Check,
  ChevronRight,
  X,
  Globe,
  Layout,
  Target
} from 'lucide-react';

/* ---------------- TYPES ---------------- */

interface AssignmentTarget {
  id: string;
  type: 'category' | 'page' | 'section';
  label: string;
}

interface CollectionAssignerProps {
  collectionName: string;
  onSave: (assignments: string[]) => void;
  onCancel: () => void;
}

/* ---------------- COMPONENT ---------------- */

export const CollectionAssigner = ({
  collectionName,
  onSave,
  onCancel,
}: CollectionAssignerProps) => {

  const comicSansBold = {
    fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive',
    fontWeight: 'bold' as const,
  };

  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  /* --- NOTE 9: MOCK DATA (Available locations to link the collection) --- */
  const targets: AssignmentTarget[] = [
    { id: 't1', type: 'category', label: "Men's Fashion Row" },
    { id: 't2', type: 'category', label: 'Tech Gadgets Row' },
    { id: 't3', type: 'page', label: 'Landing Page Hero' },
    { id: 't4', type: 'section', label: 'Flash Sale Spotlight' },
    { id: 't5', type: 'page', label: 'Custom Promo Page' },
  ];

  const toggleTarget = (id: string) => {
    setSelectedTargets(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const getIcon = (type: AssignmentTarget['type']) => {
    switch (type) {
      case 'category':
        return <Layout size={18} />;
      case 'page':
        return <Globe size={18} />;
      case 'section':
        return <Target size={18} />;
      default:
        return <Link size={18} />;
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white border-8 border-black p-8 shadow-[15px_15px_0px_0px_rgba(255,215,0,1)] max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
        <div>
          <h2
            style={comicSansBold}
            className="text-3xl uppercase italic leading-none"
          >
            Assign Collection
          </h2>
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest mt-2 bg-black text-white px-2 py-1 inline-block">
            Targeting: {collectionName}
          </p>
        </div>

        <button
          onClick={onCancel}
          className="p-2 border-2 border-black hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* TARGET SELECTION LIST */}
      <div className="space-y-4 mb-10">
        <label
          style={comicSansBold}
          className="block uppercase text-xs tracking-widest flex items-center gap-2 mb-4"
        >
          <MapPin size={16} className="text-[#FFD700]" />
          Select Deployment Locations
        </label>

        <div className="grid grid-cols-1 gap-3">
          {targets.map(target => {
            const isSelected = selectedTargets.includes(target.id);

            return (
              <button
                key={target.id}
                onClick={() => toggleTarget(target.id)}
                className={`flex items-center justify-between p-5 border-4 transition-all group ${
                  isSelected
                    ? 'border-black bg-black text-[#FFD700] translate-x-2'
                    : 'border-gray-100 hover:border-black bg-white text-black'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 border-2 ${
                      isSelected ? 'border-[#FFD700]' : 'border-black'
                    }`}
                  >
                    {getIcon(target.type)}
                  </div>

                  <div className="text-left">
                    <p className="font-black uppercase text-[11px] tracking-tight">
                      {target.label}
                    </p>
                    <p
                      className={`text-[9px] uppercase font-bold ${
                        isSelected
                          ? 'text-[#FFD700]/50'
                          : 'text-gray-400'
                      }`}
                    >
                      Type: {target.type}
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <Check size={20} />
                ) : (
                  <ChevronRight
                    size={20}
                    className="text-gray-200 group-hover:text-black"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTION */}
      <div className="flex items-center justify-between gap-6 pt-6 border-t-2 border-gray-100">
        <div className="text-left">
          <p className="font-black uppercase text-[10px] text-gray-400">
            Deploying to:
          </p>
          <p className="font-black text-lg">
            {selectedTargets.length} Locations
          </p>
        </div>

        <button
          onClick={() => onSave(selectedTargets)}
          style={comicSansBold}
          className="bg-black text-[#FFD700] border-4 border-black px-12 py-5 uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1"
        >
          Confirm Deployment
        </button>
      </div>
    </div>
  );
};

export default CollectionAssigner;
