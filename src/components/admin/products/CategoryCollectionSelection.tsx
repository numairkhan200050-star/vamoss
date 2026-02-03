// src/components/admin/products/CategoryCollectionSelection.tsx
import React, { useEffect, useState } from 'react';
import { Plus, List, FolderPlus } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface CategoryCollectionSelectionProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedCollections: string[];
  setSelectedCollections: (val: string[]) => void;
}

interface Category {
  id: string;
  name: string;
  parent_id: string | null;
}

interface Collection {
  id: string;
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

  /* FETCH DATA */
  useEffect(() => {
    const fetchData = async () => {
      const { data: cats, error: catErr } = await supabase
        .from('categories')
        .select('*');

      if (!catErr && cats) setCategories(cats);

      const { data: cols, error: colErr } = await supabase
        .from('collections')
        .select('*');

      if (!colErr && cols) setCollections(cols);
    };

    fetchData();
  }, []);

  /* TOGGLE COLLECTION */
  const toggleCollection = (id: string) => {
    if (selectedCollections.includes(id)) {
      setSelectedCollections(selectedCollections.filter(c => c !== id));
    } else {
      setSelectedCollections([...selectedCollections, id]);
    }
  };

  /* ADD COLLECTION */
  const addCollection = async () => {
    if (!newCollectionName.trim()) return;

    const { data, error } = await supabase
      .from('collections')
      .insert([{ name: newCollectionName }])
      .select()
      .single();

    if (!error && data) {
      setCollections([...collections, data]);
      setSelectedCollections([...selectedCollections, data.id]);
      setNewCollectionName('');
    }
  };

  /* BUILD CATEGORY TREE */
  const buildCategoryOptions = () => {
    const parents = categories.filter(c => !c.parent_id);

    return parents.map(parent => {
      const children = categories.filter(c => c.parent_id === parent.id);

      return (
        <optgroup key={parent.id} label={parent.name}>
          {children.length > 0
            ? children.map(child => {
                const grand = categories.filter(c => c.parent_id === child.id);

                return (
                  <React.Fragment key={child.id}>
                    <option value={child.id}>— {child.name}</option>

                    {grand.map(g => (
                      <option key={g.id} value={g.id}>
                        —— {g.name}
                      </option>
                    ))}
                  </React.Fragment>
                );
              })
            : <option value={parent.id}>{parent.name}</option>}
        </optgroup>
      );
    });
  };

  return (
    <div className="bg-white border-4 border-black p-6 space-y-6">

      {/* CATEGORY */}
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

      {/* COLLECTIONS */}
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
              className={`px-3 py-1 border-2 font-bold uppercase text-xs ${
                selectedCollections.includes(col.id)
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* ADD NEW COLLECTION */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="New Collection Name"
            className="flex-1 p-2 border-2 border-black font-bold text-xs outline-none"
          />

          <button
            onClick={addCollection}
            className="px-4 py-2 bg-[#FFD700] border-2 border-black font-black uppercase text-xs hover:bg-black hover:text-[#FFD700] transition-all"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};
