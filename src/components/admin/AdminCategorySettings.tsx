import React, { useState } from 'react';

interface Category {
  id: number;
  title: string;
  image: string;
  linkType: 'collection' | 'page' | 'product';
  linkTarget: string; // collection id, page slug, or product slug
}

export const AdminCategorySettings = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: 'Gadgets', image: '', linkType: 'collection', linkTarget: 'gadgets' },
    { id: 2, title: 'Men Grooming', image: '', linkType: 'collection', linkTarget: 'men-grooming' },
  ]);

  // Add a new empty category
  const addCategory = () => {
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, title: '', image: '', linkType: 'collection', linkTarget: '' }]);
  };

  // Update category property
  const updateCategory = (id: number, key: keyof Category, value: any) => {
    const updated = categories.map(cat => cat.id === id ? { ...cat, [key]: value } : cat);
    setCategories(updated);
  };

  // Delete category
  const deleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  // Save all categories (Later: connect to Supabase)
  const saveCategories = () => {
    alert('Categories saved!');
    console.log(categories);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black mb-4">Category Settings</h2>

      {categories.map(cat => (
        <div key={cat.id} className="border p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{cat.title || 'New Category'}</h3>
            <button onClick={() => deleteCategory(cat.id)} className="text-red-500 font-bold">Delete</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">Title</label>
              <input
                className="w-full border p-2"
                value={cat.title}
                onChange={e => updateCategory(cat.id, 'title', e.target.value)}
              />
            </div>

            <div>
              <label className="font-bold">Image URL</label>
              <input
                className="w-full border p-2"
                value={cat.image}
                onChange={e => updateCategory(cat.id, 'image', e.target.value)}
              />
            </div>

            <div>
              <label className="font-bold">Link Type</label>
              <select
                className="w-full border p-2"
                value={cat.linkType}
                onChange={e => updateCategory(cat.id, 'linkType', e.target.value)}
              >
                <option value="collection">Collection</option>
                <option value="page">Page</option>
                <option value="product">Product</option>
              </select>
            </div>

            <div>
              <label className="font-bold">Link Target</label>
              <input
                className="w-full border p-2"
                value={cat.linkTarget}
                onChange={e => updateCategory(cat.id, 'linkTarget', e.target.value)}
                placeholder="Collection ID, Page slug, or Product slug"
              />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addCategory} className="bg-green-500 text-white px-4 py-2 font-bold rounded">Add Category</button>
      <button onClick={saveCategories} className="bg-black text-white px-6 py-2 font-black uppercase rounded">Save All</button>
    </div>
  );
};
