// src/components/admin/products/CategoryCollectionSelection.tsx
import React, { useEffect, useState } from 'react';
import { Plus, List, FolderPlus } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface CategoryCollectionSelectionProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedCollections: number[];
  setSelectedCollections: (val: number[]) => void;
}

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
}

interface Collection {
  id: number;
  name: string;
}

export const CategoryCollectionSelection: React.FC<CategoryCollectionSelectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedCollections,
  setSelectedCollections,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState('');

  // Fetch categories and collections from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: cats } = await supabase.from('categories').select('*');
      if (cats) setCategories(cats);

      const { data: cols } = await supabase.from('collections').select('*');
      if (cols) setCollections(cols);
    };
    fetchData();
  }, []);

  // Handle collection selection toggle
  const toggleCollection = (id: number) => {
    if (selectedCollections.includes(id)) {
      setSelectedCollections(selectedCollections.filter(c => c !== id));
    } else {
      setSelectedCollections([...selectedCollections, id]);
    }
  };

  // Add new collection
  const addCollection = async () => {
    if (!newCollectionName.trim()) return;
    const { data, error } = await supabase.from('collections').insert([{ name: newCollectionName }]).select().single();
    if (data) {
      setCollections([...collections, data]);
      setSelectedCollections([...selectedCollections, data.id]);
      setNewCollectionName('');
    }
  };

  // Build category hierarchy for dropdown
  const buildCategoryOptions = () => {
    const mainCats = categories.filter(c => !c.parent_id);
    return mainCats.map(main => {
      const subCats = categories.filter(c => c.parent_id === main.id);
      return (
        <optgroup key={main.id} label={main.name}>
          {subCats.length > 0 ? subCats.map(sub => {
            const subSubs = categories.filter(c => c.parent_id === sub.id);
            return (
              <React.Fragment key={sub.id}>
                <option value={sub.id}>— {sub.name}</option>
                {subSubs.map(ss => (
                  <option key={ss.id} value={ss.id}>—— {ss.name}</option>
                ))}
              </React.Fragment>
            );
          }) : <option value={main.id}>{main.name}</option>}
        </optgroup>
      );
    });
  };

  return (
    <div className="bg-white border-4 border-black p-6 space-y-6">
      {/* CATEGORY SELECTION */}
      <div>
        <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2">
          <List size={14} /> Category Selection
        </h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border-2 border-black font-black uppercase text-xs mt-2"
        >
          <option value="">Select Category...</option>
          {buildCategoryOptions()}
        </select>
      </div>

      {/* COLLECTION SELECTION */}
      <div>
        <h2 className="font-black uppercase text-xs border-b-2 border-black pb-2 flex items-center gap-2">
          <FolderPlus size={14} /> Collections
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {collections.map(col => (
            <button
              key={col.id}
              type="button"
              onClick={() => toggleCollection(col.id)}
              className={`px-3 py-1 border-2 font-bold uppercase text-xs ${selectedCollections.includes(col.id) ? 'bg-black text-white border-black' : 'bg-white text-black border-black'}`}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Add New Collection */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="New Collection Name"
            className="flex-1 p-2 border-2 border-black font-bold text-xs outline-none"
          />
          <button onClick={addCollection} className="px-4 py-2 bg-[#FFD700] border-2 border-black font-black uppercase text-xs hover:bg-black hover:text-[#FFD700] transition-all">
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

